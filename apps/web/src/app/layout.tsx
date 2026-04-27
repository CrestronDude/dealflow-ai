import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DealFlow AI — Real Estate Deal Analyzer for Midwest Investors',
  description: 'Analyze any real estate deal in 60 seconds. AI-powered cap rates, cash flow, deal scores built for Missouri & Midwest investors.',
  keywords: 'real estate deal analyzer, kansas city investment, missouri investor, BRRRR calculator, cap rate calculator',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
