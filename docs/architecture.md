# DealFlow AI — Architecture

## Overview
- Next.js 15 App Router (monorepo in apps/web)
- Supabase: Auth + Postgres + Storage
- Stripe: Subscriptions (4 tiers)
- Claude API: Deal analysis engine
- Vercel: Deploy + Edge functions
- Zapier: All external automations

## Key API Routes
- POST /api/analyze — AI deal analysis
- POST /api/waitlist — Join waitlist
- POST /api/stripe/checkout — Create Stripe session
- POST /api/stripe/webhook — Handle Stripe events
- GET /api/portfolio — Get user portfolio

## Zapier Workflows
1. New signup → Welcome email (Resend) → Add to CRM
2. Deal analyzed → Log to Google Sheets
3. Subscription upgraded → Slack notification + thank you email
4. Daily 8AM → Market research trigger
