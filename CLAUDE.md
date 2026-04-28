# Super Claude Product OS v2.1
## Master System Prompt — SuperClaude-Products Workspace

---

## 🔒 WORKSPACE RULES (STRICT — NEVER BREAK)
- Permanently working inside: ~/Desktop/SuperClaude-Products/
- Every file MUST be inside this folder or its subfolders
- Always read this file FIRST on every session/init
- Use Computer Use for ALL filesystem, terminal, git, browser actions
- Git commit + push after every major milestone
- Generate live Artifacts, previews, Figma-style mockups on every feature
- Obsess over UX, retention, viral loops, automated sales

---

## 🔌 CONNECTED TOOLS (Use aggressively and creatively)
- **Zapier MCP** ("superclaude-everything") — Gmail, Sheets, Stripe, Shopify, Slack, Notion, LinkedIn, Calendar, CRM, 9,000+ apps
- **Git / GitHub MCP** — repo management, commits, branches, PRs, issues  
- **Computer Use** — filesystem, terminal, browser, screenshots, app control
- **Claude in Chrome** — browser automation, web research

---

## 🏆 PRODUCT: MidwestDealScout
**"Analyze any real estate deal in 60 seconds. Know before you go."**

Target: RealWealth / investing1984 / Missouri-based investors, syndicators, BRRRR operators, finance/trading audience
Gap: Enterprise tools = $500-2k/mo. Simple tools = no AI. MidwestDealScout = $49-149/mo sweet spot.

### Pricing
| Tier | Price | Key Feature |
|------|-------|-------------|
| Free | $0 | 3 deal analyses |
| Starter | $49/mo | 10 analyses, PDF export |
| Pro | $99/mo | Unlimited AI, Zapier automations |
| Investor Club | $149/mo | Portfolio tracker, white-label |
| Agency | $299/mo | Multi-user, API access |

**Revenue Target:** $1k MRR day 14 → $10k MRR day 30

---

## 🛠 TECH STACK
- Next.js 15 + Tailwind + shadcn/ui
- Supabase (Postgres + Auth + Storage)
- Claude API (claude-sonnet-4-20250514 — deal analysis engine)
- Stripe (subscriptions)
- Vercel (deploy, auto from GitHub)
- Zapier (ALL automations via "superclaude-everything")
- Resend (transactional email)

---

## 📁 PROJECT STRUCTURE
```
SuperClaude-Products/
├── CLAUDE.md              ← Master rules (update frequently)
├── CLAUDE.local.md        ← Private keys (gitignored)
├── .claude/               ← Skills, subagents, settings
├── docs/
│   ├── schema.sql
│   ├── architecture.md
│   ├── launch-checklist.md
│   └── zapier-sequences/
└── apps/web/              ← Next.js 15 app
    └── src/
        ├── app/
        │   ├── page.tsx           ← Landing page
        │   ├── analyze/           ← Deal analyzer UI  
        │   ├── dashboard/         ← Portfolio dashboard
        │   ├── auth/login|signup/ ← Auth pages
        │   └── api/analyze|waitlist|stripe/
        ├── components/deal/DealAnalyzer.tsx
        ├── lib/{supabase,stripe,utils}.ts
        └── middleware.ts
```

---

## 🤖 AGENT TEAM
| Agent | Role | Status |
|-------|------|--------|
| 🏗 Product Architect | DB schema, API design | ✅ Done |
| 🎨 Frontend Engineer | UI/UX, React, live previews | ✅ Done |
| ⚙️ Backend Engineer | API routes, Supabase, Stripe | ✅ Done |
| 💰 Monetization Expert | Pricing, checkout, upsells | ✅ Done |
| 📈 Growth Hacker | SEO, viral loops, launch channels | 🔄 Active |
| 🔧 QA/DevOps | CI/CD, Vercel, monitoring | 🔄 Day 6 |
| ✍️ Content Creator | Email sequences, copy, social | 🔄 Day 5 |

---

## 📋 7-DAY BUILD PLAN
| Day | Focus | Status |
|-----|-------|--------|
| 1 | Foundation: repo, schema, landing, APIs | ✅ DONE |
| 2 | Auth + deal analyzer E2E | ✅ DONE |
| 3 | GitHub push + Vercel deploy live | 🔥 NOW |
| 4 | Supabase live + Stripe connected | ⏳ |
| 5 | Zapier: welcome email, onboarding, nurture | ⏳ |
| 6 | QA + Sentry + PostHog analytics | ⏳ |
| 7 | LAUNCH: Product Hunt, Twitter, Reddit, email | ⏳ |

---

## ⏰ SCHEDULED ROUTINES (Zapier "superclaude-everything" + Computer Use)
- **Daily 8AM CT**: Market research + competitor scan + 3 content ideas → GitHub Issue
- **Every 6hrs**: Run tests + auto-fix bugs + security scan
- **Weekly Mon**: Full MRR report (signups, churn, conversions, experiments)
- **Weekly Fri**: Growth experiment results + next week A/B tests

---

## 📝 RESPONSE FORMAT (Every response ends with)
```
📊 PROGRESS: [what completed]
🔀 GIT STATUS: [branch · commit · clean/dirty]
⏭ NEXT ACTIONS: [3 specific next steps + time estimate]
✅ APPROVALS NEEDED: [anything requiring your decision]
```

---

*Updated: 2026-04-28 | Instructions from uploaded CLAUDE.md | Super Claude Product OS v2.1*

---
## 🚀 DEPLOYMENT STATUS
- Vercel project: dealflow-ai (steven-sutherlands-projects)
- GitHub repo: CrestronDude/dealflow-ai  
- Root directory: apps/web
- Auto-deploy: ON — every push to master triggers deploy
- Last deploy trigger: 2026-04-28
