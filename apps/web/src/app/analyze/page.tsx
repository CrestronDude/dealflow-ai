'use client'
import { useState } from 'react'

interface DealInputs {
  address: string; purchasePrice: number; downPaymentPct: number;
  interestRate: number; loanTermYears: number; monthlyRent: number;
  vacancyRatePct: number; expensesPct: number; repairCosts: number;
}
interface Results { metrics: any; ai: any }

const defaults: DealInputs = {
  address: '', purchasePrice: 185000, downPaymentPct: 20,
  interestRate: 7.0, loanTermYears: 30, monthlyRent: 1650,
  vacancyRatePct: 8, expensesPct: 40, repairCosts: 0
}

export default function AnalyzePage() {
  const [inputs, setInputs] = useState<DealInputs>(defaults)
  const [results, setResults] = useState<Results | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof DealInputs, v: string) =>
    setInputs(p => ({ ...p, [k]: k === 'address' ? v : parseFloat(v) || 0 }))

  const analyze = async () => {
    setLoading(true); setError('')
    try {
      const r = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(inputs) })
      const data = await r.json()
      if (data.error) throw new Error(data.error)
      setResults(data)
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  const inp = (label: string, k: keyof DealInputs, prefix = '', suffix = '') => (
    <div style={{ marginBottom: '0.875rem' }}>
      <label style={{ display: 'block', fontSize: '0.7rem', color: '#4d7a4d', marginBottom: '0.25rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', background: '#080c08', border: '1px solid #1a2e1a', borderRadius: '6px', overflow: 'hidden' }}>
        {prefix && <span style={{ padding: '0.5rem 0.5rem 0.5rem 0.75rem', color: '#4d7a4d', fontSize: '0.875rem' }}>{prefix}</span>}
        <input type={k === 'address' ? 'text' : 'number'} value={inputs[k]} onChange={e => set(k, e.target.value)}
          style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.5rem 0.75rem', color: '#86efac', fontSize: '0.875rem', outline: 'none', fontFamily: 'system-ui,sans-serif' }} />
        {suffix && <span style={{ padding: '0.5rem 0.75rem 0.5rem 0', color: '#4d7a4d', fontSize: '0.875rem' }}>{suffix}</span>}
      </div>
    </div>
  )

  const scoreColor = (s: number) => s >= 70 ? '#4ade80' : s >= 50 ? '#facc15' : '#f87171'

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e0a', color: '#e8f0e8', padding: '2rem', fontFamily: 'Georgia,serif' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#e8f0e8', fontSize: '1.25rem', fontWeight: 700 }}>⚡ DealFlow<span style={{ color: '#4ade80' }}>AI</span></a>
          <span style={{ fontSize: '0.8rem', color: '#4d7a4d', fontFamily: 'system-ui,sans-serif' }}>Deal Analyzer</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Analyze a Deal</h1>
        <p style={{ color: '#6b9e6b', marginBottom: '2rem', fontFamily: 'system-ui,sans-serif', fontSize: '0.9rem' }}>Enter property details below for instant AI-powered analysis.</p>
        <div style={{ display: 'grid', gridTemplateColumns: results ? '1fr 1fr' : '1fr', gap: '2rem' }}>
          <div style={{ background: '#0d1a0d', border: '1px solid #1a2e1a', borderRadius: '12px', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '0.875rem', color: '#4ade80', marginBottom: '1.25rem', fontFamily: 'system-ui,sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}>PROPERTY DETAILS</h2>
            {inp('Property Address', 'address')}
            {inp('Purchase Price', 'purchasePrice', '$')}
            {inp('Monthly Rent', 'monthlyRent', '$')}
            {inp('Down Payment', 'downPaymentPct', '', '%')}
            {inp('Interest Rate', 'interestRate', '', '%')}
            {inp('Loan Term', 'loanTermYears', '', 'yrs')}
            {inp('Vacancy Rate', 'vacancyRatePct', '', '%')}
            {inp('Expense Ratio', 'expensesPct', '', '%')}
            {inp('Repair Costs', 'repairCosts', '$')}
            {error && <p style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '0.75rem', fontFamily: 'system-ui,sans-serif' }}>{error}</p>}
            <button onClick={analyze} disabled={loading}
              style={{ width: '100%', background: loading ? '#166534' : '#16a34a', color: 'white', border: 'none', borderRadius: '8px', padding: '0.875rem', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'system-ui,sans-serif' }}>
              {loading ? '⚡ Analyzing...' : '⚡ Analyze This Deal'}
            </button>
          </div>

          {results && (
            <div style={{ background: '#0d1a0d', border: '1px solid #1a2e1a', borderRadius: '12px', padding: '1.5rem' }}>
              <h2 style={{ fontSize: '0.875rem', color: '#4ade80', marginBottom: '1.25rem', fontFamily: 'system-ui,sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}>AI ANALYSIS</h2>
              <div style={{ textAlign: 'center', background: '#080c08', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem', border: '1px solid #1a2e1a' }}>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: scoreColor(results.ai.dealScore), lineHeight: 1 }}>{results.ai.dealScore}</div>
                <div style={{ fontSize: '0.7rem', color: '#4d7a4d', fontFamily: 'system-ui,sans-serif', letterSpacing: '0.06em' }}>DEAL SCORE</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: scoreColor(results.ai.dealScore), marginTop: '0.25rem', fontFamily: 'system-ui,sans-serif' }}>
                  {results.ai.verdict === 'BUY' ? '✅' : results.ai.verdict === 'NEGOTIATE' ? '⚠️' : '❌'} {results.ai.verdict}
                </div>
              </div>
              {[
                ['Cap Rate', results.metrics.capRate + '%', results.metrics.capRate >= 6],
                ['Cash-on-Cash', results.metrics.cashOnCash + '%', results.metrics.cashOnCash >= 7],
                ['Monthly Cash Flow', '$' + Number(results.metrics.monthlyCashFlow).toLocaleString(), results.metrics.monthlyCashFlow > 0],
                ['Annual Cash Flow', '$' + Number(results.metrics.annualCashFlow).toLocaleString(), results.metrics.annualCashFlow > 0],
                ['NOI', '$' + Number(results.metrics.noi).toLocaleString(), results.metrics.noi > 0],
                ['DSCR', results.metrics.dscr.toString(), results.metrics.dscr >= 1.25],
                ['GRM', results.metrics.grm.toString(), results.metrics.grm <= 12],
                ['Monthly Mortgage', '$' + Number(results.metrics.monthlyMortgage).toLocaleString(), true],
              ].map(([label, val, good], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #1a2e1a' }}>
                  <span style={{ fontSize: '0.8rem', color: '#6b9e6b', fontFamily: 'system-ui,sans-serif' }}>{label}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: good ? '#4ade80' : '#f87171', fontFamily: 'system-ui,sans-serif' }}>{val}</span>
                </div>
              ))}
              {results.ai.strengths?.length > 0 && (
                <div style={{ marginTop: '1rem', padding: '0.875rem', background: '#0d2e0d', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#4ade80', letterSpacing: '0.06em', marginBottom: '0.5rem', fontFamily: 'system-ui,sans-serif' }}>STRENGTHS</div>
                  {results.ai.strengths.map((s: string, i: number) => <div key={i} style={{ fontSize: '0.78rem', color: '#86efac', marginBottom: '0.25rem', fontFamily: 'system-ui,sans-serif' }}>✓ {s}</div>)}
                </div>
              )}
              {results.ai.redFlags?.length > 0 && (
                <div style={{ marginTop: '0.75rem', padding: '0.875rem', background: '#1a0808', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#f87171', letterSpacing: '0.06em', marginBottom: '0.5rem', fontFamily: 'system-ui,sans-serif' }}>RED FLAGS</div>
                  {results.ai.redFlags.map((s: string, i: number) => <div key={i} style={{ fontSize: '0.78rem', color: '#fca5a5', marginBottom: '0.25rem', fontFamily: 'system-ui,sans-serif' }}>⚠ {s}</div>)}
                </div>
              )}
              <div style={{ marginTop: '0.75rem', padding: '0.875rem', background: '#080c08', borderRadius: '6px', border: '1px solid #1a2e1a' }}>
                <div style={{ fontSize: '0.7rem', color: '#4ade80', letterSpacing: '0.06em', marginBottom: '0.4rem', fontFamily: 'system-ui,sans-serif' }}>AI RECOMMENDATION</div>
                <p style={{ fontSize: '0.8rem', color: '#86efac', lineHeight: 1.5, fontFamily: 'system-ui,sans-serif', margin: 0 }}>{results.ai.recommendations}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
