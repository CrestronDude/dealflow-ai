export default function SetupPage() {
  return (
    <main style={{fontFamily:'system-ui,sans-serif',background:'#0a0e0a',color:'#e8f0e8',minHeight:'100vh',padding:'3rem 2rem',maxWidth:'700px',margin:'0 auto'}}>
      <h1 style={{fontSize:'1.5rem',fontWeight:700,marginBottom:'0.5rem',fontFamily:'Georgia,serif'}}>⚡ Setup Guide</h1>
      <p style={{color:'#6b9e6b',marginBottom:'2rem',fontSize:'0.9rem'}}>Connect your real API keys to unlock full functionality.</p>
      {[
        {step:1,title:'Supabase (DB + Auth)',url:'https://supabase.com/dashboard/new/new-project',items:['Create project: dealflow-ai, region US East','Copy URL → NEXT_PUBLIC_SUPABASE_URL','Copy anon key → NEXT_PUBLIC_SUPABASE_ANON_KEY','SQL Editor → paste docs/schema.sql → Run'],color:'#3ecf8e'},
        {step:2,title:'Anthropic (AI)',url:'https://console.anthropic.com/keys',items:['Create key → ANTHROPIC_API_KEY'],color:'#cc785c'},
        {step:3,title:'Stripe (Payments)',url:'https://dashboard.stripe.com/products',items:['Create 4 products: Starter $49, Pro $99, Club $149, Agency $299','Copy price IDs → STRIPE_*_PRICE_ID env vars','Copy secret key → STRIPE_SECRET_KEY'],color:'#635bff'},
        {step:4,title:'Vercel (Deploy)',url:'https://vercel.com/steven-sutherlands-projects/dealflow-ai/settings/environment-variables',items:['Add all keys to env vars → Save → Redeploy'],color:'#fff'},
      ].map(s => (
        <div key={s.step} style={{background:'#0d1a0d',border:'1px solid #1a2e1a',borderRadius:'12px',padding:'1.25rem',marginBottom:'1rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.75rem'}}>
            <div style={{background:s.color,color:'#000',width:24,height:24,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontWeight:700}}>{s.step}</div>
            <div>
              <div style={{fontWeight:700}}>{s.title}</div>
              <a href={s.url} target="_blank" rel="noreferrer" style={{color:'#4ade80',fontSize:'0.75rem'}}>{s.url.substring(0,55)}...</a>
            </div>
          </div>
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            {s.items.map((item,i) => <li key={i} style={{fontSize:'0.85rem',color:'#86efac',marginBottom:'0.25rem',paddingLeft:'1rem'}}>→ {item}</li>)}
          </ul>
        </div>
      ))}
    </main>
  )
}
