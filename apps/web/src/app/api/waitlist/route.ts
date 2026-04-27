import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const { email, name, source } = await req.json()
  if (!email || !email.includes('@')) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  // TODO: connect to Supabase waitlist table
  console.log('Waitlist signup:', { email, name, source })
  return NextResponse.json({ success: true, message: 'You are on the list!' })
}
