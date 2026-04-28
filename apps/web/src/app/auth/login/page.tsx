'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setMsg(error.message); setLoading(false); return }
    window.location.href = '/dashboard'
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
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#6b9e6b', marginBottom: '0.375rem' }}>EMAIL</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
              style={{ width: '100%', background: '#080c08', border: '1px solid #1a2e1a', borderRadius: '6px', padding: '0.625rem 0.75rem', color: '#e8f0e8', fontSize: '0.9rem' }} />
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#6b9e6b', marginBottom: '0.375rem' }}>PASSWORD</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: '100%', background: '#080c08', border: '1px solid #1a2e1a', borderRadius: '6px', padding: '0.625rem 0.75rem', color: '#e8f0e8', fontSize: '0.9rem' }} />
          </div>
          {msg && <p style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '1rem' }}>{msg}</p>}
          <button type="submit" disabled={loading}
            style={{ width: '100%', background: '#16a34a', color: 'white', border: 'none', borderRadius: '7px', padding: '0.75rem', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#6b9e6b' }}>
            No account? <Link href="/auth/signup" style={{ color: '#4ade80' }}>Sign up free</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
