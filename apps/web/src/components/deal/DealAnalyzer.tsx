'use client'
import { useState } from 'react'

type Metrics = {
  capRate: number; cashOnCash: number; monthlyCashFlow: number
  annualCashFlow: number; noi: number; grm: number; dscr: number
  monthlyMortgage: number; downPayment: number; loanAmount: number
}
type AI = {
  dealScore: number; verdict: string; summary: string
  strengths: string[]; redFlags: string[]; recommendations: string
  marketContext: string; exitStrategies: string[]
}

export default function DealAnalyzer() {
  const [form, setForm] = useState({
    address: '', purchasePrice: 185000, downPaymentPct: 20,
    interestRate: 7.0, loanTermYears: 30, monthlyRent: 1650,
    vacancyRatePct: 8, expensesPct: 40, repairCosts: 0,
    propertyType: 'single_family'
  })
  const [result, setResult] = useState<{ metrics: Metrics; ai: AI } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')

  const analyze = async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      if (data.warning) setWarning(data.warning)
      else setWarning('')
      setResult(data)
    } catch(e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  const inp = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
    setForm(f => ({ ...f, [field]: v }))
  }

  const scoreColor = result ? (result.ai.dealScore >= 75 ? '#4ade80' : result.ai.dealScore >= 55 ? '#fbbf24' : '#f87171') : '#4ade80'
  const verdictBg = result?.ai.verdict === 'BUY' ? '#0d2e0d' : result?.ai.verdict === 'PASS' ? '#2d0a0a' : '#2d2005'

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#e8f0e8' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* INPUT PANEL */}
        <div>
          <h3 style={{ color: '#4ade80', fontSize: '0.75rem', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>DEAL INPUTS</h3>
          <div style={{ marginBottom: '0.875rem' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', color: '#6b9e6b', marginBottom: '0.25rem' }}>PROPERTY ADDRESS</label>
            <input value={form.address} onChange={inp('address')} placeholder="1247 Oak St, Kansas City MO 64105"
              style={{ width: '100%', background: '#080c08', border: '1px solid #1a2e1a', borderRadius: '6px', padding: '0.5rem 0.75rem', color: '#e8f0e8', fontSize: '0.875rem' }} />
          </div>
          {[
            { label: 'PURCHASE PRICE', field: 'purchasePrice', prefix: '$' },
            { label: 'MONTHLY RENT', field: 'monthlyRent', prefix: '$' },
            { label: 'REPAIR COSTS', field: 'repairCosts', prefix: '$' },
          ].map(({ label, field, prefix }) => (
            <div key={field} style={{ marginBottom: '0.875rem' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', color: '#6b9e6b', marginBottom: '0.25rem' }}>{label}</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#080c08', border: '1px solid #1a2e1a', borderRadius: '6px', padding: '0 0.75rem' }}>
                <span style={{ color: '#4d7a4d', fontSize: '0.875rem' }}>{prefix}</span>
                <input type="number" value={(form as any)[field]} onChange={inp(field)}
                  style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.5rem 0.25rem', color: '#e8f0e8', fontSize: '0.875rem', outline: 'none' }} />
              </div>
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.875rem' }}>
            {[
              { label: 'DOWN PAYMENT %', field: 'downPaymentPct', suffix: '%' },
              { label: 'INTEREST RATE', field: 'interestRate', suffix: '%' },
              { label: 'VACANCY RATE', field: 'vacancyRatePct', suffix: '%' },
              { label: 'EXPENSE RATIO', field: 'expensesPct', suffix: '%' },
            ].map(({ label, field, suffix }) => (
              <div key={field}>
                <label style={{ display: 'block', fontSize: '0.7rem', color: '#6b9e6b', marginBottom: '0.25rem' }}>{label}</label>
                <div style={{ display: 'flex', alignItems: 'center', background: '#080c08', border: '1px solid #1a2e1a', borderRadius: '6px', padding: '0 0.75rem' }}>
                  <input type="number" value={(form as any)[field]} onChange={inp(field)} step="0.1"
                    style={{ flex: 1, background: 'transparent', border: 'none', padding: '0.5rem 0.25rem', color: '#e8f0e8', fontSize: '0.875rem', outline: 'none', width: '60%' }} />
                  <span style={{ color: '#4d7a4d', fontSize: '0.875rem' }}>{suffix}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={analyze} disabled={loading}
            style={{ width: '100%', background: loading ? '#0d2e0d' : '#16a34a', color: 'white', border: 'none', borderRadius: '8px', padding: '0.875rem', fontSize: '1rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
            {loading ? '⚡ Analyzing...' : '⚡ Analyze Deal'}
          </button>
          {error && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>}
          {warning && (
            <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.875rem', background: '#1a1200', border: '1px solid #7c5e00', borderRadius: '6px', fontSize: '0.78rem', color: '#fbbf24', lineHeight: 1.5 }}>
              ⚠️ {warning}
            </div>
          )}
        </div>

        {/* RESULTS PANEL */}
        <div>
          <h3 style={{ color: '#4ade80', fontSize: '0.75rem', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>AI ANALYSIS</h3>
          {!result && !loading && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#4d7a4d', border: '1px dashed #1a2e1a', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <p style={{ fontSize: '0.875rem' }}>Enter deal details and click Analyze</p>
            </div>
          )}
          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#4ade80', border: '1px solid #1a2e1a', borderRadius: '12px' }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.5rem', animation: 'pulse 1s infinite' }}>🤖 Claude is analyzing your deal...</div>
              <p style={{ fontSize: '0.8rem', color: '#4d7a4d' }}>Checking Midwest market conditions...</p>
            </div>
          )}
          {result && (
            <div>
              {/* Score + Verdict */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: '#080c08', border: `2px solid ${scoreColor}`, borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: scoreColor }}>{result.ai.dealScore}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b9e6b', letterSpacing: '0.05em' }}>DEAL SCORE</div>
                </div>
                <div style={{ background: verdictBg, border: '1px solid #1a2e1a', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: scoreColor }}>
                    {result.ai.verdict === 'BUY' ? '✅' : result.ai.verdict === 'PASS' ? '❌' : '🤝'} {result.ai.verdict}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#6b9e6b', letterSpacing: '0.05em' }}>VERDICT</div>
                </div>
              </div>

              {/* Key Metrics */}
              <div style={{ marginBottom: '1rem' }}>
                {[
                  { label: 'Cap Rate', val: `${result.metrics.capRate}%`, good: result.metrics.capRate >= 5 },
                  { label: 'Cash-on-Cash', val: `${result.metrics.cashOnCash}%`, good: result.metrics.cashOnCash >= 6 },
                  { label: 'Monthly Cash Flow', val: `$${result.metrics.monthlyCashFlow.toLocaleString()}`, good: result.metrics.monthlyCashFlow > 0 },
                  { label: 'DSCR', val: result.metrics.dscr.toFixed(2), good: result.metrics.dscr >= 1.2 },
                  { label: 'GRM', val: result.metrics.grm.toFixed(1), good: result.metrics.grm <= 12 },
                  { label: 'Monthly Mortgage', val: `$${result.metrics.monthlyMortgage.toLocaleString()}`, good: true },
                ].map(({ label, val, good }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #1a2e1a' }}>
                    <span style={{ fontSize: '0.8rem', color: '#6b9e6b' }}>{label}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: good ? '#4ade80' : '#f87171' }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* AI Summary */}
              <div style={{ background: '#0d2e0d', borderRadius: '8px', padding: '0.875rem', marginBottom: '0.75rem', fontSize: '0.8rem', lineHeight: 1.6, color: '#86efac' }}>
                💡 {result.ai.summary}
              </div>

              {/* Strengths & Red Flags */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#4ade80', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>STRENGTHS</div>
                  {result.ai.strengths.map((s, i) => <div key={i} style={{ fontSize: '0.75rem', color: '#86efac', marginBottom: '0.25rem' }}>✓ {s}</div>)}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#f87171', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>RED FLAGS</div>
                  {result.ai.redFlags.map((r, i) => <div key={i} style={{ fontSize: '0.75rem', color: '#fca5a5', marginBottom: '0.25rem' }}>⚠ {r}</div>)}
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#6b9e6b', padding: '0.75rem', background: '#080c08', borderRadius: '6px', lineHeight: 1.6 }}>
                🎯 {result.ai.recommendations}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
