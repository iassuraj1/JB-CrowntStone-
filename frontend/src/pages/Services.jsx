import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    emoji: 'RE',
    badge: 'Active',
    title: 'Crownstone Private Wealth\nReal Estate & Advisory',
    desc: 'Exclusive opportunities and strategic investment advice in prime global real estate development.',
    details: [
      'Premium residential and commercial portfolio access',
      'Cross-border acquisition advisory and structuring',
      'Market intelligence for emerging and established markets',
      'End-to-end transaction management and due diligence',
      'Off-market opportunities for qualified investors',
    ],
    href: 'http://www.jbcrownstone.com:8080/',
    external: true,
  },
  {
    emoji: 'GLD',
    badge: 'Coming Soon',
    title: 'Crownstone\nGold Loans',
    desc: 'Unlocking asset value through secure, asset-backed gold financing solutions.',
    details: [
      'Competitive loan-to-value ratios on gold holdings',
      'Flexible repayment structures tailored to clients',
      'Secure vault storage and custody solutions',
      'Fast approval and disbursement processes',
      'Confidential and discreet service management',
    ],
    href: '/contact',
  },
  {
    emoji: 'AM',
    badge: 'Coming Soon',
    title: 'Crownstone Asset Management\n(Dubai)',
    desc: 'Regional expertise and specialized portfolio management in high-growth markets.',
    details: [
      'Multi-asset portfolio construction and management',
      'Dubai and MENA market specialization',
      'Alternative investment access and structuring',
      'Institutional-grade risk management frameworks',
      'Family office and UHNWI mandates',
    ],
    href: '/contact',
  },
];

export default function Services() {
  useScrollAnimation();

  return (
    <>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-label animate">Our Portfolio</p>
          <h1 className="page-hero-title animate delay-1">
            Our <span>Services</span>
          </h1>
          <p className="page-hero-desc animate delay-2">
            A curated suite of financial services designed to preserve, grow, and multiply
            your wealth across global markets.
          </p>
        </div>
      </div>

      {/* ── Services ── */}
      <section className="section">
        <div className="container">
          <div className="services-list">
            {services.map((svc, i) => {
              const isSoon = svc.badge === 'Coming Soon';
              return (
                <div key={svc.title} className={`service-item animate delay-${i + 1}`}>
                  <div className="service-icon-col">
                    <div className="service-icon-box">{svc.emoji}</div>
                    <span className={`badge ${isSoon ? 'badge-soon' : 'badge-gold'}`}>
                      {isSoon && <span className="badge-pulse-dot" />}
                      {svc.badge}
                    </span>
                  </div>

                  <div className="service-content">
                    <h2 className="service-title">{svc.title}</h2>
                    <p className="service-desc">{svc.desc}</p>
                    <ul className="service-features">
                      {svc.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>

                    {svc.external ? (
                      <a
                        href={svc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Learn More
                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M1 5h12M8 1l4 4-4 4" />
                        </svg>
                      </a>
                    ) : (
                      <Link to="/contact" className="btn btn-outline-gold">
                        Get Notified
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-banner">
        <div className="cta-banner-inner animate">
          <p className="label">Bespoke Advisory</p>
          <h2 className="heading" style={{ color: '#fff', marginBottom: '16px' }}>
            Not Sure Where to Start?
          </h2>
          <p className="subheading" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            Our advisors will guide you to the right service for your unique situation.
          </p>
          <Link to="/contact" className="btn btn-gold btn-lg">Speak with an Advisor</Link>
        </div>
      </div>
    </>
  );
}
