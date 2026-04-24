import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SUBTITLE = 'Elevating Wealth. Defining Legacy.';

const services = [
  {
    emoji: '🏙️',
    badge: 'Active',
    title: 'Crownstone Private Wealth\nReal Estate & Advisory',
    desc: 'Exclusive opportunities and strategic investment advice in prime global real estate development.',
    href: 'http://www.jbcrownstone.com:8080/',
    external: true,
  },
  {
    emoji: '🏅',
    badge: 'Coming Soon',
    title: 'Crownstone\nGold Loans',
    desc: 'Unlocking asset value through secure, asset-backed gold financing.',
    href: '/contact',
  },
  {
    emoji: '🌐',
    badge: 'Coming Soon',
    title: 'Crownstone Asset Management\n(Dubai)',
    desc: 'Regional expertise and specialized portfolio management in high-growth markets.',
    href: '/contact',
  },
];

const pillars = [
  { icon: '🛡️', title: 'Trust & Integrity', text: 'Fiduciary-first approach to every client engagement.' },
  { icon: '📊', title: 'Data-Driven', text: 'Quantitative models backed by deep fundamental research.' },
  { icon: '🌍', title: 'Global Access', text: 'Cross-border opportunities in real estate and commodities.' },
  { icon: '👑', title: 'Legacy Building', text: 'Multi-generational strategies that protect your prosperity.' },
];

function useTypewriter(text, speed = 55, startDelay = 1600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const iv = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i++));
        } else {
          clearInterval(iv);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function Home() {
  useScrollAnimation();
  const { displayed: subtitle, done: subtitleDone } = useTypewriter(SUBTITLE);

  return (
    <>
      {/* ══ Hero ══════════════════════════════════════════ */}
      <section className="hero">
        {/* Layer 0: nebula gradient */}
        <div className="hero-nebula" aria-hidden="true" />

        {/* Layer 1: drifting grid */}
        <div className="hero-bg-pattern" aria-hidden="true" />

        {/* Layer 2: content */}
        <div className="hero-content">
          <div className="hero-logo-wrap">
            <img src="/logojbc.png" alt="JB Crownstone Logo" />
          </div>

          <p className="hero-subtitle">
            {subtitle}
            {!subtitleDone && <span className="hero-cursor">|</span>}
          </p>

          <p className="hero-desc">
            A privately held wealth management firm delivering institutional-grade
            investment strategies to discerning private clients and family offices.
          </p>

          <div className="hero-cta">
            <Link to="/services" className="btn btn-gold btn-lg">Explore Services</Link>
            <Link to="/about"    className="btn btn-outline btn-lg">About Us</Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">2021</span>
              <span className="hero-stat-label">Established</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">4+</span>
              <span className="hero-stat-label">Divisions</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">India , UAE</span>
              <span className="hero-stat-label">Reach</span>
            </div>
          </div>
        </div>

       
      </section>

      {/* ══ Services Preview ══════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label animate">Our Portfolio</p>
            <div className="ornament center animate delay-1">
              <div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line right" />
            </div>
            <h2 className="heading animate delay-1">Our Services</h2>
            <p className="subheading animate delay-2">
              A curated suite of financial services designed to preserve, grow, and multiply
              your wealth across global markets.
            </p>
          </div>

          <div className="services-grid">
            {services.map((svc, i) => {
              const isSoon = svc.badge === 'Coming Soon';
              const inner = (
                <>
                  <div className="card-icon-box">{svc.emoji}</div>
                  <span className={`badge ${isSoon ? 'badge-soon' : 'badge-gold'}`}>
                    {isSoon && <span className="badge-pulse-dot" />}{svc.badge}
                  </span>
                  <div className="card-title">{svc.title}</div>
                  <p className="card-desc">{svc.desc}</p>
                  <span className="card-link">
                    {isSoon ? 'Notify Me' : 'Learn More'}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 5h12M8 1l4 4-4 4" /></svg>
                  </span>
                </>
              );
              return svc.external ? (
                <a key={svc.title} href={svc.href} target="_blank" rel="noopener noreferrer"
                  className={`card animate delay-${i + 1}`} style={{ display:'block' }}>
                  {inner}
                </a>
              ) : (
                <div key={svc.title} className={`card animate delay-${i + 1}`}>{inner}</div>
              );
            })}
          </div>

          <div style={{ textAlign:'center', marginTop:'44px' }}>
            <Link to="/services" className="btn btn-outline animate delay-4">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ══ Why JB ═══════════════════════════════════════ */}
      <section className="section section-alt">
        <div className="container">
          <div className="why-grid">
            <div className="why-text animate from-left">
              <p className="label">Why Choose Us</p>
              <div className="ornament left">
                <div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line right" />
              </div>
              <h2 className="heading" style={{ marginBottom:'16px' }}>
                Built on Trust,<br />Driven by Excellence
              </h2>
              <p className="subheading" style={{ marginBottom:'32px' }}>
                Since 2021, JB Crownstone has partnered with private clients and family offices
                to navigate complex markets with precision, discretion, and unwavering integrity.
              </p>
              <Link to="/about" className="btn btn-gold">Learn More About Us</Link>
            </div>

            <div className="why-pillars animate from-right">
              {pillars.map((p) => (
                <div key={p.title} className="pillar-card">
                  <span className="pillar-icon">{p.icon}</span>
                  <div className="pillar-title">{p.title}</div>
                  <p className="pillar-text">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA Banner ═══════════════════════════════════ */}
      <div className="cta-banner">
        <div className="cta-banner-inner animate">
          <p className="label">Ready to Begin?</p>
          <div className="ornament center" style={{ margin:'12px auto 20px' }}>
            <div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line right" />
          </div>
          <h2 className="heading" style={{ marginBottom:'16px' }}>
            Build Your <span className="gradient-text">Legacy</span> with Us
          </h2>
          <p className="subheading" style={{ marginBottom:'32px' }}>
            Our team of advisors is ready to craft your bespoke financial strategy.
          </p>
          <Link to="/contact" className="btn btn-gold btn-lg">Contact Our Team</Link>
        </div>
      </div>
    </>
  );
}
