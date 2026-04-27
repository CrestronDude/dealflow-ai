import Stripe from 'stripe'
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? 'sk_test_placeholder', {
  apiVersion: '2024-11-20.acacia' as any,
})
export const PLANS = {
  starter:      { name: 'Starter',       price: 4900,  interval: 'month' },
  pro:          { name: 'Pro',           price: 9900,  interval: 'month' },
  investor_club:{ name: 'Investor Club', price: 14900, interval: 'month' },
  agency:       { name: 'Agency',        price: 29900, interval: 'month' },
}
