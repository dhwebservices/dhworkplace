import { useState } from 'react'
import { submitBetaSignup } from '../lib/betaSignup'

const TEAM_SIZES = ['1 – 5', '6 – 15', '16 – 30', 'Over 30']

function Mark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M1 2h6.2c1.6 0 2.4 1.6 2.6 4.4H1z" fill="#c9cbcf" />
      <path d="M9 2h5.4v3.2c0 .7-.5 1.2-1.2 1.2H9.8C9.6 4.3 9.3 2.8 9 2z" fill="#fff" />
      <path d="M1 9.6h8.8c-.2 2.8-1 4.4-2.6 4.4H2.2A1.2 1.2 0 0 1 1 12.8z" fill="#c9cbcf" />
      <path d="M9.8 9.6h4.6v3.2c0 .7-.5 1.2-1.2 1.2H9c.4-.8.7-2.3.8-4.4z" fill="#fff" />
    </svg>
  )
}

export default function EarlyAccess() {
  const [form, setForm] = useState({ name: '', business: '', email: '', phone: '', teamSize: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await submitBetaSignup(form)
      setStatus('done')
    } catch (submitError) {
      setError(submitError.message)
      setStatus('idle')
    }
  }

  return (
    <div className="page">
      <header className="gnav">
        <div className="gnav-in">
          <a className="logo" href="/"><Mark /><span>Workplace</span></a>
          <span className="gnav-note">By DH Website Services</span>
        </div>
      </header>

      <main className="hero">
        <section className="copy">
          <h1>Rotas your team will actually read.</h1>
          <p className="lede">
            Build next week in minutes. See who's turned up. Sort holidays without the 11pm WhatsApp
            messages. Made in Pontypridd for pubs, cafés, salons and care teams.
          </p>

          {status === 'done' ? (
            <div className="done">
              <h2>You're on the list.</h2>
              <p>
                We've sent a confirmation to <b>{form.email}</b>. We'll be in touch to get{' '}
                {form.business || 'your business'} set up as soon as your place opens.
              </p>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <p className="form-intro">We're building it now. Leave your details for early access and we'll set you up first.</p>
              <div className="row">
                <label>
                  <span>Your name</span>
                  <input required autoComplete="name" value={form.name} onChange={update('name')} />
                </label>
                <label>
                  <span>Business name</span>
                  <input required autoComplete="organization" value={form.business} onChange={update('business')} />
                </label>
              </div>
              <div className="row">
                <label>
                  <span>Email</span>
                  <input required type="email" autoComplete="email" value={form.email} onChange={update('email')} />
                </label>
                <label>
                  <span>Phone <em>optional</em></span>
                  <input type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} />
                </label>
              </div>
              <label>
                <span>How many staff?</span>
                <div className="sizes">
                  {TEAM_SIZES.map((size) => (
                    <button
                      type="button"
                      key={size}
                      className={form.teamSize === size ? 'on' : ''}
                      onClick={() => setForm((current) => ({ ...current, teamSize: size }))}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </label>
              {error && <p className="error">{error}</p>}
              <button className="submit" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Get Early Access'}
              </button>
              <p className="fine">£5 per person, per month when we launch. 14 days free. No spam, ever.</p>
            </form>
          )}

          <p className="credit">
            Designed and built by DH Website Services, Web Design Service of the Year at the Wales
            Prestige Awards 2027/28.
          </p>
        </section>

        <section className="shot" aria-hidden="true">
          <div className="browser">
            <div className="chrome"><i /><i /><i /></div>
            <img src="/product-rota.jpg" alt="" />
          </div>
          <img className="phone" src="/product-phone.png" alt="" />
        </section>
      </main>
    </div>
  )
}
