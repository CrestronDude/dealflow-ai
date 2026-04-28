import Link from 'next/link'

export default function Dashboard() {
  return (
    <main style={{fontFamily:"system-ui,sans-serif",background:"#0a0e0a",color:"#e8f0e8",minHeight:"100vh"}}>
      <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem 2rem",borderBottom:"1px solid #1a2e1a"}}>
        <Link href="/" style={{fontWeight:700,fontSize:"1.1rem",textDecoration:"none",color:"#e8f0e8",fontFamily:"Georgia,serif"}}>
          ⚡ MidwestDealScout<span style={{color:"#4ade80"}}>AI</span>
        </Link>
        <div style={{display:"flex",gap:"1.5rem",alignItems:"center"}}>
          <Link href="/analyze" style={{color:"#86efac",textDecoration:"none",fontSize:"0.875rem"}}>New Analysis</Link>
          <div style={{width:32,height:32,borderRadius:"50%",background:"#0d2e0d",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.875rem",color:"#4ade80",fontWeight:600}}>SS</div>
        </div>
      </nav>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"2rem"}}>
        <h1 style={{fontSize:"1.5rem",fontWeight:600,marginBottom:"1.5rem"}}>Your Dashboard</h1>
        
        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem",marginBottom:"2rem"}}>
          {[
            {l:"Deals Analyzed",v:"0",sub:"This month"},
            {l:"Portfolio Value",v:"$0",sub:"0 properties"},
            {l:"Monthly Cash Flow",v:"$0",sub:"Projected"},
            {l:"Avg Deal Score",v:"—",sub:"No deals yet"},
          ].map((s,i)=>(
            <div key={i} style={{background:"#0d1a0d",border:"1px solid #1a2e1a",borderRadius:"10px",padding:"1.25rem"}}>
              <div style={{fontSize:"0.75rem",color:"#6b9e6b",marginBottom:"0.375rem",letterSpacing:"0.03em"}}>{s.l.toUpperCase()}</div>
              <div style={{fontSize:"1.75rem",fontWeight:600,color:"#4ade80"}}>{s.v}</div>
              <div style={{fontSize:"0.75rem",color:"#4d7a4d",marginTop:"0.25rem"}}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div style={{background:"#0d1a0d",border:"1px dashed #2d5a2d",borderRadius:"12px",padding:"4rem",textAlign:"center"}}>
          <div style={{fontSize:"2rem",marginBottom:"1rem"}}>⚡</div>
          <h2 style={{fontSize:"1.25rem",fontWeight:600,marginBottom:"0.5rem"}}>Analyze your first deal</h2>
          <p style={{color:"#6b9e6b",marginBottom:"1.5rem",fontSize:"0.9rem"}}>Enter a property address and numbers to get an instant AI deal score.</p>
          <Link href="/analyze" style={{background:"#16a34a",color:"white",padding:"0.75rem 1.75rem",borderRadius:"8px",textDecoration:"none",fontSize:"0.9rem",fontWeight:600}}>
            Analyze a Deal →
          </Link>
        </div>
      </div>
    </main>
  )
}
