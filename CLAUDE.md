# Super Claude Product OS v2.1
## Master System Prompt — SuperClaude-Products Workspace

---

## 🔒 WORKSPACE RULES (HIGHEST PRIORITY — NEVER BREAK)
- Permanently working inside: ~/Desktop/SuperClaude-Products/
- Every file MUST be inside this folder or subfolders
- Always read this file first on every /init or new session
- Use Computer Use for filesystem, terminal, git, and browser
- Git commit after every major milestone

---

## 🏆 WINNING PRODUCT: DealFlow AI
**"Analyze any real estate deal in 60 seconds. Know before you go."**

Target: RealWealth/investing1984 — Missouri/Midwest investors, syndicators, BRRRR operators
Gap: Enterprise tools = $500-2k/mo. Simple tools = no AI. DealFlow AI = $49-149/mo sweet spot.

### Pricing Tiers
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
- Stripe (subscriptions, 4 tiers)
- Vercel (deploy, auto from GitHub)
- Zapier (all automations — 9,000+ apps)
- Resend (transactional email)

---

## 📁 PROJECT STRUCTURE
```
SuperClaude-Products/
├── CLAUDE.md              ← YOU ARE HERE (master rules)
├── CLAUDE.local.md        ← Private keys (gitignored)
├── .gitignore
├── docs/
│   ├── schema.sql         ← Supabase DB schema
│   ├── architecture.md
│   └── launch-checklist.md
└── apps/web/              ← Next.js 15 app
    ├── src/app/
    │   ├── page.tsx       ← Landing page
    │   ├── analyze/       ← Deal analyzer UI
    │   ├── dashboard/     ← Portfolio dashboard
    │   └── api/
    │       ├── analyze/   ← Claude AI deal scorer
    │       ├── waitlist/  ← Email capture
    │       └── stripe/    ← Subscription checkout
    ├── src/components/deal/DealAnalyzer.tsx
    └── src/lib/{supabase,stripe,utils}.ts
```

---

## 🤖 AGENT TEAM
| Agent | Responsibility | Status |
|-------|---------------|--------|
| 🏗 Product Architect | DB schema, API design | ✅ Complete |
| 🎨 Frontend Engineer | UI/UX, React components | ✅ Complete |
| ⚙️ Backend Engineer | API routes, Supabase, Stripe | ✅ Complete |
| 💰 Monetization Expert | Pricing, Stripe checkout | ✅ Complete |
| 📈 Growth Hacker | SEO, viral loops, launch | 🔄 Day 4-7 |
| 🔧 QA/DevOps | CI/CD, Vercel, monitoring | 🔄 Day 6 |
| ✍️ Content Creator | Email sequences, copy | 🔄 Day 5 |

---

## 📋 7-DAY BUILD PLAN
| Day | Focus | Status |
|-----|-------|--------|
| 1 | Foundation: Repo, schema, landing, APIs | ✅ DONE |
| 2 | Supabase live + deal analyzer E2E tested | ⏳ NEXT |
| 3 | Auth (Supabase) + Stripe checkout live | ⏳ |
| 4 | Deploy to Vercel + custom domain | ⏳ |
| 5 | Zapier: welcome email, onboarding, nurture | ⏳ |
| 6 | QA + Sentry + PostHog analytics | ⏳ |
| 7 | LAUNCH: PH, Twitter, Reddit, email blast | ⏳ |

---

## ⏰ SCHEDULED ROUTINES
- Daily 8AM: Market research + competitor scan + 3 content ideas
- Every 6hrs: Tests + auto-fix lint + security scan
- Weekly Mon: MRR report (signups, churn, conversions)
- Weekly Fri: Growth experiment results + next A/B tests

---

## 🔌 CONNECTED TOOLS
- ✅ Zapier MCP (Claude MCP Server — Gmail, Outlook, Calendar, Excel, Office 365)
- ✅ GitHub Integration (Claude connector)
- ✅ Computer Use (filesystem, terminal, browser)
- ✅ Claude in Chrome (browser automation)

---

## ⚙️ /init CHECKLIST (Run on every session start)
1. Read CLAUDE.md ✅
2. Run git status + git log
3. Run TypeScript check
4. Report workspace status
5. Resume from last milestone
6. State next 3 actions

---

*Updated: 2026-04-28 | /init complete | Super Claude Product OS v2.1*
