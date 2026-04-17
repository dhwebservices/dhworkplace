export async function submitBetaSignup(payload) {
  const response = await fetch('/api/beta-signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || 'We could not submit your details just now.')
  }

  return data
}
