'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [done, setDone] = useState(false)

  const signup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) { setMsg('Password must be at least 6 characters.'); return }
    setLoading(true)
    setMsg('')
    try {
      // Always capture email via waitlist API (works without Supabase)
      const waitlistRes = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'signup' })
      })

      // Attempt Supabase auth if configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
      const hasSupabase = supabaseUrl && !supabaseUrl.includes('placeholder')

      if (hasSupabase) {
        const { createClient } = await import('@supabase/supabase-js')
        const sb = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '')
        const { error } = await sb.auth.signUp({ email, password, options: { data: { full_name: name } } })
        if (error) { setMsg(error.message); setLoading(false); return }
      }

      setDone(true)
    } catch (err: any) {
      setMsg('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const s: React.CSSProperties = {
    fontFamily: 'system-ui, sans-serif', background: '#0a0e0a',
    color: '#e8f0e8', minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  }

  if (done) return (
    <main style={s}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontFamily: 'Georgia,serif', marginBottom: '0.5rem' }}>You&apos;re on the list!</h2>
        <p style={{ color: '#6b9e6b', marginBottom: '0.5rem' }}>Thanks {name || 'friend'}! We&apos;ve saved your spot.</p>
        <p style={{ color: '#4d7a4d', fontSize: '0.85rem', marginBottom: '1.5rem' }}>We&apos;ll email you at <strong style={{color:'#86efac'}}>{email}</strong> when your account is ready.</p>
        <Link href="/analyze" style={{ background:'#16a34a', color:'white', padding:'0.75rem 1.5rem', borderRadius:'8px', textDecoration:'none', fontSize:'0.9rem', fontWeight:600 }}>
          Analyze a Deal Now →
        </Link>
      </div>
    </main>
  )

  return (
    <main style={s}>
      <div style={{ width: '100%', maxWidth: '380px', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#e8f0e8', fontFamily: 'Georgia,serif', fontWeight: 700, fontSize: '1.25rem' }}>
            ⚡ MidwestDealScout<span style={{ color: '#4ade80' }}>AI</span>
          </Link>
          <p style={{ color: '#6b9e6b', marginTop: '0.5rem', fontSize: '0.9rem' }}>Start analyzing deals free — no credit card</p>
        </div>
        <form onSubmit={signup} style={{ background: '#0d1a0d', border: '1px solid #1a2e1a', borderRadius: '12px', padding: '1.75rem' }}>
          {[
            { label: 'FULL NAME', val: name, set: setName, type: 'text', ph: 'Steven Sutherland' },
            { label: 'EMAIL', val: email, set: setEmail, type: 'email', ph: 'you@example.com' },
            { label: 'PASSWORD', val: password, set: setPassword, type: 'password', ph: 'Min. 6 characters' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#6b9e6b', marginBottom: '0.375rem', letterSpacing: '0.04em' }}>{f.label}</label>
              <input
                type={f.type} value={f.val}
                onChange={e => f.set(e.target.value)}
                required placeholder={f.ph}
                style={{ width: '100%', background: '#080c08', border: '1px solid #1a2e1a', borderRadius: '6px', padding: '0.625rem 0.75rem', color: '#e8f0e8', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          ))}
          {msg && <p style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '1rem', padding: '0.5rem 0.75rem', background: '#2d0a0a', borderRadius: '6px' }}>{msg}</p>}
          <button
            type="submit" disabled={loading}
            style={{ width: '100%', background: loading ? '#0d2e0d' : '#16a34a', color: 'white', border: 'none', borderRadius: '7px', padding: '0.75rem', fontSize: '0.95rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.25rem', transition: 'background 0.2s' }}>
            {loading ? 'Creating account...' : 'Create Free Account →'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.75rem', color: '#4d7a4d' }}>
            3 free analyses · No credit card required
          </p>
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#6b9e6b' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#4ade80' }}>Sign in</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
