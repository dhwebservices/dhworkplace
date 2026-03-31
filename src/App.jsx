import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const SITE_URL = 'https://dhworkplace.co.uk'
const APP_URL = 'https://app.dhworkplace.co.uk'
const DEMO_MAILTO = 'mailto:clients@dhwebsiteservices.co.uk?subject=DH%20Workplace%20Demo'
const LIVE_DEMO_URL = 'https://app.dhworkplace.co.uk/demo/demo-northstar-creative-4voj?token=ba5043660b74995cffeacd1797a69885a55f'
const DEFAULT_OG_IMAGE = `${SITE_URL}/dh-workplace-logo.svg`

const productStats = [
  { value: '14 days', label: 'free trial' },
  { value: '6 core systems', label: 'under one login' },
]

const heroPreviewViews = {
  dashboard: {
    section: 'Overview',
    title: 'Dashboard',
    headline: 'Good morning',
    subline: 'Tuesday, 31 March 2026',
    status: '14 days left in trial',
    stats: [
      ['1', 'Team members', 'blue'],
      ['41', 'Active clients', 'green'],
      ['7', 'Pending approvals', 'amber'],
    ],
    panelTitle: 'Quick actions',
    panelCopy: 'The next operational moves, surfaced clearly.',
    items: [
      ['Add team member', 'Invite a new person and assign their role'],
      ['Add client', 'Create a client account and assign ownership'],
      ['Approve leave', 'Review time away with clear manager visibility'],
    ],
  },
  staff: {
    section: 'HR',
    title: 'Staff Directory',
    headline: 'Team visibility',
    subline: 'Roles, teams and reporting lines in one place',
    status: 'Managers view live team structure',
    stats: [
      ['12', 'Active staff', 'blue'],
      ['4', 'Departments', 'green'],
      ['3', 'Open onboarding', 'amber'],
    ],
    panelTitle: 'Recent team updates',
    panelCopy: 'The operational changes leadership needs to see quickly.',
    items: [
      ['New starter added', 'Operations Coordinator assigned to Client Services'],
      ['Reporting line updated', 'Sales now reports into Commercial Director'],
      ['Profile completed', 'HR records confirmed for payroll readiness'],
    ],
  },
  leave: {
    section: 'HR',
    title: 'Leave',
    headline: 'Leave requests',
    subline: 'Approvals and visibility before they become schedule problems',
    status: '2 requests need review today',
    stats: [
      ['12', 'Days booked', 'blue'],
      ['2', 'Pending review', 'amber'],
      ['0', 'Policy issues', 'green'],
    ],
    panelTitle: 'Pending decisions',
    panelCopy: 'Managers can act quickly with the right context in view.',
    items: [
      ['Sarah Ahmed', 'Annual leave · 8 Apr to 10 Apr · awaiting approval'],
      ['Daniel Reed', 'Medical leave · documents attached · review today'],
      ['Coverage check', 'Client support remains fully staffed next week'],
    ],
  },
  documents: {
    section: 'HR',
    title: 'Documents',
    headline: 'Document control',
    subline: 'Policies, files and acknowledgements held in one controlled layer',
    status: '3 policy acknowledgements outstanding',
    stats: [
      ['28', 'Live documents', 'blue'],
      ['92%', 'Policy acknowledged', 'green'],
      ['3', 'Need review', 'amber'],
    ],
    panelTitle: 'Latest document activity',
    panelCopy: 'Keep policies visible and staff acknowledgements current.',
    items: [
      ['Handbook updated', 'Version 3.2 published to all active staff'],
      ['Policy reminder sent', 'Expenses policy outstanding for 3 team members'],
      ['Document approved', 'Onboarding pack signed off by management'],
    ],
  },
  clients: {
    section: 'Clients',
    title: 'Clients',
    headline: 'Client overview',
    subline: 'Ownership, status and operational activity in one commercial view',
    status: '41 active clients in the workspace',
    stats: [
      ['41', 'Active clients', 'green'],
      ['7', 'At-risk accounts', 'amber'],
      ['£84k', 'Billed this month', 'blue'],
    ],
    panelTitle: 'Client movements',
    panelCopy: 'Commercial visibility without switching systems.',
    items: [
      ['Northstar Creative', 'Owner assigned · onboarding in progress'],
      ['Aster Group', 'Renewal opportunity flagged for management review'],
      ['Holloway Studio', 'Invoice approved and billing status updated'],
    ],
  },
  pipeline: {
    section: 'Clients',
    title: 'Pipeline',
    headline: 'Pipeline health',
    subline: 'Keep new business momentum and handoff clarity in one place',
    status: '4 live opportunities due this month',
    stats: [
      ['9', 'Live deals', 'blue'],
      ['4', 'Closing soon', 'amber'],
      ['£126k', 'Pipeline value', 'green'],
    ],
    panelTitle: 'Active opportunities',
    panelCopy: 'A cleaner view of progress, ownership and next actions.',
    items: [
      ['Northstar retainer', 'Proposal sent · awaiting commercial sign-off'],
      ['Atlas rebuild', 'Discovery complete · quotation due tomorrow'],
      ['Beacon support', 'Handoff to operations planned after close'],
    ],
  },
}

const heroPreviewNav = [
  { group: 'Overview', items: [['dashboard', 'Dashboard']] },
  { group: 'HR', items: [['staff', 'Staff Directory'], ['leave', 'Leave'], ['documents', 'Documents']] },
  { group: 'Clients', items: [['clients', 'Clients'], ['pipeline', 'Pipeline']] },
]

const capabilityCards = [
  {
    title: 'HR and staff operations',
    copy: 'Staff directory, leave, documents, onboarding and timesheets in one controlled operational layer.',
  },
  {
    title: 'CRM and client work',
    copy: 'Clients, notes, tasks, pipeline, outreach and invoices in one commercial workspace.',
  },
  {
    title: 'Roles and permissions',
    copy: 'Manager, admin and owner controls that keep higher-privilege workflows in the right hands.',
  },
  {
    title: 'Reporting and exports',
    copy: 'Summary reporting plus CSV exports across staff, leave, clients, invoices and timesheets.',
  },
  {
    title: 'Billing and subscriptions',
    copy: 'Trial handling, live plan changes, billing status logic and subscription control without admin sprawl.',
  },
  {
    title: 'Tenant and super admin control',
    copy: 'Multi-tenant architecture, workspace administration, demo tenants and platform-level oversight.',
  },
]

const trustSignals = [
  'Multi-tenant workspace architecture',
  'Role-based internal permissions',
  'Billing, reporting and exports in one system',
  'Read-only live demo available',
]

const pricingPlans = [
  {
    name: 'Starter',
    launch: '£9/mo',
    normal: '£19/mo',
    badge: 'Launch offer',
    fit: 'Best for smaller teams replacing scattered internal admin',
    description: 'A clean internal workspace for businesses getting HR, client work and operational records under control.',
    features: ['HR essentials', 'CRM foundation', 'documents and policies', 'leave tracking', '14-day free trial'],
  },
  {
    name: 'Growth',
    launch: '£24/mo',
    normal: '£49/mo',
    badge: 'Most popular',
    fit: 'Best for growing businesses that need tighter operational structure',
    description: 'The strongest balance of manager visibility, workflow control, reporting and day-to-day structure.',
    features: ['Everything in Starter', 'staff management', 'timesheets', 'advanced workflows', 'enhanced reporting'],
  },
  {
    name: 'Business',
    launch: '£59/mo',
    normal: '£99/mo',
    badge: 'Best for scale',
    fit: 'Best for leadership teams that want deeper control and oversight',
    description: 'Broader billing, reporting, permissions and workspace control for more mature internal operations.',
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

const seoPages = {
  '/': {
    title: 'DH Workplace | Business Operations Platform for HR, CRM and Reporting',
    description:
      'DH Workplace brings HR, CRM, staff management, documents, leave, timesheets, billing and reporting into one disciplined business operations platform.',
    path: '/',
    type: 'website',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'DH Workplace',
        url: SITE_URL,
        email: 'clients@dhwebsiteservices.co.uk',
        parentOrganization: {
          '@type': 'Organization',
          name: 'DH Website Services',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'DH Workplace',
        url: SITE_URL,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'DH Workplace',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: [
          {
            '@type': 'Offer',
            name: 'Starter',
            price: '9',
            priceCurrency: 'GBP',
          },
          {
            '@type': 'Offer',
            name: 'Growth',
            price: '24',
            priceCurrency: 'GBP',
          },
          {
            '@type': 'Offer',
            name: 'Business',
            price: '59',
            priceCurrency: 'GBP',
          },
        ],
      },
    ],
  },
  '/pricing': {
    title: 'DH Workplace Pricing | Starter, Growth and Business Plans',
    description:
      'Compare DH Workplace pricing across Starter, Growth and Business plans, with launch pricing and a 14-day free trial.',
    path: '/pricing',
    type: 'website',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'DH Workplace Pricing',
        url: `${SITE_URL}/pricing`,
      },
    ],
  },
  '/faq': {
    title: 'DH Workplace FAQ | Trial, Pricing and Product Questions',
    description:
      'Read DH Workplace FAQs covering who it is for, how the free trial works, pricing, rollout and how it fits modern businesses.',
    path: '/faq',
    type: 'website',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  },
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function useInView() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, visible] = useInView()

  return (
    <Tag
      ref={ref}
      className={`${className} reveal ${visible ? 'is-visible' : ''}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function SEOHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = seoPages[pathname] ?? seoPages['/']
    const canonicalUrl = `${SITE_URL}${page.path}`

    document.title = page.title

    const setMeta = (selector, attribute, value) => {
      const element = document.head.querySelector(selector)
      if (element) element.setAttribute(attribute, value)
    }

    const setLink = (selector, value) => {
      const element = document.head.querySelector(selector)
      if (element) element.setAttribute('href', value)
    }

    setMeta('meta[name="description"]', 'content', page.description)
    setMeta('meta[name="robots"]', 'content', 'index, follow')
    setMeta('meta[property="og:title"]', 'content', page.title)
    setMeta('meta[property="og:description"]', 'content', page.description)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)
    setMeta('meta[property="og:type"]', 'content', page.type)
    setMeta('meta[property="og:image"]', 'content', DEFAULT_OG_IMAGE)
    setMeta('meta[name="twitter:title"]', 'content', page.title)
    setMeta('meta[name="twitter:description"]', 'content', page.description)
    setMeta('meta[name="twitter:image"]', 'content', DEFAULT_OG_IMAGE)
    setLink('link[rel="canonical"]', canonicalUrl)

    const existingScript = document.getElementById('seo-structured-data')
    if (existingScript) existingScript.remove()

    const script = document.createElement('script')
    script.id = 'seo-structured-data'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(page.structuredData)
    document.head.appendChild(script)

    return () => {
      const currentScript = document.getElementById('seo-structured-data')
      if (currentScript) currentScript.remove()
    }
  }, [pathname])

  return null
}

function LogoCursor() {
  const cursorRef = useRef(null)
  const frameRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return undefined

    const cursorEl = cursorRef.current
    if (!cursorEl) return undefined

    const render = () => {
      const { x, y } = targetRef.current
      cursorEl.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0)`
      frameRef.current = 0
    }

    const handleMove = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY }
      cursorEl.classList.add('visible')
      if (!frameRef.current) frameRef.current = window.requestAnimationFrame(render)
    }

    const handleLeave = () => cursorEl.classList.remove('visible')

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div ref={cursorRef} className="logo-cursor" aria-hidden="true">
      <img src="/dh-workplace-logo.svg" alt="" />
    </div>
  )
}

function HeroProductPreview() {
  const [activeView, setActiveView] = useState('dashboard')
  const preview = heroPreviewViews[activeView]

  return (
    <div className="hero-visual hero-sequence hero-sequence-4" aria-label="DH Workplace product preview">
      <div className="dashboard-shell">
        <div className="browser-chrome">
          <div className="browser-controls">
            <span />
            <span />
            <span />
          </div>
          <div className="browser-url">dhworkplace.co.uk</div>
          <div className="browser-tools">
            <span className="browser-tool" />
            <span className="browser-tool" />
          </div>
        </div>
        <div className="dashboard-topbar">
          <div className="topbar-bookmark">dhwebservices/dhworkplace</div>
          <div className="topbar-actions">
            <span className="topbar-tab">DH Workplace</span>
            <span className="topbar-tab muted">{preview.title}</span>
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
            {heroPreviewNav.map((group) => (
              <div key={group.group} className="rail-group">
                <div className="rail-heading">{group.group}</div>
                <div className="rail-stack">
                  {group.items.map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      className={`rail-item ${activeView === id ? 'active' : ''}`}
                      onClick={() => setActiveView(id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          <div className="dashboard-main">
            <div className="workspace-header">
              <div>
                <h2>{preview.headline}</h2>
                <p>{preview.subline}</p>
              </div>
              <div className="workspace-statusbar">
                <div className="status-pill">
                  <span className="status-dot" />
                  <div>
                    <b>Workspace status</b>
                    <span>{preview.status}</span>
                  </div>
                </div>
                <span className="status-button">Trial</span>
                <span className="status-button ghost">Details</span>
                <span className="status-icon" />
              </div>
            </div>

            <div className="preview-titlebar">
              <span className="preview-section">{preview.section}</span>
              <span className="preview-view">{preview.title}</span>
            </div>

            <div className="workspace-stats">
              {preview.stats.map(([value, label, tone]) => (
                <div key={label} className="workspace-stat">
                  <strong className={`tone-${tone}`}>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="workspace-panels">
              <section key={activeView} className="workspace-panel large workspace-panel-transition">
                <h3>{preview.panelTitle}</h3>
                <p>{preview.panelCopy}</p>
                <div className="action-list">
                  {preview.items.map(([title, copy]) => (
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
      <SEOHead />
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
            <a href={APP_URL} className="link-action">
              Sign in
            </a>
            <a href={LIVE_DEMO_URL} className="button secondary" target="_blank" rel="noreferrer">
              View live demo
            </a>
            <a href={DEMO_MAILTO} className="button secondary">
              Book a demo
            </a>
            <a href={APP_URL} className="button primary">
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
            <a href={APP_URL} className="link-action" onClick={() => setMenuOpen(false)}>
              Sign in
            </a>
            <a href={LIVE_DEMO_URL} className="button secondary" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
              View live demo
            </a>
            <a href={DEMO_MAILTO} className="button secondary" onClick={() => setMenuOpen(false)}>
              Book a demo
            </a>
            <a href={APP_URL} className="button primary" onClick={() => setMenuOpen(false)}>
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
            <div className="eyebrow hero-sequence hero-sequence-1">14-day free trial included</div>
            <h1 className="hero-sequence hero-sequence-2">
              Run internal operations
              <span className="headline-shift"> in one place.</span>
            </h1>
            <p className="hero-body hero-sequence hero-sequence-3">
              DH Workplace helps businesses run staff operations, client work, billing and reporting from one clean internal workspace.
            </p>
            <div className="hero-proofline hero-sequence hero-sequence-4">
              <span>Built for the business and its internal team</span>
            </div>
            <div className="hero-actions hero-sequence hero-sequence-5">
              <a href={APP_URL} className="button primary">
                Start 14-day trial
              </a>
              <a href={LIVE_DEMO_URL} className="button secondary" target="_blank" rel="noreferrer">
                View live demo
              </a>
              <Link to="/pricing" className="button secondary">See pricing</Link>
            </div>
            <div className="stat-row hero-sequence hero-sequence-6">
              {productStats.map((item) => (
                <div key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <HeroProductPreview />
        </div>
      </section>

      <Reveal as="section" className="section" delay={20}>
        <div className="wrap section-header">
          <div className="eyebrow">Core platform</div>
          <h2>The systems behind staff, client work and billing in one workspace.</h2>
          <p>
            Built for business owners, managers and internal teams, not for end customers.
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
      </Reveal>

      <Reveal as="section" className="section" delay={40}>
        <div className="wrap trust-grid">
          <div className="trust-copy">
            <div className="eyebrow">Trust by design</div>
            <h2>Structured for internal control from day one.</h2>
            <p>
              Multi-tenant architecture, permissions, billing logic and reporting built into the platform, not bolted on around it.
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
              <span>Platform model</span>
              <strong>Multi-tenant</strong>
            </div>
            <div className="trust-metric">
              <span>Internal control</span>
              <strong>Roles + permissions</strong>
            </div>
            <div className="trust-metric">
              <span>Product proof</span>
              <strong>Live demo</strong>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section final-cta" delay={60}>
        <div className="wrap final-cta-shell">
          <div>
            <div className="eyebrow">Ready to choose</div>
            <h2>See the platform, choose the plan, then roll it out properly.</h2>
          </div>
          <div className="cta-stack">
            <Link to="/pricing" className="button primary">View pricing</Link>
            <a href={LIVE_DEMO_URL} className="button secondary" target="_blank" rel="noreferrer">
              View live demo
            </a>
            <a href={DEMO_MAILTO} className="button secondary">
              Book a demo
            </a>
          </div>
        </div>
      </Reveal>
    </main>
  )
}

function PricingPage() {
  return (
    <main className="page-shell">
      <Reveal as="section" className="page-hero" delay={10}>
        <div className="wrap pricing-intro">
          <div className="pricing-lead">
            <div className="eyebrow">Pricing</div>
            <h1>Choose the level of structure your business needs now.</h1>
            <p>Start with the right operational layer for your team, trial it properly, and move up as the business needs more control.</p>
          </div>
          <div className="pricing-callout">
            <strong>Growth is the best fit for most businesses.</strong>
            <span>It gives most teams the right balance of HR, CRM, reporting and workflow control without making rollout feel heavy.</span>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section pricing-section" delay={30}>
        <div className="wrap pricing-grid">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`pricing-card ${plan.name === 'Growth' ? 'featured pricing-card-spotlight' : ''}`}
            >
              <div className="pricing-badge">{plan.badge}</div>
              <h2>{plan.name}</h2>
              <div className="pricing-fit">{plan.fit}</div>
              <div className="price-row">
                <strong>{plan.launch}</strong>
                <span>{plan.normal} normal</span>
              </div>
              <div className="pricing-subline">Launch pricing available now</div>
              <p>{plan.description}</p>
              <div className="plan-note">14-day free trial included. Start with the right operational setup, validate fit, then scale with confidence.</div>
              <div className="feature-list">
                {plan.features.map((feature) => (
                  <div key={feature} className="feature-item">
                    <span className="trust-dot" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <a href={APP_URL} className="button primary wide">
                Start 14-day trial
              </a>
              <a href={LIVE_DEMO_URL} className="button secondary wide" target="_blank" rel="noreferrer">
                View live demo
              </a>
              <div className="pricing-cta-note">No sales call required to start.</div>
            </article>
          ))}
        </div>
        <div className="pricing-footer-note">
          Need a walkthrough before deciding? Book a demo and we’ll show exactly how DH Workplace handles staff operations, client work, billing and reporting inside one internal workspace.
        </div>
      </Reveal>
    </main>
  )
}

function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <main className="page-shell">
      <Reveal as="section" className="page-hero faq-hero" delay={10}>
        <div className="wrap faq-hero-layout">
          <div>
          <div className="eyebrow">FAQ</div>
            <h1>Questions answered clearly before you commit.</h1>
            <p>
              Straight answers on fit, rollout and pricing so businesses can evaluate DH Workplace as an internal operations platform, not a client-facing portal.
            </p>
          </div>
          <div className="faq-side-note">
            <strong>Still deciding?</strong>
            <span>Use the live demo if you want product proof. Book a demo if you want a guided commercial walkthrough.</span>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="section faq-section" delay={30}>
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
                  <span className="faq-plus">+</span>
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
          <a href={LIVE_DEMO_URL} className="button secondary" target="_blank" rel="noreferrer">
            View live demo
          </a>
          <a href={DEMO_MAILTO} className="button secondary">
            Book a demo
          </a>
        </div>
      </Reveal>
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
