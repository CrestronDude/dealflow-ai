import { NextRequest, NextResponse } from 'next/server'
import { fireZapier } from '@/lib/zapier'

export async function POST(req: NextRequest) {
  const { event, ...payload } = await req.json()
  if (!event) return NextResponse.json({ error: 'event required' }, { status: 400 })
  await fireZapier(event as 'signup' | 'deal_analyzed' | 'upgrade', payload)
  return NextResponse.json({ ok: true })
}
