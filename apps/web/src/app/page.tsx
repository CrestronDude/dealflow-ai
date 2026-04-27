// DealFlow AI — Landing Page
// Next.js 15 + Tailwind + shadcn/ui
export default function LandingPage() {
  return (
    <main style={{fontFamily:"'Georgia', serif", background:"#0a0e0a", color:"#e8f0e8", minHeight:"100vh"}}>
      {/* Nav */}
      <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.25rem 2rem",borderBottom:"1px solid #1a2e1a",position:"sticky",top:0,background:"#0a0e0a",zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
          <span style={{fontSize:"1.5rem"}}>⚡</span>
          <span style={{fontFamily:"'Georgia',serif",fontWeight:700,fontSize:"1.25rem",letterSpacing:"-0.02em"}}>DealFlow<span style={{color:"#4ade80"}}>AI</span></span>
        </div>
        <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
          <a href="#pricing" style={{color:"#86efac",textDecoration:"none",fontSize:"0.875rem"}}>Pricing</a>
          <a href="/auth/login" style={{color:"#86efac",textDecoration:"none",fontSize:"0.875rem"}}>Sign In</a>
          <a href="/auth/signup" style={{background:"#16a34a",color:"white",padding:"0.5rem 1.25rem",borderRadius:"6px",textDecoration:"none",fontSize:"0.875rem",fontWeight:600}}>Start Free →</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{maxWidth:"900px",margin:"0 auto",padding:"6rem 2rem 4rem",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"#0d2e0d",border:"1px solid #166534",color:"#4ade80",padding:"0.375rem 1rem",borderRadius:"999px",fontSize:"0.8rem",marginBottom:"2rem",letterSpacing:"0.05em"}}>
          BUILT FOR MIDWEST REAL ESTATE INVESTORS
        </div>
        <h1 style={{fontSize:"clamp(2.5rem,6vw,4.5rem)",fontWeight:700,lineHeight:1.1,letterSpacing:"-0.03em",marginBottom:"1.5rem"}}>
          Analyze Any Deal<br/><span style={{color:"#4ade80"}}>in 60 Seconds.</span>
        </h1>
        <p style={{fontSize:"1.2rem",color:"#86efac",maxWidth:"600px",margin:"0 auto 2.5rem",lineHeight:1.6,fontFamily:"system-ui, sans-serif",fontWeight:300}}>
          AI-powered deal analysis for serious investors. Instant cap rates, cash flow projections, deal scores, and actionable insights — no spreadsheets required.
        </p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          <a href="/auth/signup" style={{background:"#16a34a",color:"white",padding:"0.875rem 2rem",borderRadius:"8px",textDecoration:"none",fontSize:"1rem",fontWeight:700,letterSpacing:"-0.01em"}}>
            Analyze Your First Deal Free →
          </a>
          <a href="#demo" style={{border:"1px solid #2d5a2d",color:"#86efac",padding:"0.875rem 2rem",borderRadius:"8px",textDecoration:"none",fontSize:"1rem"}}>
            Watch Demo
          </a>
        </div>
        <p style={{color:"#4d7a4d",fontSize:"0.8rem",marginTop:"1rem",fontFamily:"system-ui,sans-serif"}}>No credit card required · 3 free analyses · Cancel anytime</p>
      </section>

      {/* Social Proof */}
      <section style={{borderTop:"1px solid #1a2e1a",borderBottom:"1px solid #1a2e1a",padding:"1.5rem",textAlign:"center",background:"#080c08"}}>
        <p style={{color:"#4d7a4d",fontSize:"0.85rem",fontFamily:"system-ui,sans-serif",letterSpacing:"0.05em"}}>
          TRUSTED BY INVESTORS IN MISSOURI · KANSAS CITY · ST. LOUIS · SPRINGFIELD · COLUMBIA
        </p>
      </section>

      {/* Live Demo / Analyzer Preview */}
      <section id="demo" style={{maxWidth:"800px",margin:"0 auto",padding:"5rem 2rem"}}>
        <h2 style={{textAlign:"center",fontSize:"2rem",fontWeight:700,marginBottom:"3rem",letterSpacing:"-0.02em"}}>
          Try it right now
        </h2>
        <DealAnalyzerDemo />
      </section>

      {/* Features */}
      <section style={{maxWidth:"1100px",margin:"0 auto",padding:"4rem 2rem"}}>
        <h2 style={{textAlign:"center",fontSize:"2rem",fontWeight:700,marginBottom:"3rem",letterSpacing:"-0.02em"}}>
          Everything you need to <span style={{color:"#4ade80"}}>move faster</span>
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
          {[
            {icon:"⚡",title:"60-Second Analysis",desc:"Enter an address and numbers. Get cap rate, cash-on-cash, DSCR, GRM, monthly cash flow, and an AI deal score instantly."},
            {icon:"🤖",title:"AI Deal Scoring",desc:"Claude AI analyzes every deal against Midwest market conditions, flags red flags, and gives you a BUY / PASS / NEGOTIATE verdict."},
            {icon:"📊",title:"Portfolio Dashboard",desc:"Track all your properties in one place. See total monthly cash flow, equity growth, and portfolio-level metrics at a glance."},
            {icon:"📧",title:"Zapier Automations",desc:"Auto-send deal reports to partners, sync to Google Sheets, trigger follow-up emails, and connect to 9,000+ apps."},
            {icon:"📄",title:"Lender-Ready Reports",desc:"One-click PDF export with professional formatting. Send to lenders, partners, or your own records."},
            {icon:"🎯",title:"Missouri Market Focus",desc:"Trained on Midwest deal benchmarks. Know if a Kansas City duplex or Columbia rental actually pencils out."},
          ].map((f,i) => (
            <div key={i} style={{background:"#0d1a0d",border:"1px solid #1a2e1a",borderRadius:"12px",padding:"1.5rem"}}>
              <div style={{fontSize:"2rem",marginBottom:"0.75rem"}}>{f.icon}</div>
              <h3 style={{fontWeight:700,marginBottom:"0.5rem",fontSize:"1rem"}}>{f.title}</h3>
              <p style={{color:"#6b9e6b",fontSize:"0.875rem",lineHeight:1.6,fontFamily:"system-ui,sans-serif"}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{maxWidth:"900px",margin:"0 auto",padding:"4rem 2rem"}}>
        <h2 style={{textAlign:"center",fontSize:"2rem",fontWeight:700,marginBottom:"0.75rem",letterSpacing:"-0.02em"}}>Simple, honest pricing</h2>
        <p style={{textAlign:"center",color:"#6b9e6b",marginBottom:"3rem",fontFamily:"system-ui,sans-serif"}}>Start free. Scale as you grow.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem"}}>
          {[
            {name:"Free",price:"$0",features:["3 deal analyses","Basic metrics","PDF export"],cta:"Start Free",highlight:false},
            {name:"Starter",price:"$49/mo",features:["10 analyses/mo","AI deal scores","Email reports","Priority support"],cta:"Get Started",highlight:false},
            {name:"Pro",price:"$99/mo",features:["Unlimited analyses","AI insights","Zapier automations","Portfolio tracker"],cta:"Go Pro",highlight:true},
            {name:"Investor Club",price:"$149/mo",features:["Everything in Pro","Investor CRM","White-label reports","API access"],cta:"Join Club",highlight:false},
          ].map((p,i) => (
            <div key={i} style={{
              background: p.highlight ? "#0d2e0d" : "#0d1a0d",
              border: p.highlight ? "2px solid #16a34a" : "1px solid #1a2e1a",
              borderRadius:"12px", padding:"1.5rem",
              position:"relative"
            }}>
              {p.highlight && <div style={{position:"absolute",top:"-12px",left:"50%",transform:"translateX(-50%)",background:"#16a34a",color:"white",padding:"0.25rem 0.75rem",borderRadius:"999px",fontSize:"0.7rem",fontWeight:700,whiteSpace:"nowrap"}}>MOST POPULAR</div>}
              <div style={{fontWeight:700,marginBottom:"0.25rem"}}>{p.name}</div>
              <div style={{fontSize:"1.75rem",fontWeight:700,color:"#4ade80",marginBottom:"1rem"}}>{p.price}</div>
              <ul style={{listStyle:"none",padding:0,marginBottom:"1.5rem"}}>
                {p.features.map((f,j) => <li key={j} style={{fontSize:"0.85rem",color:"#86efac",marginBottom:"0.4rem",fontFamily:"system-ui,sans-serif"}}>✓ {f}</li>)}
              </ul>
              <a href="/auth/signup" style={{display:"block",textAlign:"center",background: p.highlight ? "#16a34a" : "transparent",border: p.highlight ? "none" : "1px solid #2d5a2d",color: p.highlight ? "white" : "#86efac",padding:"0.625rem",borderRadius:"6px",textDecoration:"none",fontSize:"0.875rem",fontWeight:600}}>{p.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{textAlign:"center",padding:"5rem 2rem",borderTop:"1px solid #1a2e1a"}}>
        <h2 style={{fontSize:"2.5rem",fontWeight:700,marginBottom:"1rem",letterSpacing:"-0.02em"}}>Ready to find your next deal?</h2>
        <p style={{color:"#6b9e6b",marginBottom:"2rem",fontFamily:"system-ui,sans-serif"}}>Join investors already using DealFlow AI to analyze faster and invest smarter.</p>
        <a href="/auth/signup" style={{display:"inline-block",background:"#16a34a",color:"white",padding:"1rem 2.5rem",borderRadius:"8px",textDecoration:"none",fontSize:"1.1rem",fontWeight:700}}>
          Start Analyzing Free →
        </a>
      </section>

      <footer style={{borderTop:"1px solid #1a2e1a",padding:"2rem",textAlign:"center",color:"#4d7a4d",fontSize:"0.8rem",fontFamily:"system-ui,sans-serif"}}>
        © 2026 DealFlow AI · Built for Midwest investors · Privacy · Terms
      </footer>
    </main>
  )
}

function DealAnalyzerDemo() {
  return (
    <div style={{background:"#0d1a0d",border:"1px solid #1a2e1a",borderRadius:"16px",overflow:"hidden"}}>
      <div style={{background:"#080c08",padding:"1rem 1.5rem",borderBottom:"1px solid #1a2e1a",display:"flex",alignItems:"center",gap:"0.5rem"}}>
        <div style={{width:12,height:12,borderRadius:"50%",background:"#ef4444"}}></div>
        <div style={{width:12,height:12,borderRadius:"50%",background:"#f59e0b"}}></div>
        <div style={{width:12,height:12,borderRadius:"50%",background:"#22c55e"}}></div>
        <span style={{marginLeft:"0.5rem",fontSize:"0.8rem",color:"#4d7a4d",fontFamily:"system-ui,sans-serif"}}>DealFlow AI Analyzer</span>
      </div>
      <div style={{padding:"2rem",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}}>
        {/* Input side */}
        <div>
          <h3 style={{fontSize:"0.875rem",color:"#4ade80",marginBottom:"1.25rem",fontFamily:"system-ui,sans-serif",fontWeight:600,letterSpacing:"0.05em"}}>DEAL INPUTS</h3>
          {[
            {label:"Property Address",val:"1247 Oak St, Kansas City MO"},
            {label:"Purchase Price",val:"$185,000"},
            {label:"Monthly Rent",val:"$1,650"},
            {label:"Down Payment",val:"20%"},
            {label:"Interest Rate",val:"7.0%"},
          ].map((f,i) => (
            <div key={i} style={{marginBottom:"0.875rem"}}>
              <div style={{fontSize:"0.7rem",color:"#4d7a4d",marginBottom:"0.25rem",fontFamily:"system-ui,sans-serif",letterSpacing:"0.05em"}}>{f.label.toUpperCase()}</div>
              <div style={{background:"#080c08",border:"1px solid #1a2e1a",borderRadius:"6px",padding:"0.5rem 0.75rem",fontSize:"0.875rem",color:"#86efac",fontFamily:"system-ui,sans-serif"}}>{f.val}</div>
            </div>
          ))}
          <button style={{width:"100%",background:"#16a34a",color:"white",border:"none",borderRadius:"8px",padding:"0.75rem",fontSize:"0.9rem",fontWeight:700,cursor:"pointer",marginTop:"0.5rem"}}>
            ⚡ Analyze Deal
          </button>
        </div>
        {/* Output side */}
        <div>
          <h3 style={{fontSize:"0.875rem",color:"#4ade80",marginBottom:"1.25rem",fontFamily:"system-ui,sans-serif",fontWeight:600,letterSpacing:"0.05em"}}>AI ANALYSIS</h3>
          <div style={{background:"#080c08",border:"1px solid #166534",borderRadius:"8px",padding:"1rem",marginBottom:"1rem",textAlign:"center"}}>
            <div style={{fontSize:"2.5rem",fontWeight:700,color:"#4ade80"}}>78</div>
            <div style={{fontSize:"0.75rem",color:"#6b9e6b",fontFamily:"system-ui,sans-serif"}}>DEAL SCORE</div>
            <div style={{fontSize:"0.8rem",fontWeight:700,color:"#22c55e",marginTop:"0.25rem"}}>✅ BUY</div>
          </div>
          {[
            {label:"Cap Rate",val:"6.8%",good:true},
            {label:"Cash-on-Cash",val:"8.2%",good:true},
            {label:"Monthly Cash Flow",val:"+$312",good:true},
            {label:"DSCR",val:"1.18",good:true},
          ].map((m,i) => (
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.4rem 0",borderBottom:"1px solid #1a2e1a"}}>
              <span style={{fontSize:"0.8rem",color:"#6b9e6b",fontFamily:"system-ui,sans-serif"}}>{m.label}</span>
              <span style={{fontSize:"0.875rem",fontWeight:700,color: m.good ? "#4ade80" : "#f87171",fontFamily:"system-ui,sans-serif"}}>{m.val}</span>
            </div>
          ))}
          <div style={{marginTop:"1rem",padding:"0.75rem",background:"#0d2e0d",borderRadius:"6px",fontSize:"0.75rem",color:"#86efac",lineHeight:1.5,fontFamily:"system-ui,sans-serif"}}>
            💡 <strong>AI Insight:</strong> Strong cash flow for KC market. Below-average price-to-rent ratio signals upside. Consider negotiating 5% below ask.
          </div>
        </div>
      </div>
    </div>
  )
}
