import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const productStats = [
  { value: '14 days', label: 'free trial' },
  { value: '6 core systems', label: 'under one login and one structure' },
]

const capabilityCards = [
  {
    title: 'HR',
    copy: 'Keep employee records, onboarding and policy visibility in one place instead of across inboxes, files and memory.',
  },
  {
    title: 'CRM',
    copy: 'Track leads, clients and ownership in one commercial view that management can actually trust.',
  },
  {
    title: 'Staff management',
    copy: 'Make roles, responsibilities and day-to-day accountability visible as the business grows.',
  },
  {
    title: 'Documents and policies',
    copy: 'Give staff one controlled place for documents, acknowledgements and policies, built for operations rather than storage alone.',
  },
  {
    title: 'Leave and timesheets',
    copy: 'Reduce friction around time away, timesheets and manager approvals before they turn into payroll problems.',
  },
  {
    title: 'Billing and reporting',
    copy: 'Bring reporting closer to the work so leadership can see the numbers that matter without blind spots.',
  },
]

const trustSignals = [
  'Role-aware platform architecture',
  'Policy and document control',
  'Operational reporting visibility',
  'Built for UK business workflows',
]

const pricingPlans = [
  {
    name: 'Starter',
    launch: '£9/mo',
    normal: '£19/mo',
    badge: 'Launch offer',
    description: 'For smaller teams that want a cleaner internal operating system without adding complexity.',
    features: ['HR essentials', 'CRM foundation', 'documents and policies', 'leave tracking', '14-day free trial'],
  },
  {
    name: 'Growth',
    launch: '£24/mo',
    normal: '£49/mo',
    badge: 'Most popular',
    description: 'For growing businesses that need stronger visibility, better manager control and more operational structure.',
    features: ['Everything in Starter', 'staff management', 'timesheets', 'advanced workflows', 'enhanced reporting'],
  },
  {
    name: 'Business',
    launch: '£59/mo',
    normal: '£99/mo',
    badge: 'Best for scale',
    description: 'For businesses that want a more complete operating system with stronger reporting and commercial confidence.',
    features: ['Everything in Growth', 'billing visibility', 'deeper reporting', 'priority support', 'admin-level oversight'],
  },
]

const faqs = [
  {
    q: 'What is DH Workplace?',
    a: 'DH Workplace is a business operations platform that brings HR, CRM, staff management, documents, policies, leave, timesheets, billing and reporting into one system.',
  },
  {
    q: 'Who is it for?',
    a: 'It is designed for businesses that need stronger internal structure for staff and management. It is not a public-facing customer portal.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. Every plan includes a 14-day free trial so businesses can assess the platform before committing.',
  },
  {
    q: 'Can we start small and upgrade later?',
    a: 'Yes. The pricing is designed so businesses can begin with the right level of structure and move up as operational needs grow.',
  },
  {
    q: 'Is this connected to DH Website Services?',
    a: 'Yes. DH Workplace is a product by DH Website Services, positioned as a dedicated software platform for running modern businesses.',
  },
]

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function LogoCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return undefined

    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setVisible(true)
    }

    const handleLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      className={`logo-cursor ${visible ? 'visible' : ''}`}
      style={{ transform: `translate(${position.x - 14}px, ${position.y - 14}px)` }}
      aria-hidden="true"
    >
      <img src="/dh-workplace-logo.svg" alt="" />
    </div>
  )
}

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <ScrollToTop />
      <LogoCursor />
      <header className="site-header">
        <div className="wrap nav-shell">
          <Link to="/" className="brand-lockup">
            <img className="brand-logo" src="/dh-workplace-logo.svg" alt="DH Workplace" />
            <span className="brand-name">DH Workplace</span>
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className="nav-links">
            <Link to="/">Overview</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/faq">FAQ</Link>
          </nav>
          <div className="nav-actions">
            <a href="https://workplace.dhwebsiteservices.co.uk" className="link-action">
              Sign in
            </a>
            <a href="mailto:clients@dhwebsiteservices.co.uk?subject=DH%20Workplace%20Demo" className="button secondary">
              Book a demo
            </a>
            <a href="https://workplace.dhwebsiteservices.co.uk" className="button primary">
              Start free trial
            </a>
          </div>
        </div>
        <div className={`mobile-panel ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-panel-links">
            <Link to="/" onClick={() => setMenuOpen(false)}>Overview</Link>
            <Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
            <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>
          </div>
          <div className="mobile-panel-actions">
            <a href="https://workplace.dhwebsiteservices.co.uk" className="link-action" onClick={() => setMenuOpen(false)}>
              Sign in
            </a>
            <a href="mailto:clients@dhwebsiteservices.co.uk?subject=DH%20Workplace%20Demo" className="button secondary" onClick={() => setMenuOpen(false)}>
              Book a demo
            </a>
            <a href="https://workplace.dhwebsiteservices.co.uk" className="button primary" onClick={() => setMenuOpen(false)}>
              Start free trial
            </a>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <div className="footer-brand-lockup">
              <img className="footer-logo" src="/dh-workplace-logo.svg" alt="DH Workplace" />
              <div className="footer-brand">DH Workplace</div>
            </div>
            <p className="footer-copy">
              A serious operating system for modern businesses.
            </p>
          </div>
          <div className="footer-links">
            <Link to="/">Overview</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="footer-meta">
            <div>dhworkplace.co.uk</div>
            <div>by DH Website Services</div>
          </div>
        </div>
      </footer>
    </>
  )
}

function LandingPage() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">The operating system for modern business</div>
            <h1>
              Run the business
              <span className="headline-shift"> without the admin sprawl.</span>
            </h1>
            <p className="hero-body">
              One operating system for HR, CRM, staff, documents, leave, timesheets, billing and reporting.
            </p>
            <div className="hero-proofline">
              <span>Built for internal company operations</span>
              <span>14-day free trial</span>
            </div>
            <div className="hero-actions">
              <a href="https://workplace.dhwebsiteservices.co.uk" className="button primary">
                Start free trial
              </a>
              <Link to="/pricing" className="button secondary">View pricing</Link>
            </div>
            <div className="stat-row">
              {productStats.map((item) => (
                <div key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="DH Workplace product preview">
            <div className="dashboard-shell">
              <div className="browser-chrome">
                <div className="browser-controls">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="browser-url">workplace.dhwebsiteservices.co.uk</div>
                <div className="browser-tools">
                  <span className="browser-tool" />
                  <span className="browser-tool" />
                </div>
              </div>
              <div className="dashboard-topbar">
                <div className="topbar-bookmark">dhwebservices/dhworkplace</div>
                <div className="topbar-actions">
                  <span className="topbar-tab">DH Workplace</span>
                  <span className="topbar-tab muted">Overview</span>
                </div>
              </div>

              <div className="dashboard-content">
                <aside className="dashboard-rail">
                  <div>
                    <div className="dashboard-kicker">Workspace</div>
                    <div className="workspace-title">DH Workplace</div>
                    <div className="workspace-subtitle">DH Workplace</div>
                  </div>
                  <div className="workspace-tags">
                    <span>Business</span>
                    <span>Trial</span>
                  </div>
                  <div className="rail-group">
                    <div className="rail-heading">Overview</div>
                    <div className="rail-stack">
                      <span className="rail-item active">Dashboard</span>
                    </div>
                  </div>
                  <div className="rail-group">
                    <div className="rail-heading">HR</div>
                    <div className="rail-stack">
                      <span className="rail-item">Staff Directory</span>
                      <span className="rail-item">Leave</span>
                      <span className="rail-item">Documents</span>
                      <span className="rail-item">Timesheets</span>
                    </div>
                  </div>
                  <div className="rail-group">
                    <div className="rail-heading">Clients</div>
                    <div className="rail-stack">
                      <span className="rail-item">Clients</span>
                      <span className="rail-item">Pipeline</span>
                    </div>
                  </div>
                </aside>

                <div className="dashboard-main">
                  <div className="workspace-header">
                    <div>
                      <h2>Good morning</h2>
                      <p>Tuesday, 31 March 2026</p>
                    </div>
                    <div className="workspace-statusbar">
                      <div className="status-pill">
                        <span className="status-dot" />
                        <div>
                          <b>Workspace status</b>
                          <span>14 days left in trial</span>
                        </div>
                      </div>
                      <span className="status-button">Trial</span>
                      <span className="status-button ghost">Details</span>
                      <span className="status-icon" />
                    </div>
                  </div>

                  <div className="workspace-stats">
                    {[
                      ['1', 'Team members', 'blue'],
                      ['41', 'Active clients', 'green'],
                      ['7', 'Pending approvals', 'amber'],
                    ].map(([value, label, tone]) => (
                      <div key={label} className="workspace-stat">
                        <strong className={`tone-${tone}`}>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="workspace-panels">
                    <section className="workspace-panel large">
                      <h3>Quick actions</h3>
                      <p>The next operational moves, surfaced clearly.</p>
                      <div className="action-list">
                        {[
                          ['Add team member', 'Invite a new person and assign their role'],
                          ['Add client', 'Create a client account and assign ownership'],
                          ['Approve leave', 'Review time away with clear manager visibility'],
                        ].map(([title, copy]) => (
                          <div key={title} className="action-item">
                            <strong>{title}</strong>
                            <span>{copy}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap section-header">
          <div className="eyebrow">Core platform</div>
          <h2>Built around the work that actually slows businesses down.</h2>
          <p>
            Replace disconnected admin with one cleaner operating layer for your team.
          </p>
        </div>
        <div className="wrap capability-grid">
          {capabilityCards.map((card) => (
            <article key={card.title} className="capability-card">
              <div className="capability-index">{card.title}</div>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap trust-grid">
          <div className="trust-copy">
            <div className="eyebrow">Trust by design</div>
            <h2>Structured to feel safe, credible and commercially serious.</h2>
            <p>
              For businesses that want stronger discipline, clearer visibility and a more reliable path to scale.
            </p>
            <div className="trust-list">
              {trustSignals.map((item) => (
                <div key={item} className="trust-item">
                  <span className="trust-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="trust-panel">
            <div className="trust-metric">
              <span>Operational confidence</span>
              <strong>One platform</strong>
            </div>
            <div className="trust-metric">
              <span>Commercial clarity</span>
              <strong>Live reporting</strong>
            </div>
            <div className="trust-metric">
              <span>Deployment model</span>
              <strong>14-day trial</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="wrap final-cta-shell">
          <div>
            <div className="eyebrow">Ready to Choose?</div>
            <h2>Go to pricing, choose the right plan, and start the trial.</h2>
          </div>
          <div className="cta-stack">
            <Link to="/pricing" className="button primary">View pricing</Link>
            <a href="mailto:clients@dhwebsiteservices.co.uk?subject=DH%20Workplace%20Demo" className="button secondary">
              Book a demo
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function PricingPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="wrap pricing-intro">
          <div className="pricing-lead">
            <div className="eyebrow">Pricing</div>
            <h1>Choose the level of structure your business needs now.</h1>
            <p>Every plan starts with a 14-day free trial. Launch pricing is live now, so switching early is cheaper than carrying more process debt.</p>
          </div>
          <div className="pricing-callout">
            <strong>Growth is the best fit for most businesses.</strong>
            <span>It gives you the cleanest balance of control, visibility and reporting without making rollout feel heavy.</span>
          </div>
        </div>
      </section>

      <section className="section pricing-section">
        <div className="wrap pricing-grid">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`pricing-card ${plan.name === 'Growth' ? 'featured' : ''}`}
            >
              <div className="pricing-badge">{plan.badge}</div>
              <h2>{plan.name}</h2>
              <div className="price-row">
                <strong>{plan.launch}</strong>
                <span>{plan.normal} normal</span>
              </div>
              <div className="pricing-subline">Launch pricing available now</div>
              <p>{plan.description}</p>
              <div className="plan-note">14-day free trial included. Start quickly, test properly, and only upgrade when the business needs more.</div>
              <div className="feature-list">
                {plan.features.map((feature) => (
                  <div key={feature} className="feature-item">
                    <span className="trust-dot" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <a href="https://workplace.dhwebsiteservices.co.uk" className="button primary wide">
                Start free trial
              </a>
            </article>
          ))}
        </div>
        <div className="pricing-footer-note">
          Need a walkthrough before deciding? Book a demo and we’ll show exactly where DH Workplace replaces admin drag in your business.
        </div>
      </section>
    </main>
  )
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <main className="page-shell">
      <section className="page-hero faq-hero">
        <div className="wrap faq-hero-layout">
          <div>
          <div className="eyebrow">FAQ</div>
            <h1>Questions answered clearly before you commit.</h1>
            <p>
              Straight answers on fit, rollout and pricing so the decision feels commercial, not confusing.
            </p>
          </div>
          <div className="faq-side-note">
            <strong>Still deciding?</strong>
            <span>Start the trial if you want speed. Book a demo if you want certainty.</span>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="wrap faq-stack">
          {faqs.map((item, index) => {
            const open = index === openIndex
            return (
              <article key={item.q} className={`faq-card faq-accordion ${open ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                >
                  <span className="faq-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="faq-question">{item.q}</span>
                  <span className="faq-plus">{open ? '−' : '+'}</span>
                </button>
                <div className="faq-answer-wrap">
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="wrap faq-bottom-cta">
          <Link to="/pricing" className="button primary">View pricing</Link>
          <a href="mailto:clients@dhwebsiteservices.co.uk?subject=DH%20Workplace%20Demo" className="button secondary">
            Book a demo
          </a>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
