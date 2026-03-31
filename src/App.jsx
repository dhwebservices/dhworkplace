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

const capabilityCards = [
  {
    title: 'HR',
    copy: 'Employee records, onboarding and policy visibility in one controlled place.',
  },
  {
    title: 'CRM',
    copy: 'Leads, clients and ownership in one commercial view management can trust.',
  },
  {
    title: 'Staff management',
    copy: 'Clearer roles, responsibilities and day-to-day accountability as the team grows.',
  },
  {
    title: 'Documents and policies',
    copy: 'A controlled home for documents, acknowledgements and policies.',
  },
  {
    title: 'Leave and timesheets',
    copy: 'Time away, timesheets and approvals handled before they become payroll friction.',
  },
  {
    title: 'Billing and reporting',
    copy: 'Reporting and billing visibility closer to the work that drives the numbers.',
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
    fit: 'Best for smaller teams replacing scattered admin',
    description: 'A cleaner operating layer for smaller teams that need structure without rollout drag.',
    features: ['HR essentials', 'CRM foundation', 'documents and policies', 'leave tracking', '14-day free trial'],
  },
  {
    name: 'Growth',
    launch: '£24/mo',
    normal: '£49/mo',
    badge: 'Most popular',
    fit: 'Best for growing businesses that need proper structure',
    description: 'The strongest balance of control, manager visibility and reporting for most businesses.',
    features: ['Everything in Starter', 'staff management', 'timesheets', 'advanced workflows', 'enhanced reporting'],
  },
  {
    name: 'Business',
    launch: '£59/mo',
    normal: '£99/mo',
    badge: 'Best for scale',
    fit: 'Best for leadership teams that want deeper control',
    description: 'Deeper control, stronger reporting and broader oversight for leadership teams.',
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
              Bring operations
              <span className="headline-shift"> under control.</span>
            </h1>
            <p className="hero-body hero-sequence hero-sequence-3">
              HR, CRM, staff, documents, leave, timesheets, billing and reporting in one disciplined system.
            </p>
            <div className="hero-proofline hero-sequence hero-sequence-4">
              <span>Built for internal company operations</span>
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

      <Reveal as="section" className="section" delay={20}>
        <div className="wrap section-header">
          <div className="eyebrow">Core platform</div>
          <h2>The core systems a growing business needs in one place.</h2>
          <p>
            Fewer tools, less admin drift, clearer ownership.
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
            <h2>Structured to feel credible from day one.</h2>
            <p>
              Built for businesses that need tighter internal control as they scale.
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
      </Reveal>

      <Reveal as="section" className="section final-cta" delay={60}>
        <div className="wrap final-cta-shell">
          <div>
            <div className="eyebrow">Ready to choose</div>
            <h2>Pricing is where the decision gets simple.</h2>
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
            <p>Start with the right level, trial it properly, and upgrade only when the business needs more.</p>
          </div>
          <div className="pricing-callout">
            <strong>Growth is the best fit for most businesses.</strong>
            <span>It gives you the clearest balance of control, visibility and reporting without making rollout feel heavy.</span>
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
              <div className="plan-note">14-day free trial included. Start quickly, validate fit, then scale with confidence.</div>
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
          Need a walkthrough before deciding? Book a demo and we’ll show exactly where DH Workplace replaces admin drag in your business.
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
              Straight answers on fit, rollout and pricing so the decision feels commercial, not confusing.
            </p>
          </div>
          <div className="faq-side-note">
            <strong>Still deciding?</strong>
            <span>Start the trial if you want speed. Book a demo if you want certainty.</span>
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
