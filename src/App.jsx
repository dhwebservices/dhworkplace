import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const productStats = [
  { value: '14 days', label: 'free trial' },
  { value: '6 core systems', label: 'in one operating layer' },
  { value: '< 1 hour', label: 'to brief your team' },
]

const capabilityCards = [
  {
    title: 'HR',
    copy: 'Policies, onboarding, employee records and operational structure, without scattering information across inboxes and folders.',
  },
  {
    title: 'CRM',
    copy: 'Track leads, customers and internal accountability in a single commercial view that sales and management can actually trust.',
  },
  {
    title: 'Staff management',
    copy: 'Keep roles, responsibilities, workflows and oversight visible as your business scales beyond ad-hoc management.',
  },
  {
    title: 'Documents and policies',
    copy: 'One controlled system for company documents, acknowledgements and policy visibility, built for real operations rather than storage alone.',
  },
  {
    title: 'Leave and timesheets',
    copy: 'Make time visible, requests controlled and payroll preparation far less painful for managers and teams.',
  },
  {
    title: 'Billing and reporting',
    copy: 'Surface the numbers that matter, bring reporting closer to the work, and reduce blind spots across the business.',
  },
]

const platformPillars = [
  {
    kicker: 'Control',
    title: 'Bring operational sprawl back into one command surface.',
    copy: 'DH Workplace is built for businesses that have outgrown spreadsheets, fragmented subscriptions and inconsistent internal process.',
  },
  {
    kicker: 'Clarity',
    title: 'Make work visible across teams, not trapped inside individuals.',
    copy: 'The platform is designed to replace guesswork with structure so leadership can see what is happening without chasing updates.',
  },
  {
    kicker: 'Scale',
    title: 'Install better operational discipline before growth makes it expensive.',
    copy: 'The goal is not just software adoption. It is operational maturity, delivered in a format your team can actually use.',
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
    description: 'For smaller teams that need a clean operational core without complexity.',
    features: ['HR essentials', 'CRM foundation', 'documents and policies', 'leave tracking', '14-day free trial'],
  },
  {
    name: 'Growth',
    launch: '£24/mo',
    normal: '£49/mo',
    badge: 'Most popular',
    description: 'For growing businesses that want stronger structure, visibility and day-to-day control.',
    features: ['Everything in Starter', 'staff management', 'timesheets', 'advanced workflows', 'enhanced reporting'],
  },
  {
    name: 'Business',
    launch: '£59/mo',
    normal: '£99/mo',
    badge: 'Best for scale',
    description: 'For businesses that want a more complete operational system with commercial confidence.',
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

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <header className="site-header">
        <div className="wrap nav-shell">
          <Link to="/" className="brand-lockup">
            <span className="brand-mark">DH</span>
            <span className="brand-name">DH Workplace</span>
          </Link>
          <nav className="nav-links">
            <Link to="/">Overview</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/faq">FAQ</Link>
          </nav>
          <div className="nav-actions">
            <a href="https://app.dhworkplace.co.uk" className="link-action">
              Sign in
            </a>
            <a href="mailto:hello@dhworkplace.co.uk?subject=DH%20Workplace%20Demo" className="button secondary">
              Book a demo
            </a>
            <a href="mailto:hello@dhworkplace.co.uk?subject=Start%20DH%20Workplace%20Trial" className="button primary">
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
            <div className="footer-brand">DH Workplace</div>
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
              <span className="headline-shift"> with more control.</span>
            </h1>
            <p className="hero-body">
              DH Workplace brings HR, CRM, staff management, documents, policies,
              leave, timesheets, billing and reporting into one commanding platform.
            </p>
            <div className="hero-actions">
              <a href="mailto:hello@dhworkplace.co.uk?subject=Start%20DH%20Workplace%20Trial" className="button primary">
                Start free trial
              </a>
              <a href="mailto:hello@dhworkplace.co.uk?subject=DH%20Workplace%20Demo" className="button secondary">
                Book a demo
              </a>
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
              <div className="dashboard-topbar">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="topbar-title">DH Workplace</div>
                <div className="topbar-status">Operational view</div>
              </div>

              <div className="dashboard-content">
                <aside className="dashboard-rail">
                  <div className="rail-logo">DH</div>
                  <div className="rail-stack">
                    <span className="rail-item active">Overview</span>
                    <span className="rail-item">People</span>
                    <span className="rail-item">CRM</span>
                    <span className="rail-item">Documents</span>
                    <span className="rail-item">Reports</span>
                  </div>
                </aside>

                <div className="dashboard-main">
                  <div className="dashboard-hero-card">
                    <div>
                      <div className="panel-kicker">Executive summary</div>
                      <h2>Everything critical. Nothing buried.</h2>
                    </div>
                    <div className="mini-metrics">
                      <div>
                        <strong>92%</strong>
                        <span>policy acknowledgement</span>
                      </div>
                      <div>
                        <strong>41</strong>
                        <span>live opportunities</span>
                      </div>
                      <div>
                        <strong>7</strong>
                        <span>pending approvals</span>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-panels">
                    <div className="panel large">
                      <div className="panel-kicker">Workflow health</div>
                      <div className="graph-shell">
                        <div className="graph-line" />
                        <div className="graph-line second" />
                      </div>
                    </div>
                    <div className="panel small">
                      <div className="panel-kicker">Leave requests</div>
                      <strong>12 awaiting review</strong>
                      <span>Visible to managers instantly</span>
                    </div>
                    <div className="panel small dark">
                      <div className="panel-kicker">Billing snapshot</div>
                      <strong>£84,320</strong>
                      <span>Monthly billed revenue view</span>
                    </div>
                    <div className="panel wide">
                      <div className="panel-kicker">Operational feed</div>
                      <div className="feed-list">
                        <div>
                          <span>Policy update confirmed</span>
                          <b>HR</b>
                        </div>
                        <div>
                          <span>Timesheet variance flagged</span>
                          <b>Ops</b>
                        </div>
                        <div>
                          <span>CRM handoff completed</span>
                          <b>Sales</b>
                        </div>
                      </div>
                    </div>
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
          <h2>Built for the real shape of a business.</h2>
          <p>
            The platform is designed to replace fragmentation with one cleaner,
            sharper layer of operational control.
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

      <section className="section dark-band">
        <div className="wrap pillar-grid">
          {platformPillars.map((pillar) => (
            <article key={pillar.title} className="pillar-card">
              <div className="eyebrow muted">{pillar.kicker}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap trust-grid">
          <div className="trust-copy">
            <div className="eyebrow">Trust by design</div>
            <h2>Structured like a serious business platform should be.</h2>
            <p>
              DH Workplace is positioned for businesses that want stronger
              operational discipline, sharper visibility and a cleaner path to
              scale.
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
            <div className="eyebrow">Start properly</div>
            <h2>Install a better operating rhythm across the business.</h2>
          </div>
          <div className="cta-stack">
            <a href="mailto:hello@dhworkplace.co.uk?subject=Start%20DH%20Workplace%20Trial" className="button primary">
              Start free trial
            </a>
            <a href="mailto:hello@dhworkplace.co.uk?subject=DH%20Workplace%20Demo" className="button secondary">
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
        <div className="wrap">
          <div className="eyebrow">Pricing</div>
          <h1>Premium pricing, built to convert cleanly.</h1>
          <p>
            Launch offers are live now. Every plan includes a 14-day free trial.
          </p>
        </div>
      </section>

      <section className="section">
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
              <p>{plan.description}</p>
              <div className="feature-list">
                {plan.features.map((feature) => (
                  <div key={feature} className="feature-item">
                    <span className="trust-dot" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:hello@dhworkplace.co.uk?subject=Start%20DH%20Workplace%20Trial" className="button primary wide">
                Start free trial
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function FaqPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">FAQ</div>
          <h1>Questions, answered with proper clarity.</h1>
          <p>
            Everything here is designed to make DH Workplace feel straightforward,
            not vague.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-list">
          {faqs.map((item) => (
            <article key={item.q} className="faq-card">
              <h2>{item.q}</h2>
              <p>{item.a}</p>
            </article>
          ))}
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
