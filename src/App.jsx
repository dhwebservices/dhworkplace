import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

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

const proofStats = [
  { value: 'One system', label: 'for people, process and reporting' },
  { value: 'Faster onboarding', label: 'for teams moving out of spreadsheets' },
  { value: 'Cleaner oversight', label: 'for leadership and management' },
  { value: 'UK-ready', label: 'language and workflows that fit local business ops' },
]

const systemColumns = [
  { title: 'People', items: ['HR records', 'onboarding', 'leave', 'timesheets'] },
  { title: 'Operations', items: ['tasks', 'documents', 'policies', 'staff management'] },
  { title: 'Commercial', items: ['CRM', 'clients', 'billing', 'reporting'] },
]

const comparisons = [
  {
    title: 'Spreadsheets and inboxes',
    before: 'Scattered ownership, missing visibility and constant follow-up.',
    after: 'One clear operating layer with accountable workflows and live status.',
  },
  {
    title: 'Generic admin tools',
    before: 'Lots of features, little operational discipline.',
    after: 'A platform shaped around how a real business is actually run.',
  },
  {
    title: 'Patchwork subscriptions',
    before: 'Too many systems, too much duplicated effort.',
    after: 'Sharper structure with fewer moving parts to manage.',
  },
]

const interfaceHighlights = [
  {
    title: 'Manager visibility',
    copy: 'See team status, approvals, tasks and workspace readiness without chasing people for updates.',
  },
  {
    title: 'Structured actions',
    copy: 'The product is shaped around the next operational move, so common admin work feels controlled instead of improvised.',
  },
  {
    title: 'Commercial awareness',
    copy: 'CRM, billing and reporting stay close to operations, which gives leadership a cleaner commercial picture.',
  },
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
              <span className="headline-shift"> with more control.</span>
            </h1>
            <p className="hero-body">
              DH Workplace brings HR, CRM, staff management, documents, policies,
              leave, timesheets, billing and reporting into one commanding platform.
            </p>
            <div className="hero-proofline">
              <span>Built for internal company operations</span>
              <span>14-day free trial</span>
              <span>by DH Website Services</span>
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
                      ['0', 'Active clients', 'green'],
                      ['0', 'Open tasks', 'amber'],
                      ['0', 'Pending leave', 'red'],
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
                      <p>The most common workspace moves</p>
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

                    <section className="workspace-panel short">
                      <h3>Workspace summary</h3>
                      <p>Commercial and operational readiness</p>
                      <div className="summary-grid">
                        <div className="summary-item">
                          <span>Plan</span>
                          <strong>Business</strong>
                        </div>
                        <div className="summary-item">
                          <span>Readiness</span>
                          <strong>Trial</strong>
                        </div>
                        <div className="summary-item">
                          <span>Focus</span>
                          <strong>Internal operations</strong>
                        </div>
                        <div className="summary-item">
                          <span>Mode</span>
                          <strong>Admin overview</strong>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="wrap proof-grid">
          {proofStats.map((item) => (
            <div key={item.label} className="proof-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section interface-section">
        <div className="wrap interface-layout">
          <div className="section-header compact">
            <div className="eyebrow">Interface showcase</div>
            <h2>Software that looks like it can actually run a business.</h2>
            <p>
              DH Workplace should feel operationally credible at first glance:
              cleaner structure, clearer controls and less admin noise.
            </p>
          </div>
          <div className="interface-preview">
            <div className="interface-frame">
              <div className="interface-sidebar">
                <div className="interface-brand">DH Workplace</div>
                <div className="interface-nav">
                  <span className="active">Dashboard</span>
                  <span>People</span>
                  <span>Leave</span>
                  <span>Documents</span>
                  <span>Policies</span>
                  <span>Clients</span>
                  <span>Billing</span>
                  <span>Reports</span>
                </div>
              </div>
              <div className="interface-main">
                <div className="interface-toolbar">
                  <div>
                    <strong>Workspace summary</strong>
                    <span>Tuesday, 31 March 2026</span>
                  </div>
                  <div className="interface-toolbar-actions">
                    <span>Business</span>
                    <span>Trial</span>
                    <span>Ready</span>
                  </div>
                </div>
                <div className="interface-grid">
                  <div className="interface-card wide">
                    <div className="interface-label">Operational health</div>
                    <div className="interface-chart">
                      <span className="bar tall" />
                      <span className="bar mid" />
                      <span className="bar short" />
                      <span className="bar mid" />
                      <span className="bar tall" />
                    </div>
                  </div>
                  <div className="interface-card">
                    <div className="interface-label">Pending approvals</div>
                    <strong>7</strong>
                    <p>Visible immediately to managers</p>
                  </div>
                  <div className="interface-card">
                    <div className="interface-label">Active clients</div>
                    <strong>41</strong>
                    <p>Commercial oversight in one view</p>
                  </div>
                  <div className="interface-card wide">
                    <div className="interface-label">Quick actions</div>
                    <div className="interface-actions">
                      <span>Add team member</span>
                      <span>Create task</span>
                      <span>Approve leave</span>
                      <span>Issue invoice</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="interface-notes">
              {interfaceHighlights.map((item) => (
                <article key={item.title} className="interface-note">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
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

      <section className="section architecture-section">
        <div className="wrap architecture-shell">
          <div className="section-header compact">
            <div className="eyebrow">Platform architecture</div>
            <h2>Three operating layers. One cleaner system.</h2>
            <p>
              DH Workplace becomes much easier to buy when the structure feels obvious:
              people, operations and commercial control inside one connected platform.
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

      <section className="section comparison-section">
        <div className="wrap">
          <div className="section-header compact">
            <div className="eyebrow">Why it wins</div>
            <h2>Less patchwork. More operating discipline.</h2>
            <p>
              DH Workplace should feel like a better way to run the company, not
              just another place to store admin.
            </p>
          </div>
          <div className="comparison-grid">
            {comparisons.map((item) => (
              <article key={item.title} className="comparison-card">
                <h3>{item.title}</h3>
                <div className="comparison-row">
                  <span className="comparison-label">Typical setup</span>
                  <p>{item.before}</p>
                </div>
                <div className="comparison-row improved">
                  <span className="comparison-label">With DH Workplace</span>
                  <p>{item.after}</p>
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
              <div className="plan-note">14-day free trial included. Clean setup. No heavy onboarding just to evaluate the platform.</div>
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
          Need a walkthrough before deciding? Book a demo and we’ll show how DH Workplace fits your actual operating model.
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
