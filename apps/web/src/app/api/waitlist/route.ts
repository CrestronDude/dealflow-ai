import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { zapierFire } from '@/lib/zapier'

export async function POST(req: NextRequest) {
  const { email, name, source } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const { error } = await supabase.from('waitlist').insert({ email, name, source: source ?? 'landing' })
  if (error && error.code !== '23505') return NextResponse.json({ error: error.message }, { status: 500 })

  // Fire Zapier "superclaude-everything" — triggers welcome email + CRM + Google Sheets
  await zapierFire('signup', { email, name, source })

  return NextResponse.json({ success: true })
}
