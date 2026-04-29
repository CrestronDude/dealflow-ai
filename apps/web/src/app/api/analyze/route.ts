import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { fireZapier } from '@/lib/zapier'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      address = 'Unknown', purchasePrice = 200000, downPaymentPct = 20,
      interestRate = 7.0, loanTermYears = 30, monthlyRent = 1800,
      vacancyRatePct = 8, expensesPct = 40, repairCosts = 0,
      propertyType = 'single_family'
    } = body

    // --- Core financial calculations ---
    const downPayment = purchasePrice * (downPaymentPct / 100)
    const loanAmount = purchasePrice - downPayment
    const r = interestRate / 100 / 12
    const n = loanTermYears * 12
    const monthlyMortgage = loanAmount * (r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1)
    const effectiveRent = monthlyRent * (1 - vacancyRatePct/100)
    const monthlyExpenses = effectiveRent * (expensesPct/100)
    const noi = (effectiveRent - monthlyExpenses) * 12
    const capRate = (noi / purchasePrice) * 100
    const monthlyCashFlow = effectiveRent - monthlyExpenses - monthlyMortgage
    const cashInvested = downPayment + repairCosts
    const cashOnCash = (monthlyCashFlow * 12 / cashInvested) * 100
    const grm = purchasePrice / (monthlyRent * 12)
    const dscr = noi / (monthlyMortgage * 12)

    const metrics = {
      capRate: +capRate.toFixed(2),
      cashOnCash: +cashOnCash.toFixed(2),
      monthlyCashFlow: +monthlyCashFlow.toFixed(0),
      annualCashFlow: +(monthlyCashFlow * 12).toFixed(0),
      noi: +noi.toFixed(0),
      grm: +grm.toFixed(1),
      dscr: +dscr.toFixed(2),
      monthlyMortgage: +monthlyMortgage.toFixed(0),
      downPayment,
      loanAmount,
    }

    // --- Check API key is configured ---
    const apiKey = process.env.ANTHROPIC_API_KEY ?? ''
    if (!apiKey || apiKey.includes('placeholder')) {
      return NextResponse.json({
        metrics,
        ai: localFallback(metrics, purchasePrice, monthlyRent),
        warning: 'AI analysis unavailable — API key not configured.',
      })
    }

    // --- Call Claude AI ---
    try {
      const anthropic = new Anthropic({ apiKey })
      const msg = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        messages: [{
          role: 'user',
          content: `You are an expert real estate investment analyst for Midwest/Missouri markets. Analyze this deal concisely.

PROPERTY: ${address} | Type: ${propertyType}
Purchase: $${purchasePrice.toLocaleString()} | Down: ${downPaymentPct}% | Rate: ${interestRate}% | Rent: $${monthlyRent}/mo

METRICS: Cap Rate: ${capRate.toFixed(2)}% | CoC: ${cashOnCash.toFixed(2)}% | Cash Flow: $${monthlyCashFlow.toFixed(0)}/mo | DSCR: ${dscr.toFixed(2)} | GRM: ${grm.toFixed(1)}

Respond ONLY with valid JSON (no markdown):
{"dealScore":78,"verdict":"BUY","summary":"2-3 sentences","strengths":["s1","s2","s3"],"redFlags":["r1","r2"],"recommendations":"2 sentences","marketContext":"1 sentence about midwest market","exitStrategies":["e1","e2"]}`
        }]
      })
      const rawText = (msg.content[0] as { text: string }).text.trim()
      const ai = JSON.parse(rawText)

      // Fire Zapier non-blocking
      fireZapier('deal_analyzed', {
        address, dealScore: ai.dealScore, verdict: ai.verdict,
        capRate: metrics.capRate, monthlyCashFlow: metrics.monthlyCashFlow,
      })

      return NextResponse.json({ metrics, ai })

    } catch (aiErr: any) {
      // Handle specific Anthropic errors gracefully
      const msg = aiErr?.message ?? ''
      const isCredits = msg.includes('credit balance') || msg.includes('insufficient') || aiErr?.status === 400
      const isQuota   = aiErr?.status === 429
      const isNoKey   = aiErr?.status === 401

      let warning = 'AI analysis temporarily unavailable — showing calculated metrics.'
      if (isCredits) warning = 'AI analysis paused — Anthropic credit balance is too low. Add credits at console.anthropic.com/settings/billing.'
      if (isQuota)   warning = 'AI is rate-limited right now — showing calculated metrics.'
      if (isNoKey)   warning = 'AI API key invalid — check ANTHROPIC_API_KEY in Vercel settings.'

      // Return metrics with rule-based fallback so the app still works
      return NextResponse.json({
        metrics,
        ai: localFallback(metrics, purchasePrice, monthlyRent),
        warning,
      })
    }

  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

/** Rule-based deal scoring when AI is unavailable */
function localFallback(
  m: { capRate: number; cashOnCash: number; monthlyCashFlow: number; dscr: number; grm: number },
  purchasePrice: number,
  monthlyRent: number
) {
  let score = 50
  if (m.capRate >= 8)       score += 20
  else if (m.capRate >= 6)  score += 12
  else if (m.capRate >= 4)  score += 4
  else                      score -= 10

  if (m.cashOnCash >= 10)   score += 15
  else if (m.cashOnCash >= 7) score += 8
  else if (m.cashOnCash >= 4) score += 2
  else                      score -= 8

  if (m.monthlyCashFlow > 300) score += 10
  else if (m.monthlyCashFlow > 0) score += 4
  else score -= 15

  if (m.dscr >= 1.3) score += 5
  else if (m.dscr < 1.0) score -= 10

  score = Math.max(10, Math.min(99, score))

  const verdict = score >= 70 ? 'BUY' : score >= 50 ? 'NEGOTIATE' : 'PASS'

  const strengths: string[] = []
  const redFlags: string[] = []

  if (m.capRate >= 6)         strengths.push(`Strong cap rate of ${m.capRate}% — above Midwest average`)
  if (m.cashOnCash >= 7)      strengths.push(`Solid ${m.cashOnCash}% cash-on-cash return`)
  if (m.monthlyCashFlow > 200) strengths.push(`Positive monthly cash flow of $${m.monthlyCashFlow}`)
  if (m.dscr >= 1.25)         strengths.push(`DSCR of ${m.dscr} — lender-friendly coverage`)
  if (m.grm <= 10)            strengths.push(`Low GRM of ${m.grm} — strong price-to-rent ratio`)

  if (m.capRate < 5)           redFlags.push(`Cap rate of ${m.capRate}% is below typical Midwest targets`)
  if (m.cashOnCash < 5)       redFlags.push(`Cash-on-cash return of ${m.cashOnCash}% may not justify risk`)
  if (m.monthlyCashFlow < 0)  redFlags.push(`Negative cash flow of $${m.monthlyCashFlow}/mo — property costs more than it earns`)
  if (m.dscr < 1.1)           redFlags.push(`DSCR below 1.1 — debt coverage is tight`)

  if (strengths.length === 0) strengths.push('Metrics within normal range for market conditions')
  if (redFlags.length === 0)  redFlags.push('No major red flags identified from metrics alone')

  return {
    dealScore: score,
    verdict,
    summary: `Rule-based analysis (AI temporarily offline). This deal scores ${score}/100 — ${verdict} based on calculated metrics. Cap rate: ${m.capRate}%, Cash-on-cash: ${m.cashOnCash}%, Monthly cash flow: $${m.monthlyCashFlow}.`,
    strengths: strengths.slice(0, 3),
    redFlags: redFlags.slice(0, 2),
    recommendations: verdict === 'BUY'
      ? 'Metrics support moving forward. Get an inspection, verify rent comps, and confirm expense assumptions with a local property manager.'
      : verdict === 'NEGOTIATE'
      ? 'Consider negotiating the purchase price down 5-10% to improve returns. Verify rent upside potential with local market data.'
      : 'Current numbers do not pencil at this price. Either negotiate a lower purchase price or find a higher-rent use case.',
    marketContext: 'Midwest markets offer strong cash flow potential. Kansas City and St. Louis continue to see investor demand with cap rates averaging 6-8% for SFR.',
    exitStrategies: ['Buy and hold for long-term cash flow', 'BRRRR — refinance after stabilization'],
    _fallback: true,
  }
}
