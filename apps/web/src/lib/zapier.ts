// Zapier "superclaude-everything" connector integration
// Fires webhooks to trigger Zaps on key events

const ZAPIER_HOOKS = {
  signup:    process.env.ZAPIER_HOOK_SIGNUP    ?? '',
  deal:      process.env.ZAPIER_HOOK_DEAL      ?? '',
  upgrade:   process.env.ZAPIER_HOOK_UPGRADE   ?? '',
  research:  process.env.ZAPIER_HOOK_RESEARCH  ?? '',
}

export async function zapierFire(event: keyof typeof ZAPIER_HOOKS, payload: Record<string, unknown>) {
  const url = ZAPIER_HOOKS[event]
  if (!url) return // graceful if not configured
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, timestamp: new Date().toISOString(), ...payload }),
    })
  } catch (_) { /* non-blocking — Zapier fires are best-effort */ }
}
