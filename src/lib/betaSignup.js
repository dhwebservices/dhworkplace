export async function submitBetaSignup(payload) {
  const response = await fetch('/api/beta-signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error || 'We could not send your details just now. Please try again.')
  }

  return data
}
