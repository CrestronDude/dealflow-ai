# DealFlow AI — Zapier Automation Setup

## Zap 1: New Signup → Welcome Email
- Trigger: Webhook (Supabase auth.users insert)
- Action 1: Gmail — Send welcome email (template above)
- Action 2: Google Sheets — Log signup (email, name, date, source)
- Action 3: Slack — Post to #signups channel

## Zap 2: New Deal Analyzed → Track + Nurture
- Trigger: Webhook (POST from /api/analyze)
- Action 1: Google Sheets — Log deal (address, score, verdict, user)
- Action 2: Gmail — If score > 80, send "Great deal alert" email

## Zap 3: Subscription Upgraded → Celebration
- Trigger: Stripe — subscription.created/updated
- Action 1: Gmail — Send upgrade confirmation + onboarding tips
- Action 2: Slack — Post to #revenue channel  
- Action 3: Google Sheets — Update subscriber list

## Zap 4: Daily 8AM Market Research
- Trigger: Schedule (daily 8AM CT)
- Action 1: Web search — "Missouri real estate news today"
- Action 2: Gmail — Send digest to team
- Action 3: Create GitHub Issue — "Daily research: [date]"

## Webhook URL (add to env):
ZAPIER_WEBHOOK_SIGNUP=https://hooks.zapier.com/YOUR_SIGNUP_HOOK
ZAPIER_WEBHOOK_DEAL=https://hooks.zapier.com/YOUR_DEAL_HOOK
