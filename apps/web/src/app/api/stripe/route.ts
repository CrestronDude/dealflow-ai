import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const PRICE_MAP: Record<string, string> = {
  starter: process.env.STRIPE_STARTER_PRICE_ID ?? '',
  pro: process.env.STRIPE_PRO_PRICE_ID ?? '',
  investor_club: process.env.STRIPE_CLUB_PRICE_ID ?? '',
  agency: process.env.STRIPE_AGENCY_PRICE_ID ?? '',
}

export async function POST(req: NextRequest) {
  const { plan, email } = await req.json()
  const priceId = PRICE_MAP[plan]
  if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  })
  return NextResponse.json({ url: session.url })
}
