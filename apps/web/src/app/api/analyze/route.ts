import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    address, purchasePrice, downPaymentPct = 20, interestRate = 7.0,
    loanTermYears = 30, monthlyRent, vacancyRatePct = 8,
    expensesPct = 40, repairCosts = 0, propertyType = 'single_family'
  } = body

  // Calculate core financials
  const downPayment = purchasePrice * (downPaymentPct / 100)
  const loanAmount = purchasePrice - downPayment
  const monthlyRate = interestRate / 100 / 12
  const numPayments = loanTermYears * 12
  const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
  
  const effectiveRent = monthlyRent * (1 - vacancyRatePct / 100)
  const monthlyExpenses = effectiveRent * (expensesPct / 100)
  const noi = (effectiveRent - monthlyExpenses) * 12
  const capRate = (noi / purchasePrice) * 100
  const monthlyCashFlow = effectiveRent - monthlyExpenses - monthlyMortgage
  const annualCashFlow = monthlyCashFlow * 12
  const cashInvested = downPayment + repairCosts
  const cashOnCash = (annualCashFlow / cashInvested) * 100
  const grm = purchasePrice / (monthlyRent * 12)
  const dscr = noi / (monthlyMortgage * 12)
  
  // AI analysis
  const prompt = `You are an expert real estate investment analyst. Analyze this deal and provide professional insights.

PROPERTY: ${address}
Type: ${propertyType}
Purchase Price: $${purchasePrice.toLocaleString()}
Down Payment: ${downPaymentPct}% ($${downPayment.toLocaleString()})
Loan: $${loanAmount.toLocaleString()} at ${interestRate}% for ${loanTermYears} years
Monthly Mortgage: $${monthlyMortgage.toFixed(0)}
Monthly Rent: $${monthlyRent.toLocaleString()}
Vacancy Rate: ${vacancyRatePct}%
Expense Ratio: ${expensesPct}%

COMPUTED METRICS:
Cap Rate: ${capRate.toFixed(2)}%
Cash on Cash Return: ${cashOnCash.toFixed(2)}%
Monthly Cash Flow: $${monthlyCashFlow.toFixed(0)}
Annual Cash Flow: $${annualCashFlow.toFixed(0)}
NOI: $${noi.toFixed(0)}
GRM: ${grm.toFixed(1)}
DSCR: ${dscr.toFixed(2)}

Respond in JSON only:
{
  "dealScore": <integer 1-100>,
  "verdict": "<BUY / PASS / NEGOTIATE>",
  "summary": "<2-3 sentence executive summary>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "redFlags": ["<risk 1>", "<risk 2>"],
  "recommendations": "<specific actionable advice in 2-3 sentences>",
  "marketContext": "<brief midwest/missouri market context>",
  "exitStrategies": ["<strategy 1>", "<strategy 2>"]
}`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }]
  })

  const aiText = (message.content[0] as { text: string }).text
  const aiResult = JSON.parse(aiText.replace(/```json\n?|\n?```/g, '').trim())

  return NextResponse.json({
    metrics: {
      capRate: parseFloat(capRate.toFixed(2)),
      cashOnCash: parseFloat(cashOnCash.toFixed(2)),
      monthlyCashFlow: parseFloat(monthlyCashFlow.toFixed(0)),
      annualCashFlow: parseFloat(annualCashFlow.toFixed(0)),
      noi: parseFloat(noi.toFixed(0)),
      grm: parseFloat(grm.toFixed(1)),
      dscr: parseFloat(dscr.toFixed(2)),
      monthlyMortgage: parseFloat(monthlyMortgage.toFixed(0)),
      downPayment,
      loanAmount
    },
    ai: aiResult
  })
}
