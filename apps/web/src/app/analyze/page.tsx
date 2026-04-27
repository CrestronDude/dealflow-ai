import DealAnalyzer from '@/components/deal/DealAnalyzer'
import Link from 'next/link'

export default function AnalyzePage() {
  return (
    <main style={{fontFamily:"'Georgia',serif",background:"#0a0e0a",color:"#e8f0e8",minHeight:"100vh"}}>
      <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem 2rem",borderBottom:"1px solid #1a2e1a"}}>
        <Link href="/" style={{fontWeight:700,fontSize:"1.1rem",textDecoration:"none",color:"#e8f0e8"}}>
          ⚡ DealFlow<span style={{color:"#4ade80"}}>AI</span>
        </Link>
        <div style={{fontSize:"0.8rem",color:"#4d7a4d",fontFamily:"system-ui,sans-serif"}}>3 free analyses remaining</div>
      </nav>
      <div style={{maxWidth:"1000px",margin:"0 auto",padding:"2.5rem 2rem"}}>
        <h1 style={{fontSize:"1.75rem",fontWeight:700,marginBottom:"0.5rem",letterSpacing:"-0.02em"}}>Deal Analyzer</h1>
        <p style={{color:"#6b9e6b",marginBottom:"2rem",fontFamily:"system-ui,sans-serif",fontSize:"0.9rem"}}>
          Enter your deal details below. Claude AI will analyze it against Midwest market benchmarks in seconds.
        </p>
        <div style={{background:"#0d1a0d",border:"1px solid #1a2e1a",borderRadius:"16px",padding:"2rem"}}>
          <DealAnalyzer />
        </div>
        <p style={{textAlign:"center",marginTop:"2rem",color:"#4d7a4d",fontSize:"0.8rem",fontFamily:"system-ui,sans-serif"}}>
          Want unlimited analyses? <Link href="/#pricing" style={{color:"#4ade80"}}>Upgrade to Pro →</Link>
        </p>
      </div>
    </main>
  )
}
