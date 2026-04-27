'use client'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const [subm, setSubm] = useState(false)

  const joinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault(); setSubm(true)
    try {
      await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'landing' }) })
      setJoined(true)
    } catch {}
    setSubm(false)
  }

  const s = { fontFamily: 'system-ui,sans-serif' }

  return (
    <main style={{ background: '#0a0e0a', color: '#e8f0e8', minHeight: '100vh', fontFamily: 'Georgia,serif' }}>
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: '1px solid #1a2e1a', position: 'sticky', top: 0, background: '#0a0e0a', zIndex: 50 }}>
        <div style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>⚡ DealFlow<span style={{ color: '#4ade80' }}>AI</span></div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', ...s }}>
          <a href="#pricing" style={{ color: '#86efac', textDecoration: 'none', fontSize: '0.875rem' }}>Pricing</a>
          <a href="/analyze" style={{ background: '#16a34a', color: 'white', padding: '0.5rem 1.25rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}>Try Free →</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '6rem 2rem 4rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#0d2e0d', border: '1px solid #166534', color: '#4ade80', padding: '0.375rem 1rem', borderRadius: '999px', fontSize: '0.75rem', marginBottom: '2rem', letterSpacing: '0.06em', ...s }}>
          BUILT FOR MIDWEST REAL ESTATE INVESTORS
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem,6vw,4.25rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
          Analyze Any Deal<br /><span style={{ color: '#4ade80' }}>in 60 Seconds.</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#86efac', maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.65, ...s, fontWeight: 300 }}>
          AI-powered deal analysis for serious investors. Instant cap rates, cash flow projections, deal scores, and BUY/PASS verdicts — no spreadsheets required.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <a href="/analyze" style={{ background: '#16a34a', color: 'white', padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '1rem', fontWeight: 700, ...s }}>
            Analyze Your First Deal Free →
          </a>
          <a href="#how" style={{ border: '1px solid #2d5a2d', color: '#86efac', padding: '0.875rem 2rem', borderRadius: '8px', textDecoration: 'none', fontSize: '1rem', ...s }}>
            See How It Works
          </a>
        </div>
        <p style={{ color: '#4d7a4d', fontSize: '0.8rem', ...s }}>No credit card · 3 free analyses · Cancel anytime</p>
      </section>

      {/* Stats bar */}
      <div style={{ borderTop: '1px solid #1a2e1a', borderBottom: '1px solid #1a2e1a', background: '#080c08', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '1rem', textAlign: 'center' }}>
          {[['60s','Average analysis time'],['6+','Key metrics calculated'],['$49','Starting price/mo'],['A+','Deal scoring AI']].map(([val,label],i) => (
            <div key={i}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#4ade80' }}>{val}</div>
              <div style={{ fontSize: '0.75rem', color: '#4d7a4d', ...s }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how" style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>How it works</h2>
        <p style={{ textAlign: 'center', color: '#6b9e6b', marginBottom: '3rem', ...s }}>Three steps from address to decision.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.5rem' }}>
          {[
            { n: '01', title: 'Enter deal details', desc: 'Address, purchase price, rent estimate, down payment — takes 30 seconds.' },
            { n: '02', title: 'AI crunches numbers', desc: 'Cap rate, cash-on-cash, DSCR, GRM, monthly cash flow, and more — instantly.' },
            { n: '03', title: 'Get your verdict', desc: 'BUY / NEGOTIATE / PASS with specific recommendations and red flags.' },
          ].map((step, i) => (
            <div key={i} style={{ background: '#0d1a0d', border: '1px solid #1a2e1a', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1a2e1a', marginBottom: '0.75rem' }}>{step.n}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>{step.title}</h3>
              <p style={{ color: '#6b9e6b', fontSize: '0.875rem', lineHeight: 1.6, ...s }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 2rem 5rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '3rem', letterSpacing: '-0.02em' }}>Everything you need to <span style={{ color: '#4ade80' }}>move faster</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: '1.25rem' }}>
          {[
            { icon: '⚡', t: '60-Second Analysis', d: 'Cap rate, cash-on-cash, DSCR, GRM, monthly cash flow, and AI deal score — instantly.' },
            { icon: '🤖', t: 'AI Deal Scoring', d: 'Every deal gets a 1–100 score + BUY / NEGOTIATE / PASS verdict with specific reasoning.' },
            { icon: '🚩', t: 'Red Flag Detection', d: 'AI automatically flags low DSCR, negative cash flow, inflated rents, and bad assumptions.' },
            { icon: '📊', t: 'Portfolio Dashboard', d: 'Track all your deals and properties. Total cash flow, equity, and portfolio-level metrics.' },
            { icon: '📄', t: 'Lender-Ready Reports', d: 'One-click PDF with professional formatting. Send to hard money lenders or partners.' },
            { icon: '🎯', t: 'Missouri Market Focus', d: 'Benchmarks tuned for KC, St. Louis, Springfield, Columbia. Know what pencils locally.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#0d1a0d', border: '1px solid #1a2e1a', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{f.t}</h3>
              <p style={{ color: '#6b9e6b', fontSize: '0.85rem', lineHeight: 1.6, ...s }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 2rem 5rem' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Simple pricing</h2>
        <p style={{ textAlign: 'center', color: '#6b9e6b', marginBottom: '3rem', ...s }}>Start free. Scale as you close more deals.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '1rem' }}>
          {[
            { name: 'Free', price: '$0', sub: 'forever', features: ['3 deal analyses', 'All 8 metrics', 'PDF export'], cta: 'Start Free', pop: false },
            { name: 'Starter', price: '$49', sub: '/month', features: ['10 analyses/mo', 'AI deal scores', 'Email reports', 'Priority support'], cta: 'Get Started', pop: false },
            { name: 'Pro', price: '$99', sub: '/month', features: ['Unlimited analyses', 'AI insights', 'Portfolio tracker', 'Zapier automations'], cta: 'Go Pro', pop: true },
            { name: 'Club', price: '$149', sub: '/month', features: ['Everything in Pro', 'Investor CRM', 'White-label PDFs', 'API access'], cta: 'Join Club', pop: false },
          ].map((p, i) => (
            <div key={i} style={{ background: '#0d1a0d', border: p.pop ? '2px solid #16a34a' : '1px solid #1a2e1a', borderRadius: '12px', padding: '1.5rem', position: 'relative' }}>
              {p.pop && <div style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: '#16a34a', color: 'white', padding: '2px 12px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700, whiteSpace: 'nowrap', ...s }}>MOST POPULAR</div>}
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{p.name}</div>
              <div style={{ marginBottom: '1rem' }}><span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#4ade80' }}>{p.price}</span><span style={{ fontSize: '0.8rem', color: '#4d7a4d', ...s }}>{p.sub}</span></div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.25rem' }}>
                {p.features.map((f, j) => <li key={j} style={{ fontSize: '0.82rem', color: '#86efac', marginBottom: '0.35rem', ...s }}>✓ {f}</li>)}
              </ul>
              <a href="/analyze" style={{ display: 'block', textAlign: 'center', background: p.pop ? '#16a34a' : 'transparent', border: p.pop ? 'none' : '1px solid #2d5a2d', color: p.pop ? 'white' : '#86efac', padding: '0.6rem', borderRadius: '6px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, ...s }}>{p.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist CTA */}
      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem 6rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Get early access</h2>
        <p style={{ color: '#6b9e6b', marginBottom: '2rem', ...s }}>Join 200+ Missouri investors on the waitlist. First month 50% off.</p>
        {joined ? (
          <div style={{ background: '#0d2e0d', border: '1px solid #166534', borderRadius: '12px', padding: '1.5rem', color: '#4ade80', fontWeight: 700 }}>
            🎉 You are on the list! We will email you soon.
          </div>
        ) : (
          <form onSubmit={joinWaitlist} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
              style={{ flex: 1, minWidth: '220px', background: '#0d1a0d', border: '1px solid #2d5a2d', borderRadius: '8px', padding: '0.875rem 1rem', color: '#e8f0e8', fontSize: '0.9rem', outline: 'none', ...s }} />
            <button type="submit" disabled={subm}
              style={{ background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', padding: '0.875rem 1.5rem', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', ...s }}>
              {subm ? 'Joining...' : 'Join Waitlist →'}
            </button>
          </form>
        )}
      </section>

      <footer style={{ borderTop: '1px solid #1a2e1a', padding: '2rem', textAlign: 'center', color: '#4d7a4d', fontSize: '0.8rem', ...s }}>
        © 2026 DealFlow AI · Built for Midwest investors · <a href="#" style={{ color: '#4d7a4d' }}>Privacy</a> · <a href="#" style={{ color: '#4d7a4d' }}>Terms</a>
      </footer>
    </main>
  )
}
