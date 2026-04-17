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
      <div className="beta-noise" aria-hidden="true" />
      <div className="beta-beam beta-beam-left" aria-hidden="true" />
      <div className="beta-beam beta-beam-right" aria-hidden="true" />
      <div className="beta-orb beta-orb-left" aria-hidden="true" />
      <div className="beta-orb beta-orb-right" aria-hidden="true" />
      <div className="beta-grid" role="presentation">
        <section className="beta-copy">
          <div className="beta-topline">
            <a className="beta-brand" href="/" aria-label="DH Workplace">
              <img src="/dh-workplace-logo.svg" alt="" />
              <span>DH Workplace</span>
            </a>
            <div className="beta-chip">Private beta</div>
          </div>

          <div className="beta-copy-main">
            <p className="beta-kicker">Opening soon</p>
            <h1>
              Something rare
              <span> is almost here.</span>
            </h1>
            <p className="beta-lead">
              DH Workplace is being opened carefully. Join the first release list and we will reach
              out before the platform goes public.
            </p>

            <div className="beta-cred">
              <div className="beta-cred-item">
                <span className="beta-cred-label">Curated release</span>
                <strong>Access is being granted in a measured first wave.</strong>
              </div>
              <div className="beta-cred-item">
                <span className="beta-cred-label">Personal follow-up</span>
                <strong>Every early enquiry is reviewed directly by management.</strong>
              </div>
            </div>
          </div>

          <div className="beta-stage" aria-hidden="true">
            <div className="beta-stage-line beta-stage-line-top" />
            <div className="beta-stage-line beta-stage-line-bottom" />
            <div className="beta-stage-caption beta-stage-caption-top">
              <span>Invitation only</span>
              <strong>First intake</strong>
            </div>
            <div className="beta-stage-orbit beta-stage-orbit-one" />
            <div className="beta-stage-orbit beta-stage-orbit-two" />
            <div className="beta-stage-orbit beta-stage-orbit-three" />
            <div className="beta-stage-core" />
            <div className="beta-stage-caption beta-stage-caption-bottom">
              <span>Management contact</span>
              <strong>Private release path</strong>
            </div>
          </div>
        </section>

        <section className="beta-panel">
          <div className="beta-panel-head">
            <p>First-release access</p>
            <span>Request your place on the first beta list</span>
            <small>Leave your details and we will contact you as soon as the first intake opens.</small>
          </div>

          <div className="beta-panel-note">
            <span>Limited early onboarding</span>
            <strong>Designed for businesses that want a more considered internal platform.</strong>
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
                {status === 'submitting' ? 'Joining beta list...' : 'Request beta access'}
              </button>

              <p className="beta-footnote">
                No newsletter blast. No generic mailing list. This is for early access contact only.
              </p>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
