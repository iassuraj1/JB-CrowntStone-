import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  'Connect your strategy to live market algorithms',
  'Real-time portfolio optimization & rebalancing',
  'AI-driven signals across equities, commodities & FX',
  'Secure API integration with leading brokerages',
  'Transparent performance analytics dashboard',
];

const tickers = [
  { symbol: 'GOLD', value: '$2,384', change: '+1.2%', direction: 'up' },
  { symbol: 'AED/USD', value: '0.2723', change: '+0.4%', direction: 'up' },
  { symbol: 'RE IDX', value: '4,821', change: '-0.3%', direction: 'dn' },
];

const benefits = [
  {
    icon: 'RT',
    title: 'Real-Time Execution',
    text: 'Millisecond-level order execution powered by co-located infrastructure.',
  },
  {
    icon: 'SEC',
    title: 'Bank-Grade Security',
    text: 'End-to-end encryption with multi-factor authentication and audit trails.',
  },
  {
    icon: 'AI',
    title: 'Alpha Generation',
    text: 'Proprietary signals derived from decades of quantitative research.',
  },
  {
    icon: 'RM',
    title: 'Precision Targeting',
    text: 'Customizable risk parameters aligned to your investment mandate.',
  },
];

export default function SmartConnect() {
  useScrollAnimation();

  return (
    <>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-label animate">Innovation</p>
          <h1 className="page-hero-title animate delay-1">
            Crownstone <span>Smart Connect</span>
          </h1>
          <p className="page-hero-desc animate delay-2">
            Our proprietary platform bridges your investment strategy with intelligent
            algorithmic execution - giving you an institutional-grade edge.
          </p>
        </div>
      </div>

      {/* ── Main Feature ── */}
      <section className="section">
        <div className="container">
          <div className="smart-layout">
            {/* Algo Panel */}
            <div className="animate from-left">
              <div className="algo-panel">
                <div className="algo-header">
                  <div className="algo-dot r" />
                  <div className="algo-dot y" />
                  <div className="algo-dot g" />
                  <span className="algo-title-bar">CROWNSTONE / SMART CONNECT</span>
                </div>
                <div className="algo-line">
                  <span className="algo-lnum">01</span>
                  <span>
                    <span className="algo-kw">const</span>{' '}
                    <span className="algo-code">portfolio</span> ={' '}
                    <span className="algo-kw">await</span>{' '}
                    <span className="algo-code">Crownstone</span>.connect({'{'})
                  </span>
                </div>
                <div className="algo-line">
                  <span className="algo-lnum">02</span>
                  <span>&nbsp;&nbsp;<span className="algo-code">strategy</span>: <span className="algo-str">'multi-asset'</span>,</span>
                </div>
                <div className="algo-line">
                  <span className="algo-lnum">03</span>
                  <span>&nbsp;&nbsp;<span className="algo-code">risk</span>: <span className="algo-str">'moderate'</span>,</span>
                </div>
                <div className="algo-line">
                  <span className="algo-lnum">04</span>
                  <span>&nbsp;&nbsp;<span className="algo-code">algo</span>: <span className="algo-str">'momentum + mean-reversion'</span>,</span>
                </div>
                <div className="algo-line">
                  <span className="algo-lnum">05</span>
                  <span>&nbsp;&nbsp;<span className="algo-code">rebalance</span>: <span className="algo-str">'dynamic'</span>,</span>
                </div>
                <div className="algo-line">
                  <span className="algo-lnum">06</span>
                  <span>{'}'}</span>
                </div>
                <div className="algo-line">
                  <span className="algo-lnum">07</span>
                  <span className="algo-comment">// Live signals processing...</span>
                </div>
                <div className="algo-line">
                  <span className="algo-lnum">08</span>
                  <span>
                    <span className="algo-kw">return</span> portfolio.
                    <span className="algo-code">optimize</span>();{' '}
                    <span className="algo-comment">// returns alpha</span>
                  </span>
                </div>
                <div className="algo-ticker-row">
                  {tickers.map((t) => (
                    <div key={t.symbol} className="ticker">
                      <div className="ticker-sym">{t.symbol}</div>
                      <div className="ticker-val">{t.value}</div>
                      <div className={`ticker-chg ${t.direction}`}>{t.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature List */}
            <div className="animate from-right">
              <p className="label">Platform Features</p>
              <div className="ornament left">
                <div className="ornament-line" />
                <div className="ornament-diamond" />
                <div className="ornament-line right" />
              </div>
              <h2 className="heading" style={{ marginBottom: '16px' }}>
                Intelligent Execution,<br />Institutional Edge
              </h2>
              <p className="subheading" style={{ marginBottom: '8px' }}>
                Smart Connect delivers algorithmic precision for every investment mandate.
              </p>

              <ul className="feature-list">
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <div className="badge-waitlist">
                <span className="badge-pulse-dot" />
                Coming Soon - Join the Waitlist
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link to="/contact" className="btn btn-primary">
                  Request Early Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <p className="label animate">Why Smart Connect</p>
            <div className="ornament center animate delay-1">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line right" />
            </div>
            <h2 className="heading animate delay-1">Platform Benefits</h2>
          </div>

          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={b.title} className={`benefit-card animate delay-${i + 1}`}>
                <span className="benefit-icon">{b.icon}</span>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-banner">
        <div className="cta-banner-inner animate">
          <p className="label">Early Access</p>
          <h2 className="heading" style={{ color: '#fff', marginBottom: '16px' }}>
            Be First on the Platform
          </h2>
          <p className="subheading" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            Join our waitlist for priority access when Smart Connect launches.
          </p>
          <Link to="/contact" className="btn btn-gold btn-lg">Join the Waitlist</Link>
        </div>
      </div>
    </>
  );
}
