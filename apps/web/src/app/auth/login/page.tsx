'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
      const hasSupabase = supabaseUrl && !supabaseUrl.includes('placeholder')

      if (!hasSupabase) {
        setMsg('Auth not configured yet — use the deal analyzer as a guest.')
        setLoading(false)
        return
      }

      const { createClient } = await import('@supabase/supabase-js')
      const sb = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '')
      const { error } = await sb.auth.signInWithPassword({ email, password })
      if (error) { setMsg(error.message); setLoading(false); return }
      window.location.href = '/dashboard'
    } catch {
      setMsg('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const s: React.CSSProperties = {
    fontFamily: 'system-ui, sans-serif', background: '#0a0e0a',
    color: '#e8f0e8', minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  }

  return (
    <main style={s}>
      <div style={{ width: '100%', maxWidth: '380px', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#e8f0e8', fontFamily: 'Georgia,serif', fontWeight: 700, fontSize: '1.25rem' }}>
            ⚡ MidwestDealScout<span style={{ color: '#4ade80' }}>AI</span>
          </Link>
          <p style={{ color: '#6b9e6b', marginTop: '0.5rem', fontSize: '0.9rem' }}>Sign in to your account</p>
        </div>
        <form onSubmit={login} style={{ background: '#0d1a0d', border: '1px solid #1a2e1a', borderRadius: '12px', padding: '1.75rem' }}>
          {[
            { label: 'EMAIL', val: email, set: setEmail, type: 'email', ph: 'you@example.com' },
            { label: 'PASSWORD', val: password, set: setPassword, type: 'password', ph: '••••••••' },
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
            style={{ width: '100%', background: loading ? '#0d2e0d' : '#16a34a', color: 'white', border: 'none', borderRadius: '7px', padding: '0.75rem', fontSize: '0.95rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#6b9e6b' }}>
            No account?{' '}
            <Link href="/auth/signup" style={{ color: '#4ade80' }}>Sign up free</Link>
          </p>
          <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <Link href="/analyze" style={{ color: '#4d7a4d', fontSize: '0.8rem' }}>Or try the analyzer as a guest →</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
