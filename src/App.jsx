const APP_URL = 'https://app.dhworkplace.co.uk'
const DEMO_URL = 'https://app.dhworkplace.co.uk/demo/demo-northstar-creative-4voj?token=ba5043660b74995cffeacd1797a69885a55f'

const navLinks = [
  ['overview', 'Overview'],
  ['pricing', 'Pricing'],
  ['faq', 'FAQ'],
]

const capabilities = [
  {
    title: 'HR and staff operations',
    copy: 'Bring staff directory, leave, onboarding, documents, policies and timesheets into one controlled operating layer.',
  },
  {
    title: 'CRM',
    copy: 'Run clients, notes, tasks, outreach and pipeline activity in the same workspace leadership already uses daily.',
  },
  {
    title: 'Staff management',
    copy: 'Handle manager visibility, permissions, reporting lines and onboarding from one disciplined internal system.',
  },
  {
    title: 'Documents and policies',
    copy: 'Store internal files, policy acknowledgements and operational records without the usual spreadsheet sprawl.',
  },
  {
    title: 'Leave and timesheets',
    copy: 'Approvals, attendance visibility and operational planning stay visible before they turn into staffing issues.',
  },
  {
    title: 'Billing and reporting',
    copy: 'See subscriptions, invoice movement, exports and reporting signals from the same business workspace.',
  },
]

const proofStats = [
  { value: '995', label: 'operational actions tracked weekly' },
  { value: 'UK', label: 'business-focused deployment' },
  { value: 'GDPR', label: 'privacy-conscious internal structure' },
]

const proofLinks = [
  'Role-based permissions',
  'Read-only live demo',
  'Billing, reporting and exports',
  'Built for internal business operations',
]

const pricingPlans = [
  {
    name: 'Starter',
    launch: '£9',
    normal: '£19',
    badge: 'Launch',
    features: ['HR essentials', 'CRM foundation', 'documents and policies', 'leave tracking', 'core reporting'],
  },
  {
    name: 'Growth',
    launch: '£24',
    normal: '£49',
    badge: 'Most popular',
    featured: true,
    features: ['Everything in Starter', 'staff management', 'timesheets', 'automation controls', 'deeper reporting'],
  },
  {
    name: 'Business',
    launch: '£59',
    normal: '£99',
    badge: 'Scale',
    features: ['Everything in Growth', 'billing visibility', 'advanced permissions', 'admin oversight', 'priority support'],
  },
]

const faqs = [
  {
    q: 'What is DH Workplace?',
    a: 'DH Workplace is an internal business operations platform for HR, CRM, staff management, documents, leave, timesheets, billing and reporting.',
  },
  {
    q: 'Who is it for?',
    a: 'It is designed for companies that want one disciplined internal workspace for leadership, management and staff operations.',
  },
  {
    q: 'Can we book a demo before signing up?',
    a: 'Yes. You can book a guided demo or open the live read-only preview to see how the product is structured.',
  },
  {
    q: 'Can we change plan later?',
    a: 'Yes. Businesses can begin with the right operational layer now and move plans as their internal requirements grow.',
  },
]

function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="#top" aria-label="DH Workplace home">
          <img src="/dh-workplace-logo.svg" alt="" />
          <span>DH Workplace</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-link" href={`${APP_URL}/signin`}>
            Sign in
          </a>
          <a className="button button-primary header-cta" href={`${APP_URL}/signup`}>
            Start free trial
          </a>
        </div>
      </div>
    </header>
  )
}

function HeroMock() {
  return (
    <div className="hero-mock" aria-label="DH Workplace product preview">
      <div className="mock-topbar">
        <div className="mock-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="mock-url">app.dhworkplace.co.uk</div>
      </div>

      <div className="mock-body">
        <aside className="mock-sidebar">
          <div className="mock-brand">
            <div className="mock-brand-mark" />
            <span>Workspace</span>
          </div>
          <div className="mock-nav">
            <button className="active" type="button">
              Dashboard
            </button>
            <button type="button">HR</button>
            <button type="button">Clients</button>
            <button type="button">Documents</button>
            <button type="button">Leave</button>
            <button type="button">Timesheets</button>
            <button type="button">Billing</button>
          </div>
        </aside>

        <div className="mock-main">
          <div className="mock-main-head">
            <div>
              <p>Operations Overview</p>
              <h3>Workspace control</h3>
            </div>
            <span>April 2026</span>
          </div>

          <div className="metric-grid">
            <article>
              <strong>24</strong>
              <span>Team members</span>
            </article>
            <article>
              <strong>156</strong>
              <span>Active clients</span>
            </article>
            <article>
              <strong>8</strong>
              <span>Pending approvals</span>
            </article>
            <article>
              <strong>96%</strong>
              <span>Tasks complete</span>
            </article>
          </div>

          <div className="mock-panels">
            <section>
              <div className="panel-head">
                <span>Leave requests</span>
                <em>3 pending</em>
              </div>
              <ul>
                <li>
                  <span>Sarah M.</span>
                  <i className="signal amber" />
                </li>
                <li>
                  <span>James K.</span>
                  <i className="signal amber" />
                </li>
                <li>
                  <span>Emma L.</span>
                  <i className="signal green" />
                </li>
              </ul>
            </section>

            <section>
              <div className="panel-head">
                <span>Recent activity</span>
              </div>
              <ul className="activity-list">
                <li>
                  <span>Invoice #1247 sent</span>
                  <small>2m ago</small>
                </li>
                <li>
                  <span>New client added</span>
                  <small>15m ago</small>
                </li>
                <li>
                  <span>Policy updated</span>
                  <small>1h ago</small>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="site-shell" id="top">
      <Header />

      <main>
        <section className="hero-section" id="overview">
          <div className="hero-glow hero-glow-left" />
          <div className="hero-glow hero-glow-right" />
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Business operations platform</p>
              <h1>
                The internal workspace for <span>disciplined operations</span>
              </h1>
              <p className="hero-text">
                DH Workplace consolidates HR, CRM, staff management, documents, leave, timesheets,
                billing and reporting into a unified control centre built for business owners and
                managers.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href={`${APP_URL}/signup`}>
                  Start free trial
                </a>
                <a className="button button-secondary" href={DEMO_URL}>
                  View live demo
                </a>
                <a className="button button-ghost" href="#pricing">
                  See pricing
                </a>
              </div>
            </div>

            <HeroMock />
          </div>
        </section>

        <section className="proof-strip">
          <div className="wrap proof-strip-inner">
            <div className="proof-stats">
              {proofStats.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
            <div className="proof-links">
              {proofLinks.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="system-section">
          <div className="wrap system-grid">
            <div className="section-copy">
              <p className="eyebrow">System control</p>
              <h2>Six operational systems working as one</h2>
              <p>
                Replace scattered admin tools with one internal layer for people operations, client
                work, documents, approvals, time and reporting.
              </p>
              <ul className="bullet-list">
                <li>Built for internal business management</li>
                <li>Manager visibility without platform sprawl</li>
                <li>Operational records, approvals and reporting in one place</li>
              </ul>
            </div>

            <div className="system-card">
              <div className="system-card-head">
                <span>Workspace overview</span>
                <em>All systems connected</em>
              </div>
              <div className="system-metric-grid">
                <article>
                  <strong>24</strong>
                  <span>People</span>
                </article>
                <article>
                  <strong>156</strong>
                  <span>Clients</span>
                </article>
                <article>
                  <strong>8</strong>
                  <span>Approvals</span>
                </article>
                <article>
                  <strong>96%</strong>
                  <span>Task health</span>
                </article>
              </div>
              <div className="system-legend">
                <span>People</span>
                <span>CRM</span>
                <span>Billing</span>
                <span>Reporting</span>
              </div>
            </div>
          </div>
        </section>

        <section className="capabilities-section">
          <div className="wrap">
            <div className="section-heading centered">
              <p className="eyebrow">Workspace capability</p>
              <h2>Everything your internal operations need</h2>
              <p>
                Structured for businesses that want clearer accountability, cleaner records and
                better operational visibility.
              </p>
            </div>

            <div className="capability-grid">
              {capabilities.map((item) => (
                <article className="capability-card" key={item.title}>
                  <div className="capability-icon" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <div className="wrap">
            <div className="section-heading centered">
              <p className="eyebrow">Pricing</p>
              <h2>Choose your operational layer</h2>
              <p>Start with the plan that matches your internal structure today and upgrade later.</p>
            </div>

            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <article
                  className={`pricing-card ${plan.featured ? 'featured' : ''}`}
                  key={plan.name}
                >
                  <div className="pricing-top">
                    <span className="pricing-badge">{plan.badge}</span>
                    <h3>{plan.name}</h3>
                  </div>
                  <div className="pricing-amount">
                    <strong>{plan.launch}</strong>
                    <span>/mo</span>
                  </div>
                  <p className="pricing-normal">Normal price {plan.normal}/mo</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a className={`button ${plan.featured ? 'button-primary' : 'button-secondary'}`} href={`${APP_URL}/signup`}>
                    Start free trial
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="wrap faq-grid">
            <div className="section-copy">
              <p className="eyebrow">FAQ</p>
              <h2>Questions buyers ask before rollout</h2>
              <p>
                Built for internal teams, not public customer portals. The product is structured to
                help businesses run operations with more control.
              </p>
            </div>
            <div className="faq-list">
              {faqs.map((item) => (
                <article className="faq-card" key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="wrap final-cta-shell">
            <div>
              <p className="eyebrow">Deployment ready</p>
              <h2>Deploy your workspace</h2>
              <p>
                See how DH Workplace can replace operational sprawl with one clear internal system.
              </p>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href={`${APP_URL}/signup`}>
                Start free trial
              </a>
              <a className="button button-secondary" href={DEMO_URL}>
                View live demo
              </a>
              <a className="button button-ghost" href={`${APP_URL}/signin`}>
                Sign in
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div className="footer-branding">
            <img src="/dh-workplace-logo.svg" alt="" />
            <span>DH Workplace</span>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="#overview">Overview</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href={`${APP_URL}/signin`}>Sign in</a>
          </nav>
          <p className="footer-meta">by DH Website Services</p>
        </div>
      </footer>
    </div>
  )
}

export default App
