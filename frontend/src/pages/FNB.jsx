import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const fnbOfferings = [
  {
    icon: 'VC',
    title: 'The Private Cellar',
    text: 'Access to an exclusive collection of rare vintages and limited-production spirits curated for the most discerning palates.',
    features: [
      'Rare vintage acquisitions',
      'Investment-grade cellar management',
      'Exclusive vineyard tours',
      'Private sommelier consultations'
    ]
  },
  {
    icon: 'CA',
    title: 'Culinary Artistry',
    text: 'Bespoke dining experiences featuring world-renowned Michelin-starred chefs in the comfort of your private residence.',
    features: [
      'Private chef placement',
      'Custom menu design',
      'Molecular gastronomy events',
      'Global ingredient sourcing'
    ]
  },
  {
    icon: 'ES',
    title: 'Elite Social Gatherings',
    text: 'Seamlessly executed high-profile events and private galas that set the standard for luxury hospitality.',
    features: [
      'Curated guest-list management',
      'Themed gastronomic journeys',
      'Immersive sensory experiences',
      'White-glove service standards'
    ]
  }
];

export default function FNB() {
  useScrollAnimation();

  return (
    <>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-label animate">Gourmet Excellence</p>
          <h1 className="page-hero-title animate delay-1">
            Food & <span>Beverage</span>
          </h1>
          <p className="page-hero-desc animate delay-2">
            Experience the pinnacle of culinary sophistication with bespoke gastronomic journeys 
            tailored to the refined lifestyle of our private clients.
          </p>
        </div>
      </div>

      {/* ── Visual Feature ── */}
      <section className="section no-padding-bottom">
        <div className="container">
          <div className="fnb-hero-visual animate">
            <div className="fnb-hero-bg" />
            <div className="fnb-hero-candles">
              <span className="fnb-candle" />
              <span className="fnb-candle" />
              <span className="fnb-candle" />
            </div>
            <div className="fnb-hero-text-center">
              <div className="fnb-hero-eyebrow">Est. 2021 / Private Collection</div>
              <div className="fnb-hero-headline">The Art of Dining</div>
              <div className="fnb-hero-sub">Where culinary mastery meets private luxury</div>
            </div>
            <div className="fnb-hero-overlay">
              <div className="fnb-hero-badge">Exclusive / Curated / Bespoke</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Offerings ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="label animate">Curated Experiences</p>
            <div className="ornament center animate delay-1">
              <div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line right" />
            </div>
            <h2 className="heading animate delay-1">Bespoke F&B Services</h2>
          </div>

          <div className="fnb-grid">
            {fnbOfferings.map((offering, i) => (
              <div key={offering.title} className={`fnb-card animate delay-${i + 1}`}>
                <div className="fnb-icon">{offering.icon}</div>
                <h3 className="fnb-title">{offering.title}</h3>
                <p className="fnb-text">{offering.text}</p>
                <ul className="fnb-list">
                  {offering.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rare Spirits Feature ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="fnb-split">
            <div className="animate from-left">
              <p className="label">The Collection</p>
              <h2 className="heading">Rare Spirits & Vintages</h2>
              <p className="subheading">
                Our procurement specialists source the world's most elusive beverages, from pre-prohibition whiskies to limited-run champagne magnums.
              </p>
              <div className="fnb-stat-bar">
                <div className="fnb-stat">
                  <span className="num">500+</span>
                  <span className="lab">Rare Labels</span>
                </div>
                <div className="fnb-stat">
                  <span className="num">12</span>
                  <span className="lab">Partner Vineyards</span>
                </div>
              </div>
              <Link to="/contact" className="btn btn-gold" style={{ marginTop: '32px' }}>Request Catalogue</Link>
            </div>
            <div className="animate from-right">
              <div className="fnb-visual-box">
                <div className="fnb-visual-glow" />
                <div className="fnb-visual-content">
                  <h3 className="gold-text">Membership Access</h3>
                  <p>Gain priority access to limited releases and private tasting events at our partner locations worldwide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-banner">
        <div className="cta-banner-inner animate">
          <p className="label">Begin Your Journey</p>
          <h2 className="heading" style={{ color: '#fff', marginBottom: '16px' }}>
            Elevate Your Culinary Portfolio
          </h2>
          <p className="subheading" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            Consult with our lifestyle managers to curate your next private dining experience.
          </p>
          <Link to="/contact" className="btn btn-gold btn-lg">Contact a Specialist</Link>
        </div>
      </div>
    </>
  );
}
