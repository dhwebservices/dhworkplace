import { useState } from 'react'
import { submitBetaSignup } from '../lib/betaSignup'

const initialForm = {
  name: '',
  phone: '',
}

export default function BetaSignupScreen() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return

    setStatus('submitting')
    setError('')

    try {
      await submitBetaSignup({
        name: form.name,
        phone: form.phone,
      })

      setStatus('success')
      setForm(initialForm)
    } catch (submitError) {
      setStatus('error')
      setError(submitError.message || 'Something went wrong. Please try again.')
    }
  }

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="beta-shell">
      <div className="beta-orb beta-orb-left" aria-hidden="true" />
      <div className="beta-orb beta-orb-right" aria-hidden="true" />
      <div className="beta-grid" role="presentation">
        <section className="beta-copy">
          <a className="beta-brand" href="/" aria-label="DH Workplace">
            <img src="/dh-workplace-logo.svg" alt="" />
            <span>DH Workplace</span>
          </a>

          <p className="beta-kicker">Private beta opening soon</p>
          <h1>Get ready for something special.</h1>
          <p className="beta-lead">
            Be among the first to try DH Workplace. Leave your name and number and we will contact
            you when the first beta spaces open.
          </p>

          <div className="beta-signal" aria-hidden="true">
            <div className="beta-signal-ring beta-signal-ring-one" />
            <div className="beta-signal-ring beta-signal-ring-two" />
            <div className="beta-signal-core" />
          </div>
        </section>

        <section className="beta-panel">
          <div className="beta-panel-head">
            <p>First-release access</p>
            <span>Join the first beta list</span>
          </div>

          {status === 'success' ? (
            <div className="beta-success" role="status" aria-live="polite">
              <h2>You are on the list.</h2>
              <p>
                Management has been notified with your details. We will be in touch when the first
                beta places are ready.
              </p>
              <button
                className="beta-submit"
                type="button"
                onClick={() => {
                  setStatus('idle')
                  setError('')
                }}
              >
                Add another enquiry
              </button>
            </div>
          ) : (
            <form className="beta-form" onSubmit={handleSubmit}>
              <label className="beta-field">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  required
                />
              </label>

              <label className="beta-field">
                <span>Phone number</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="Your phone number"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  required
                />
              </label>

              {error ? (
                <p className="beta-error" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                className="beta-submit"
                type="submit"
                disabled={status === 'submitting' || !form.name.trim() || !form.phone.trim()}
              >
                {status === 'submitting' ? 'Joining beta list...' : 'Be among the first'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
