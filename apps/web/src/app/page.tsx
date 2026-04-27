import Link from 'next/link'

export default function Home() {
  return (
    <main style={{fontFamily:"'Georgia',serif",background:"#0a0e0a",color:"#e8f0e8",minHeight:"100vh"}}>
      {/* NAV */}
      <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.25rem 2rem",borderBottom:"1px solid #1a2e1a",background:"#0a0e0ae6",backdropFilter:"blur(8px)",position:"sticky",top:0,zIndex:50}}>
        <div style={{fontWeight:700,fontSize:"1.25rem",letterSpacing:"-0.02em"}}>
          ⚡ DealFlow<span style={{color:"#4ade80"}}>AI</span>
        </div>
        <div style={{display:"flex",gap:"1.5rem",alignItems:"center",fontFamily:"system-ui,sans-serif"}}>
          <a href="#features" style={{color:"#86efac",textDecoration:"none",fontSize:"0.9rem"}}>Features</a>
          <a href="#pricing" style={{color:"#86efac",textDecoration:"none",fontSize:"0.9rem"}}>Pricing</a>
          <Link href="/analyze" style={{background:"#16a34a",color:"white",padding:"0.5rem 1.25rem",borderRadius:"6px",textDecoration:"none",fontSize:"0.875rem",fontWeight:600}}>Try Free →</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{maxWidth:"860px",margin:"0 auto",padding:"6rem 2rem 4rem",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"#0d2e0d",border:"1px solid #166534",color:"#4ade80",padding:"0.375rem 1rem",borderRadius:"99px",fontSize:"0.78rem",marginBottom:"2rem",letterSpacing:"0.06em",fontFamily:"system-ui,sans-serif"}}>
          BUILT FOR MIDWEST REAL ESTATE INVESTORS
        </div>
        <h1 style={{fontSize:"clamp(2.5rem,6vw,4.25rem)",fontWeight:700,lineHeight:1.08,letterSpacing:"-0.03em",marginBottom:"1.5rem"}}>
          Analyze Any Deal<br/><span style={{color:"#4ade80"}}>in 60 Seconds.</span>
        </h1>
        <p style={{fontSize:"1.2rem",color:"#86efac",maxWidth:"580px",margin:"0 auto 2.5rem",lineHeight:1.65,fontFamily:"system-ui,sans-serif",fontWeight:300}}>
          AI-powered deal analysis for Missouri & Midwest investors. Instant cap rates, cash flow, DSCR, and a Claude AI deal score — no spreadsheets, no guesswork.
        </p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"1rem"}}>
          <Link href="/analyze" style={{background:"#16a34a",color:"white",padding:"0.875rem 2.25rem",borderRadius:"8px",textDecoration:"none",fontSize:"1rem",fontWeight:700,letterSpacing:"-0.01em"}}>
            Analyze Your First Deal Free →
          </Link>
          <a href="#pricing" style={{border:"1px solid #2d5a2d",color:"#86efac",padding:"0.875rem 2rem",borderRadius:"8px",textDecoration:"none",fontSize:"1rem",fontFamily:"system-ui,sans-serif"}}>
            See Pricing
          </a>
        </div>
        <p style={{color:"#4d7a4d",fontSize:"0.8rem",fontFamily:"system-ui,sans-serif"}}>No credit card · 3 free analyses · Cancel anytime</p>
      </section>

      {/* PROOF STRIP */}
      <div style={{borderTop:"1px solid #1a2e1a",borderBottom:"1px solid #1a2e1a",padding:"1.25rem",textAlign:"center",background:"#080c08",fontFamily:"system-ui,sans-serif"}}>
        <p style={{color:"#4d7a4d",fontSize:"0.8rem",letterSpacing:"0.06em"}}>
          TRUSTED BY INVESTORS IN KANSAS CITY · ST. LOUIS · SPRINGFIELD · COLUMBIA · JOPLIN
        </p>
      </div>

      {/* FEATURES */}
      <section id="features" style={{maxWidth:"1080px",margin:"0 auto",padding:"5rem 2rem"}}>
        <h2 style={{textAlign:"center",fontSize:"2rem",fontWeight:700,marginBottom:"3rem",letterSpacing:"-0.02em"}}>
          Everything a serious investor needs
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.25rem"}}>
          {[
            {icon:"⚡",t:"60-Second Analysis",d:"Enter address + numbers. Get cap rate, CoC, DSCR, GRM, monthly cash flow, and AI deal score instantly."},
            {icon:"🤖",t:"AI Deal Scoring",d:"Claude AI analyzes deals against Midwest market conditions, flags red flags, and issues BUY / PASS / NEGOTIATE."},
            {icon:"📊",t:"Portfolio Dashboard",d:"Track all your properties. See total monthly cash flow, equity growth, and portfolio metrics at a glance."},
            {icon:"📧",t:"Zapier Automations",d:"Auto-send reports to partners, sync to Google Sheets, trigger follow-up emails across 9,000+ apps."},
            {icon:"📄",t:"Lender-Ready Reports",d:"One-click PDF with professional formatting. Send to lenders, hard money lenders, or partners."},
            {icon:"🎯",t:"Missouri Market Focus",d:"Trained on Midwest deal benchmarks. Know if a KC duplex or Columbia SFR actually pencils out."},
          ].map((f,i) => (
            <div key={i} style={{background:"#0d1a0d",border:"1px solid #1a2e1a",borderRadius:"12px",padding:"1.5rem"}}>
              <div style={{fontSize:"1.75rem",marginBottom:"0.625rem"}}>{f.icon}</div>
              <h3 style={{fontWeight:700,marginBottom:"0.5rem",fontSize:"1rem"}}>{f.t}</h3>
              <p style={{color:"#6b9e6b",fontSize:"0.875rem",lineHeight:1.65,fontFamily:"system-ui,sans-serif"}}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{maxWidth:"900px",margin:"0 auto",padding:"4rem 2rem"}}>
        <h2 style={{textAlign:"center",fontSize:"2rem",fontWeight:700,marginBottom:"0.75rem",letterSpacing:"-0.02em"}}>Simple, honest pricing</h2>
        <p style={{textAlign:"center",color:"#6b9e6b",marginBottom:"3rem",fontFamily:"system-ui,sans-serif"}}>Start free. Upgrade when you're ready to scale.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:"1rem"}}>
          {[
            {n:"Free",p:"$0",f:["3 deal analyses","Basic metrics","PDF export"],cta:"Start Free",href:"/analyze",hot:false},
            {n:"Starter",p:"$49/mo",f:["10 analyses/mo","AI deal scores","Email reports"],cta:"Get Started",href:"/analyze",hot:false},
            {n:"Pro",p:"$99/mo",f:["Unlimited analyses","AI insights","Zapier automations","Portfolio tracker"],cta:"Go Pro",href:"/analyze",hot:true},
            {n:"Investor Club",p:"$149/mo",f:["Everything in Pro","Investor CRM","White-label reports","API access"],cta:"Join Club",href:"/analyze",hot:false},
          ].map((p,i) => (
            <div key={i} style={{background:p.hot?"#0d2e0d":"#0d1a0d",border:p.hot?"2px solid #16a34a":"1px solid #1a2e1a",borderRadius:"12px",padding:"1.5rem",position:"relative"}}>
              {p.hot&&<div style={{position:"absolute",top:"-11px",left:"50%",transform:"translateX(-50%)",background:"#16a34a",color:"white",padding:"0.2rem 0.75rem",borderRadius:"99px",fontSize:"0.68rem",fontWeight:700,whiteSpace:"nowrap",fontFamily:"system-ui,sans-serif"}}>MOST POPULAR</div>}
              <div style={{fontWeight:700,marginBottom:"0.25rem"}}>{p.n}</div>
              <div style={{fontSize:"1.75rem",fontWeight:700,color:"#4ade80",marginBottom:"1rem",fontFamily:"system-ui,sans-serif"}}>{p.p}</div>
              <ul style={{listStyle:"none",padding:0,marginBottom:"1.5rem"}}>
                {p.f.map((f,j)=><li key={j} style={{fontSize:"0.83rem",color:"#86efac",marginBottom:"0.375rem",fontFamily:"system-ui,sans-serif"}}>✓ {f}</li>)}
              </ul>
              <Link href={p.href} style={{display:"block",textAlign:"center",background:p.hot?"#16a34a":"transparent",border:p.hot?"none":"1px solid #2d5a2d",color:p.hot?"white":"#86efac",padding:"0.6rem",borderRadius:"6px",textDecoration:"none",fontSize:"0.875rem",fontWeight:600,fontFamily:"system-ui,sans-serif"}}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{textAlign:"center",padding:"5rem 2rem",borderTop:"1px solid #1a2e1a"}}>
        <h2 style={{fontSize:"2.25rem",fontWeight:700,marginBottom:"1rem",letterSpacing:"-0.02em"}}>Ready to find your next deal?</h2>
        <p style={{color:"#6b9e6b",marginBottom:"2rem",fontFamily:"system-ui,sans-serif"}}>Start analyzing deals free. No credit card needed.</p>
        <Link href="/analyze" style={{display:"inline-block",background:"#16a34a",color:"white",padding:"1rem 2.5rem",borderRadius:"8px",textDecoration:"none",fontSize:"1.1rem",fontWeight:700}}>
          Start Analyzing Free →
        </Link>
      </section>

      <footer style={{borderTop:"1px solid #1a2e1a",padding:"2rem",textAlign:"center",color:"#4d7a4d",fontSize:"0.8rem",fontFamily:"system-ui,sans-serif"}}>
        © 2026 DealFlow AI · Built for Midwest real estate investors · Privacy · Terms
      </footer>
    </main>
  )
}
