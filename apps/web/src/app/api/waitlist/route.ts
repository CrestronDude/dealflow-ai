import { NextRequest, NextResponse } from 'next/server'
import { fireZapier } from '@/lib/zapier'

export async function POST(req: NextRequest) {
  const { email, name, source } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  // Try Supabase if configured
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
    if (url && !url.includes('placeholder') && key && !key.includes('placeholder')) {
      const { createClient } = await import('@supabase/supabase-js')
      const sb = createClient(url, key)
      await sb.from('waitlist').insert({ email, name, source: source ?? 'landing' })
    }
  } catch (e) {
    // Supabase not configured yet — that's OK, Zapier still fires
    console.log('Supabase not configured, skipping DB insert')
  }

  // Always fire Zapier (captures lead regardless of DB state)
  await fireZapier('signup', { email, name, source })

  return NextResponse.json({ success: true })
}
