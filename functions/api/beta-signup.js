const RESEND_API_URL = 'https://api.resend.com/emails'
const MANAGEMENT_EMAIL = 'mgmt@dhwebsiteservices.co.uk'

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
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

function normalizePhone(value = '') {
  return String(value).replace(/[^\d+()\-\s]/g, '').trim()
}

async function insertSignup(env, signup) {
  const supabaseUrl = env.SUPABASE_URL
  const supabaseServiceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Supabase storage is not configured.')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/beta_signups`, {
    method: 'POST',
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify([signup]),
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    throw new Error(data?.message || data?.error || 'Supabase insert failed.')
  }

  return Array.isArray(data) ? data[0] : data
}

async function sendManagementEmail(env, signup) {
  const resendApiKey = env.RESEND_API_KEY
  const fromEmail =
    env.BETA_SIGNUP_FROM_EMAIL ||
    env.RESEND_FROM_EMAIL ||
    'DH Workplace <beta@dhworkplace.co.uk>'

  if (!resendApiKey) {
    throw new Error('Resend is not configured.')
  }

  const submittedAt = new Date(signup.created_at).toLocaleString('en-GB', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Europe/London',
  })

  const html = `
    <div style="margin:0;padding:32px 16px;background:#eef4fb;font-family:Arial,sans-serif;color:#10233e">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #d7e2f0;border-radius:18px;overflow:hidden">
        <div style="padding:24px 28px;background:linear-gradient(135deg,#62b0ff 0%,#1954b8 100%);color:#ffffff">
          <div style="font-size:12px;letter-spacing:0.06em;text-transform:uppercase;opacity:0.86">DH Workplace beta signup</div>
          <div style="margin-top:10px;font-size:28px;line-height:1.1;font-weight:700">New beta enquiry received</div>
        </div>
        <div style="padding:24px 28px">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7edf5;font-size:12px;font-weight:700;text-transform:uppercase;color:#60738d">Name</td>
              <td style="padding:12px 0;border-bottom:1px solid #e7edf5;font-size:14px;color:#10233e">${escapeHtml(signup.name)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7edf5;font-size:12px;font-weight:700;text-transform:uppercase;color:#60738d">Phone</td>
              <td style="padding:12px 0;border-bottom:1px solid #e7edf5;font-size:14px;color:#10233e">${escapeHtml(signup.phone)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7edf5;font-size:12px;font-weight:700;text-transform:uppercase;color:#60738d">Source</td>
              <td style="padding:12px 0;border-bottom:1px solid #e7edf5;font-size:14px;color:#10233e">${escapeHtml(signup.source)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e7edf5;font-size:12px;font-weight:700;text-transform:uppercase;color:#60738d">Submitted</td>
              <td style="padding:12px 0;border-bottom:1px solid #e7edf5;font-size:14px;color:#10233e">${escapeHtml(submittedAt)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;font-size:12px;font-weight:700;text-transform:uppercase;color:#60738d">IP</td>
              <td style="padding:12px 0;font-size:14px;color:#10233e">${escapeHtml(signup.ip_address)}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [MANAGEMENT_EMAIL],
      subject: `New DH Workplace beta signup - ${signup.name}`,
      html,
      reply_to: MANAGEMENT_EMAIL,
    }),
  })

  const text = await response.text()
  if (!response.ok) {
    throw new Error(text || 'Email delivery failed.')
  }
}

export async function onRequestPost(context) {
  let payload

  try {
    payload = await context.request.json()
  } catch {
    return json({ error: 'Invalid request body.' }, 400)
  }

  const name = String(payload?.name || '').trim()
  const phone = normalizePhone(payload?.phone)

  if (!name || !phone) {
    return json({ error: 'Name and phone number are required.' }, 400)
  }

  const signup = {
    name,
    phone,
    source: 'DH Workplace beta landing page',
    ip_address:
      context.request.headers.get('CF-Connecting-IP') ||
      context.request.headers.get('x-forwarded-for') ||
      'Unavailable',
    user_agent: context.request.headers.get('user-agent') || 'Unavailable',
    created_at: new Date().toISOString(),
  }

  try {
    const storedSignup = await insertSignup(context.env, signup)
    await sendManagementEmail(context.env, storedSignup)
    return json({ success: true })
  } catch (error) {
    return json({ error: error.message || 'Submission failed.' }, 500)
  }
}
