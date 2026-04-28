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

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
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

    const rawText = (msg.content[0] as {text:string}).text.trim()
    const ai = JSON.parse(rawText)

    const metrics = {
      capRate: +capRate.toFixed(2), cashOnCash: +cashOnCash.toFixed(2),
      monthlyCashFlow: +monthlyCashFlow.toFixed(0), annualCashFlow: +(monthlyCashFlow*12).toFixed(0),
      noi: +noi.toFixed(0), grm: +grm.toFixed(1), dscr: +dscr.toFixed(2),
      monthlyMortgage: +monthlyMortgage.toFixed(0), downPayment, loanAmount
    }

    // Fire Zapier async (non-blocking)
    fireZapier('deal_analyzed', { address, dealScore: ai.dealScore, verdict: ai.verdict, capRate: metrics.capRate, monthlyCashFlow: metrics.monthlyCashFlow })

    return NextResponse.json({ metrics, ai })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
