type ZapierEvent = 'signup' | 'deal_analyzed' | 'upgrade'

export async function fireZapier(event: ZapierEvent, payload: Record<string, unknown>) {
  const hooks: Record<ZapierEvent, string | undefined> = {
    signup: process.env.ZAPIER_HOOK_SIGNUP,
    deal_analyzed: process.env.ZAPIER_HOOK_DEAL,
    upgrade: process.env.ZAPIER_HOOK_UPGRADE,
  }
  const url = hooks[event]
  if (!url || url.includes('YOUR_')) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, timestamp: new Date().toISOString(), ...payload }),
    })
  } catch (e) { console.error('Zapier webhook failed:', e) }
}
