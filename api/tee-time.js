// Tee time (contact) requests. Delivers via Resend when RESEND_API_KEY and
// TEE_TIME_TO are set in the Vercel project; otherwise returns 503 and the
// front end falls back to a pre-filled mailto draft, so no request is lost.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method' });
    return;
  }

  const b = req.body || {};
  if (b.website) { // honeypot: accept silently, deliver nowhere
    res.status(200).json({ ok: true });
    return;
  }

  const email = String(b.email || '').trim().slice(0, 200);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    res.status(400).json({ ok: false, error: 'email' });
    return;
  }

  const clip = v => String(v || '').trim().slice(0, 4000);
  const text = [
    ['Player', b.name],
    ['Clubhouse', b.company],
    ['Email', email],
    ['Party size', b.party],
    ['The course (what it does)', b.course],
    ['Course conditions (the stack)', b.stack],
    ['Age of the course', b.age],
    ['The hazard', b.hazard],
    ['Preferred tee time', b.when],
    ['For the caddie', b.notes],
  ].map(([k, v]) => `${k}: ${clip(v) || '—'}`).join('\n');

  const key = process.env.RESEND_API_KEY;
  const to = process.env.TEE_TIME_TO;
  if (!key || !to) {
    console.log('TEE TIME REQUEST (delivery unconfigured)\n' + text);
    res.status(503).json({ ok: false, error: 'unconfigured' });
    return;
  }

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.TEE_TIME_FROM || 'Breakfastball Starter <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `Tee time request — ${clip(b.name) || clip(b.company) || email}`,
      text,
    }),
  });
  if (!r.ok) {
    console.error('resend delivery failed', r.status, await r.text().catch(() => ''));
    res.status(502).json({ ok: false, error: 'delivery' });
    return;
  }
  res.status(200).json({ ok: true });
}
