import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const stats = [
  { number: '2021', label: 'Established' },
  { number: '4+', label: 'Divisions' },
  { number: 'Global', label: 'Reach' },
];

const pillars = [
  {
    icon: 'TI',
    title: 'Trust & Integrity',
    text: 'Fiduciary-first approach to every client engagement and investment decision.',
  },
  {
    icon: 'QA',
    title: 'Data-Driven',
    text: 'Quantitative models backed by deep fundamental research and real-time analytics.',
  },
  {
    icon: 'GA',
    title: 'Global Access',
    text: 'Cross-border opportunities in real estate, commodities, and financial markets.',
  },
  {
    icon: 'LB',
    title: 'Legacy Building',
    text: 'Multi-generational wealth strategies that protect and perpetuate your prosperity.',
  },
];

const values = [
  {
    title: 'Discretion',
    text: 'We maintain absolute confidentiality in all client relationships and transactions.',
  },
  {
    title: 'Excellence',
    text: 'We pursue exceptional outcomes through rigorous research and disciplined execution.',
  },
  {
    title: 'Partnership',
    text: 'We align our success entirely with yours, acting always in your best interest.',
  },
];

export default function About() {
  useScrollAnimation();

  return (
    <>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-label animate">Who We Are</p>
          <h1 className="page-hero-title animate delay-1">
            About <span>Crownstone</span>
          </h1>
          <p className="page-hero-desc animate delay-2">
            A privately held wealth management firm dedicated to delivering institutional-grade
            investment strategies with unwavering integrity.
          </p>
        </div>
      </div>

      {/* ── Story ── */}
      <section className="section">
        <div className="container">
          <div className="about-story">
            <div className="animate from-left">
              <p className="label">Our Story</p>
              <div className="ornament left">
                <div className="ornament-line" />
                <div className="ornament-diamond" />
                <div className="ornament-line right" />
              </div>
              <h2 className="heading" style={{ marginBottom: '24px' }}>
                Building Legacies<br />Since 2021
              </h2>
              <p className="subheading" style={{ marginBottom: '20px' }}>
                JB Crownstone was founded with a singular mission: to bring the sophistication
                of institutional wealth management to a select group of private clients who
                demand excellence without compromise.
              </p>
              <p className="subheading" style={{ marginBottom: '40px' }}>
                With a focus on real assets, alternative investments, and bespoke portfolio
                construction, we partner with our clients to navigate complex markets with
                precision and confidence.
              </p>

              <div className="about-stats-bar">
                {stats.map((s) => (
                  <div key={s.label} className="about-stat">
                    <span className="about-stat-num">{s.number}</span>
                    <span className="about-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-visual-graphic animate from-right">
              <div className="about-logo-display">
                <img src="/jb_logo.jpeg" alt="JB Crownstone" />
              </div>
              <div className="about-visual-badge">
                <span className="about-visual-badge-text">EST. 2021</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="label animate">Our Foundation</p>
            <div className="ornament center animate delay-1">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line right" />
            </div>
            <h2 className="heading animate delay-1">Core Pillars</h2>
            <p className="subheading animate delay-2">
              Four principles that guide every decision we make on behalf of our clients.
            </p>
          </div>

          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <div key={p.title} className={`pillar-card-v2 animate delay-${i + 1}`}>
                <span className="pillar-icon">{p.icon}</span>
                <div className="pillar-title" style={{ marginBottom: '12px', textAlign: 'center' }}>{p.title}</div>
                <p className="pillar-text" style={{ textAlign: 'center' }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label animate">What Guides Us</p>
            <div className="ornament center animate delay-1">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line right" />
            </div>
            <h2 className="heading animate delay-1">Our Values</h2>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} className={`value-card animate delay-${i + 1}`}>
                <div className="value-number">0{i + 1}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-banner">
        <div className="cta-banner-inner animate">
          <p className="label">Partner with Us</p>
          <h2 className="heading" style={{ color: '#fff', marginBottom: '16px' }}>
            Ready to Elevate Your Wealth?
          </h2>
          <p className="subheading" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            Connect with our team to begin your bespoke wealth management journey.
          </p>
          <Link to="/contact" className="btn btn-gold btn-lg">Get in Touch</Link>
        </div>
      </div>
    </>
  );
}
