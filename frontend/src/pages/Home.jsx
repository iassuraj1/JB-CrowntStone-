import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import AuroraCanvas from '../components/AuroraCanvas';
import HeroCanvas from '../components/HeroCanvas';

const SUBTITLE = 'Elevating Wealth, Defining Legacy.';

const services = [
  {
    icon: 'RE',
    badge: 'Active',
    title: 'Crownstone Private Wealth\nReal Estate & Advisory',
    desc: 'Exclusive opportunities and strategic investment advice in prime global real estate development.',
    href: 'http://www.jbcrownstone.com:8080/',
    external: true,
  },
  {
    icon: 'GLD',
    badge: 'Coming Soon',
    title: 'Crownstone\nGold Loans',
    desc: 'Unlocking asset value through secure, asset-backed gold financing.',
    href: '/contact',
  },
  {
    icon: 'AM',
    badge: 'Coming Soon',
    title: 'Crownstone Asset Management\n(Dubai)',
    desc: 'Regional expertise and specialized portfolio management in high-growth markets.',
    href: '/contact',
  },
];

const pillars = [
  { icon: 'TR', title: 'Trust & Integrity', text: 'Fiduciary-first approach to every client engagement.' },
  { icon: 'QA', title: 'Data-Driven', text: 'Quantitative models backed by deep fundamental research.' },
  { icon: 'GA', title: 'Global Access', text: 'Cross-border opportunities in real estate and commodities.' },
  { icon: 'LB', title: 'Legacy Building', text: 'Multi-generational strategies that protect your prosperity.' },
];

const heroStats = [
  { value: 2021, label: 'Established', note: 'Private wealth foundation' },
  { value: 4, suffix: '+', label: 'Divisions', note: 'Real estate, gold, asset management, F&B' },
  { text: 'India / UAE', label: 'Reach', note: 'Cross-border client access' },
];

const trustSignals = [
  { label: 'Mandate', value: 'Private Client Advisory' },
  { label: 'Signal', value: 'Data-Led Decisions' },
  { label: 'Standard', value: 'Discretion & Governance' },
];

function useTypewriter(text, speed = 55, startDelay = 1200) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplayed(text);
      setDone(true);
      return undefined;
    }

    let i = 0;
    let intervalId;

    const timerId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i += 1;
        } else {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function CountUp({ value, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplayValue(value);
      return undefined;
    }

    let frameId;
    const start = performance.now();
    const duration = 1300;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return <>{displayValue}{suffix}</>;
}

export default function Home() {
  useScrollAnimation();
  const { displayed: subtitle, done: subtitleDone } = useTypewriter(SUBTITLE);

  return (
    <>
      <section className="hero">
        <div className="hero-nebula" aria-hidden="true" />
        <AuroraCanvas />
        <HeroCanvas />
        <div className="hero-bg-pattern" aria-hidden="true" />
        <div className="hero-light-ring hero-light-ring-b" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-fold">
            <div className="hero-logo-wrap">
              <img
                src="/yo2.png"
                sizes="(max-width: 768px) 74vw, 430px"
                alt="JB Crownstone Logo"
                width="1254"
                height="1254"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>

            <p className="hero-eyebrow">Future-ready private wealth</p>

            <p className="hero-subtitle">
              {subtitle}
              {!subtitleDone && <span className="hero-cursor">|</span>}
            </p>

            <p className="hero-desc">
              A privately held wealth management firm delivering institutional-grade
              investment strategies to discerning private clients and family offices.
            </p>
          </div>

          <div className="hero-cta">
            <Link to="/services" className="btn btn-gold btn-lg">Explore Services</Link>
            <Link to="/about" className="btn btn-outline btn-lg">About Us</Link>
          </div>

          <div className="hero-stats">
            {heroStats.map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <span className="hero-stat-num">
                  {stat.text || <CountUp value={stat.value} suffix={stat.suffix} />}
                </span>
                <span className="hero-stat-label">{stat.label}</span>
                <span className="hero-stat-note">{stat.note}</span>
              </div>
            ))}
          </div>

          <div className="hero-trust-strip" aria-label="Trust signals">
            {trustSignals.map((signal) => (
              <div className="trust-signal" key={signal.label}>
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label animate">Our Portfolio</p>
            <div className="ornament center animate delay-1">
              <div className="ornament-line" />
              <div className="ornament-diamond" />
              <div className="ornament-line right" />
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
                  <div className="card-icon-box">{svc.icon}</div>
                  <span className={`badge ${isSoon ? 'badge-soon' : 'badge-gold'}`}>
                    {isSoon && <span className="badge-pulse-dot" />}{svc.badge}
                  </span>
                  <div className="card-title">{svc.title}</div>
                  <p className="card-desc">{svc.desc}</p>
                  <span className="card-link">
                    {isSoon ? 'Notify Me' : 'Learn More'}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 5h12M8 1l4 4-4 4" />
                    </svg>
                  </span>
                </>
              );

              return svc.external ? (
                <a
                  key={svc.title}
                  href={svc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`card animate delay-${i + 1}`}
                  style={{ display: 'block' }}
                >
                  {inner}
                </a>
              ) : (
                <div key={svc.title} className={`card animate delay-${i + 1}`}>{inner}</div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link to="/services" className="btn btn-outline animate delay-4">View All Services</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="why-grid">
            <div className="why-text animate from-left">
              <p className="label">Why Choose Us</p>
              <div className="ornament left">
                <div className="ornament-line" />
                <div className="ornament-diamond" />
                <div className="ornament-line right" />
              </div>
              <h2 className="heading" style={{ marginBottom: '16px' }}>
                Built on Trust,<br />Driven by Excellence
              </h2>
              <p className="subheading" style={{ marginBottom: '32px' }}>
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

      <div className="cta-banner">
        <div className="cta-banner-inner animate">
          <p className="label">Ready to Begin?</p>
          <div className="ornament center" style={{ margin: '12px auto 20px' }}>
            <div className="ornament-line" />
            <div className="ornament-diamond" />
            <div className="ornament-line right" />
          </div>
          <h2 className="heading" style={{ marginBottom: '16px' }}>
            Build Your <span className="gradient-text">Legacy</span> with Us
          </h2>
          <p className="subheading" style={{ marginBottom: '32px' }}>
            Our team of advisors is ready to craft your bespoke financial strategy.
          </p>
          <Link to="/contact" className="btn btn-gold btn-lg">Contact Our Team</Link>
        </div>
      </div>
    </>
  );
}
