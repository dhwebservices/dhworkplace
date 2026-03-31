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

const systemColumns = [
  { title: 'People', items: ['HR records', 'onboarding', 'leave', 'timesheets'] },
  { title: 'Operations', items: ['tasks', 'documents', 'policies', 'staff management'] },
  { title: 'Commercial', items: ['CRM', 'clients', 'billing', 'reporting'] },
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
              DH Workplace gives growing businesses one place to run HR, CRM,
              staff management, documents, policies, leave, timesheets, billing and reporting.
            </p>
            <div className="hero-proofline">
              <span>Built for internal company operations</span>
              <span>14-day free trial</span>
            </div>
            <div className="hero-actions">
              <a href="https://workplace.dhwebsiteservices.co.uk" className="button primary">
                Start free trial
              </a>
              <a href="mailto:clients@dhwebsiteservices.co.uk?subject=DH%20Workplace%20Demo" className="button secondary">
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
                  <span className="topbar-tab muted">DH Website Services</span>
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
                      <span className="rail-item">Policies</span>
                      <span className="rail-item">Timesheets</span>
                      <span className="rail-item">Onboarding</span>
                    </div>
                  </div>
                  <div className="rail-group">
                    <div className="rail-heading">Clients</div>
                    <div className="rail-stack">
                      <span className="rail-item">Clients</span>
                      <span className="rail-item">Tasks</span>
                      <span className="rail-item">Pipeline</span>
                      <span className="rail-item">Outreach</span>
                    </div>
                  </div>
                  <div className="rail-account">
                    <span className="rail-avatar">A</span>
                    <div>
                      <strong>admin@dhworkplace.co.uk</strong>
                      <span>Sign out</span>
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
                          ['Create task', 'Capture operational work and due dates'],
                          ['Log leave request', 'Submit or review upcoming time away'],
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
            Replace disconnected admin with one cleaner operating layer for your team,
            your managers and your leadership view.
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

      <section className="section architecture-section">
        <div className="wrap architecture-shell">
          <div className="section-header compact">
            <div className="eyebrow">How It Fits</div>
            <h2>One platform across people, operations and commercial control.</h2>
            <p>
              The value becomes obvious when the structure is obvious: people,
              operations and commercial control inside one connected system.
            </p>
          </div>
          <div className="system-grid">
            {systemColumns.map((column) => (
              <article key={column.title} className="system-card">
                <h3>{column.title}</h3>
                <div className="system-items">
                  {column.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap trust-grid">
          <div className="trust-copy">
            <div className="eyebrow">Trust by design</div>
            <h2>Structured to feel safe, credible and commercially serious.</h2>
            <p>
              DH Workplace is for businesses that want stronger operational discipline,
              clearer visibility and a more reliable path to scale.
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
            <h2>Start the trial and see how much cleaner the business can run.</h2>
          </div>
          <div className="cta-stack">
            <a href="https://workplace.dhwebsiteservices.co.uk" className="button primary">
              Start free trial
            </a>
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
        <div className="wrap">
          <div className="eyebrow">Pricing</div>
          <h1>Simple pricing for businesses ready to operate properly.</h1>
          <p>
            Launch pricing is live now. Start on the right plan, try it for 14 days, and upgrade as the business grows.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap pricing-intro">
          <div className="pricing-lead">
            <div className="eyebrow">Pricing</div>
            <h2>Choose the level of structure your business needs now.</h2>
            <p>Every plan starts with a 14-day free trial. Launch pricing is live now, so the easiest time to switch is before more process debt builds up.</p>
          </div>
          <div className="pricing-callout">
            <strong>Growth is the best fit for most businesses.</strong>
            <span>It gives you the strongest balance of operational control, team visibility and reporting without overcomplicating rollout.</span>
          </div>
        </div>
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
              <div className="plan-note">14-day free trial included. Start quickly, assess fit properly, and upgrade only when you need more.</div>
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
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">FAQ</div>
          <h1>Questions answered clearly before you commit.</h1>
          <p>
            Everything here is designed to help you assess fit quickly, without vague product language.
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
