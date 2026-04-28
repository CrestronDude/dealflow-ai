'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
      const hasSupabase = supabaseUrl && 
        !supabaseUrl.includes('placeholder') && 
        supabaseUrl.startsWith('https://')

      if (!hasSupabase) {
        // No auth configured — treat as guest, go straight to analyzer
        router.push('/analyze')
        return
      }

      const { createClient } = await import('@supabase/supabase-js')
      const sb = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '')
      const { error } = await sb.auth.signInWithPassword({ email, password })
      if (error) { setMsg(error.message); setLoading(false); return }
      router.push('/dashboard')
    } catch {
      setMsg('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const s: React.CSSProperties = {
    fontFamily: 'system-ui, sans-serif',
    background: '#0a0e0a',
    color: '#e8f0e8',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#080c08',
    border: '1px solid #1a2e1a',
    borderRadius: '6px',
    padding: '0.625rem 0.75rem',
    color: '#e8f0e8',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <main style={s}>
      <div style={{ width: '100%', maxWidth: '380px', padding: '0 1.5rem' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#e8f0e8', fontFamily: 'Georgia,serif', fontWeight: 700, fontSize: '1.25rem' }}>
            ⚡ MidwestDealScout<span style={{ color: '#4ade80' }}>AI</span>
          </Link>
          <p style={{ color: '#6b9e6b', marginTop: '0.5rem', fontSize: '0.9rem' }}>Sign in to your account</p>
        </div>

        {/* Guest CTA — always visible at top */}
        <Link
          href="/analyze"
          style={{
            display: 'block', textAlign: 'center',
            background: '#0d2e0d', border: '1px solid #16a34a',
            color: '#4ade80', borderRadius: '8px',
            padding: '0.75rem', marginBottom: '1.25rem',
            textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600,
          }}
        >
          ⚡ Try as Guest — No Login Required →
        </Link>

        <div style={{ textAlign: 'center', color: '#4d7a4d', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
          — or sign in below —
        </div>

        {/* Login form */}
        <form onSubmit={login} style={{ background: '#0d1a0d', border: '1px solid #1a2e1a', borderRadius: '12px', padding: '1.75rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#6b9e6b', marginBottom: '0.375rem', letterSpacing: '0.04em' }}>EMAIL</label>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              required placeholder="you@example.com"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#6b9e6b', marginBottom: '0.375rem', letterSpacing: '0.04em' }}>PASSWORD</label>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              required placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          {msg && (
            <p style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '1rem', padding: '0.5rem 0.75rem', background: '#2d0a0a', borderRadius: '6px' }}>
              {msg}
            </p>
          )}

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%', background: loading ? '#0d2e0d' : '#16a34a',
              color: 'white', border: 'none', borderRadius: '7px',
              padding: '0.75rem', fontSize: '0.95rem', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
            }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#6b9e6b' }}>
            No account?{' '}
            <Link href="/auth/signup" style={{ color: '#4ade80' }}>Sign up free</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
