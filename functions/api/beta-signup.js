const RESEND_API_URL = 'https://api.resend.com/emails'
const MANAGEMENT_EMAIL = 'mgmt@dhwebsiteservices.co.uk'
const DEFAULT_FROM = 'DH Workplace <noreply@dhwebsiteservices.co.uk>'
const TEAM_SIZES = ['1 – 5', '6 – 15', '16 – 30', 'Over 30']

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const clean = (value, max = 120) => String(value || '').trim().slice(0, max)

async function sendEmail(env, message) {
  if (!env.RESEND_API_KEY) throw new Error('Email is not configured.')

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.SIGNUP_FROM_EMAIL || DEFAULT_FROM, ...message }),
  })

  if (!response.ok) throw new Error((await response.text()) || 'Email delivery failed.')
}

// Plain, Apple-style emails: one column, system font, no gradients
function shell(body) {
  return `<div style="background:#f5f5f7;padding:32px 16px;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#1d1d1f">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:32px">${body}</div>
  <p style="max-width:560px;margin:16px auto 0;font-size:12px;line-height:1.5;color:#86868b;text-align:center">DH Workplace is made by DH Website Services, a trading name of David Hooper Home Limited, registered in England and Wales, company number 17018784. 36b Coedpenmaen Road, Trallwn, Pontypridd CF37 4LP.</p>
</div>`
}

function confirmationEmail(signup) {
  return shell(`<p style="margin:0;font-size:15px;color:#6e6e73">DH Workplace</p>
  <h1 style="margin:6px 0 0;font-size:26px;letter-spacing:-0.02em">You're on the list, ${escapeHtml(signup.name.split(' ')[0])}.</h1>
  <p style="margin:16px 0 0;font-size:16px;line-height:1.55">Thanks for signing ${escapeHtml(signup.business)} up for early access. We're building DH Workplace now: rotas, clock-in and time off for teams like yours.</p>
  <p style="margin:12px 0 0;font-size:16px;line-height:1.55">When your place opens, we'll get in touch and help you get set up, including your staff and your first rota.</p>
  <p style="margin:12px 0 0;font-size:16px;line-height:1.55">Any questions in the meantime, just call us on 01443 805303.</p>
  <p style="margin:24px 0 0;font-size:16px">David Hooper<br><span style="color:#6e6e73">DH Website Services</span></p>`)
}

function managementEmail(signup) {
  const rows = [
    ['Name', signup.name],
    ['Business', signup.business],
    ['Email', signup.email],
    ['Phone', signup.phone || 'Not given'],
    ['Team size', signup.teamSize || 'Not given'],
    ['Submitted', new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/London' })],
  ]
  return shell(`<h1 style="margin:0;font-size:22px;letter-spacing:-0.02em">New early access sign-up</h1>
  <table style="width:100%;margin-top:18px;border-collapse:collapse;font-size:15px">${rows
    .map(([key, value]) => `<tr><td style="padding:10px 0;border-top:1px solid #e5e5ea;color:#6e6e73;width:120px">${key}</td><td style="padding:10px 0;border-top:1px solid #e5e5ea">${escapeHtml(value)}</td></tr>`)
    .join('')}</table>`)
}

export async function onRequestPost(context) {
  let payload
  try {
    payload = await context.request.json()
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  const signup = {
    name: clean(payload?.name),
    business: clean(payload?.business),
    email: clean(payload?.email, 200).toLowerCase(),
    phone: clean(payload?.phone, 40).replace(/[^\d+()\-\s]/g, ''),
    teamSize: TEAM_SIZES.includes(payload?.teamSize) ? payload.teamSize : '',
  }

  if (!signup.name || !signup.business || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.email)) {
    return json({ error: 'Please add your name, business name and a valid email.' }, 400)
  }

  try {
    await sendEmail(context.env, {
      to: [MANAGEMENT_EMAIL],
      reply_to: signup.email,
      subject: `Early access: ${signup.business} (${signup.teamSize || 'size not given'})`,
      html: managementEmail(signup),
    })
    await sendEmail(context.env, {
      to: [signup.email],
      reply_to: MANAGEMENT_EMAIL,
      subject: "You're on the DH Workplace early access list",
      html: confirmationEmail(signup),
    })
    return json({ success: true })
  } catch (error) {
    return json({ error: 'We could not send your details just now. Please try again, or call 01443 805303.' }, 500)
  }
}
