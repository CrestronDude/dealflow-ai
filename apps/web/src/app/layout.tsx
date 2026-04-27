import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'DealFlow AI — Analyze Any Real Estate Deal in 60 Seconds',
  description: 'AI-powered deal analyzer for Midwest real estate investors. Instant cap rates, cash flow, deal scores. Built for Missouri investors.',
  keywords: 'real estate deal analyzer, Kansas City investment, Missouri real estate, BRRRR calculator, cap rate calculator',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
