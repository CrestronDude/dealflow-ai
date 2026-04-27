import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      address = 'Unknown Property',
      purchasePrice = 0, downPaymentPct = 20, interestRate = 7.0,
      loanTermYears = 30, monthlyRent = 0, vacancyRatePct = 8,
      expensesPct = 40, repairCosts = 0,
    } = body

    // Core financial calculations
    const dp = purchasePrice * (downPaymentPct / 100)
    const loan = purchasePrice - dp
    const mr = interestRate / 100 / 12
    const n = loanTermYears * 12
    const mortgage = loan * (mr * Math.pow(1+mr,n)) / (Math.pow(1+mr,n)-1)
    const effRent = monthlyRent * (1 - vacancyRatePct/100)
    const monthlyExp = effRent * (expensesPct/100)
    const noi = (effRent - monthlyExp) * 12
    const capRate = purchasePrice > 0 ? (noi / purchasePrice) * 100 : 0
    const monthlyCF = effRent - monthlyExp - mortgage
    const annualCF = monthlyCF * 12
    const cashIn = dp + repairCosts
    const coc = cashIn > 0 ? (annualCF / cashIn) * 100 : 0
    const grm = monthlyRent > 0 ? purchasePrice / (monthlyRent * 12) : 0
    const dscr = mortgage > 0 ? noi / (mortgage * 12) : 0

    // Score logic (no external API needed for MVP)
    let score = 50
    if (capRate >= 8) score += 20
    else if (capRate >= 6) score += 10
    else if (capRate < 4) score -= 20
    if (coc >= 10) score += 15
    else if (coc >= 7) score += 8
    else if (coc < 0) score -= 25
    if (dscr >= 1.25) score += 10
    else if (dscr < 1.0) score -= 20
    if (grm <= 10) score += 5
    score = Math.max(1, Math.min(100, score))

    const verdict = score >= 70 ? 'BUY' : score >= 50 ? 'NEGOTIATE' : 'PASS'
    const verdictColor = score >= 70 ? 'green' : score >= 50 ? 'amber' : 'red'

    const strengths = []
    const redFlags = []
    if (capRate >= 7) strengths.push(`Strong ${capRate.toFixed(1)}% cap rate exceeds Midwest avg of 6%`)
    if (coc >= 8) strengths.push(`Excellent ${coc.toFixed(1)}% cash-on-cash return`)
    if (monthlyCF > 200) strengths.push(`Solid $${Math.round(monthlyCF)}/mo positive cash flow`)
    if (dscr >= 1.2) strengths.push(`Safe ${dscr.toFixed(2)} DSCR — lender-ready`)
    if (grm <= 11) strengths.push(`Favorable ${grm.toFixed(1)}x GRM for Missouri market`)
    if (capRate < 5) redFlags.push(`Low ${capRate.toFixed(1)}% cap rate — below market`)
    if (coc < 5) redFlags.push(`Weak cash-on-cash return of ${coc.toFixed(1)}%`)
    if (monthlyCF < 0) redFlags.push(`Negative cash flow of $${Math.round(monthlyCF)}/mo`)
    if (dscr < 1.1) redFlags.push(`DSCR ${dscr.toFixed(2)} — lender concern below 1.25`)
    if (strengths.length === 0) strengths.push('Review deal terms for improvement opportunities')

    return NextResponse.json({
      metrics: {
        capRate: +capRate.toFixed(2),
        cashOnCash: +coc.toFixed(2),
        monthlyCashFlow: +monthlyCF.toFixed(0),
        annualCashFlow: +annualCF.toFixed(0),
        noi: +noi.toFixed(0),
        grm: +grm.toFixed(1),
        dscr: +dscr.toFixed(2),
        monthlyMortgage: +mortgage.toFixed(0),
        downPayment: +dp.toFixed(0),
        loanAmount: +loan.toFixed(0),
      },
      ai: {
        dealScore: score,
        verdict,
        verdictColor,
        summary: `${address} scores ${score}/100 — ${verdict}. Cap rate ${capRate.toFixed(1)}%, CoC ${coc.toFixed(1)}%, monthly cash flow $${Math.round(monthlyCF)}.`,
        strengths: strengths.slice(0,3),
        redFlags: redFlags.slice(0,3),
        recommendations: score >= 70
          ? `Strong deal for the Missouri market. Consider locking rate and moving fast.`
          : score >= 50
          ? `Negotiate 5-8% below ask or request seller concessions to improve returns.`
          : `Deal does not pencil at current price. Need lower purchase price or higher rents.`,
        exitStrategies: ['Buy & Hold (rental income)', 'BRRRR Strategy', 'Flip if ARV supports it'],
      }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
