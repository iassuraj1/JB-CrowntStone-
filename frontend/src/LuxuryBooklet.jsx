import React from 'react';
import './LuxuryBooklet.css';

const Page = ({ number, children, className = "" }) => (
  <section className={`page ${className}`}>
    <div className="page-number">{String(number).padStart(2, '0')}</div>
    {children}
  </section>
);

const LuxuryBooklet = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="booklet-container">
      <button className="print-button" onClick={handlePrint}>
        EXPORT AS PDF
      </button>

      {/* PAGE 1: COVER */}
      <Page number={1} className="page-cover">
        <img src="/.png" alt="JB Crownstone Logo" className="cover-logo" />
        <h1 className="title-large gold-text">Curated Luxury Real Estate Platform</h1>
        <p className="subtitle">India’s Premium Property Exchange</p>
      </Page>

      {/* PAGE 2: IDEA IN ONE LINE */}
      <Page number={2}>
        <h2 className="subtitle-medium">What is This Business?</h2>
        <div className="content-body">
          <p style={{ fontSize: '32px', lineHeight: '1.4', marginTop: '40px' }} className="gold-text">
            We sell premium properties like luxury products.
          </p>
          <p style={{ fontSize: '24px', fontWeight: '300' }}>
            Only the best properties. No clutter. No brokers. Just curated deals.
          </p>
        </div>
      </Page>

      {/* PAGE 3: THE PROBLEM */}
      <Page number={3}>
        <h2 className="subtitle-medium">Problem</h2>
        <ul className="bullet-list">
          <li>Too many fake / bad listings</li>
          <li>Too many brokers</li>
          <li>No trust</li>
          <li>Buyers get confused</li>
          <li>Good properties are hard to find</li>
        </ul>
      </Page>

      {/* PAGE 4: THE SOLUTION */}
      <Page number={4}>
        <h2 className="subtitle-medium">Solution</h2>
        <ul className="bullet-list">
          <li>Only 20–30 premium properties at a time</li>
          <li>All verified</li>
          <li>Easy to understand</li>
          <li>Direct buying experience</li>
          <li>Clean and simple platform</li>
        </ul>
      </Page>

      {/* PAGE 5: HOW WE SELECT PROPERTIES */}
      <Page number={5}>
        <h2 className="subtitle-medium">Property Selection</h2>
        <ul className="bullet-list">
          <li>Only ₹3 Crore+ properties</li>
          <li>Only high-demand locations</li>
          <li>Only fast-selling inventory</li>
          <li>Only premium/luxury quality</li>
        </ul>
      </Page>

      {/* PAGE 6: HOW WE TAKE CONTROL */}
      <Page number={6}>
        <h2 className="subtitle-medium">Deal Model</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">01</div>
            <div className="stat-label">Agreement Model</div>
            <p className="content-body" style={{ fontSize: '14px', marginTop: '10px' }}>
              We take exclusive rights to sell property in 2–3 months.
            </p>
          </div>
          <div className="stat-item">
            <div className="stat-value">02</div>
            <div className="stat-label">Token Model</div>
            <p className="content-body" style={{ fontSize: '14px', marginTop: '10px' }}>
              For very good deals, we give token and lock price.
            </p>
          </div>
        </div>
      </Page>

      {/* PAGE 7: HOW WE SELL */}
      <Page number={7}>
        <h2 className="subtitle-medium">Selling Process</h2>
        <div className="content-body">
          <div className="stat-item" style={{ marginBottom: '30px' }}>
            <span className="gold-text">Phase 1:</span> Show to exclusive investors first.
          </div>
          <div className="stat-item" style={{ marginBottom: '30px' }}>
            <span className="gold-text">Phase 2:</span> Market to premium buyers.
          </div>
          <div className="stat-item">
            <span className="gold-text">Goal:</span> Complete transactions within 30–60 days. Fast and smooth.
          </div>
        </div>
      </Page>

      {/* PAGE 8: HOW WE MAKE MONEY */}
      <Page number={8}>
        <h2 className="subtitle-medium">Revenue</h2>
        <ul className="bullet-list">
          <li>1–2% direct commission</li>
          <li>Extra margin on exclusive good deals</li>
          <li>Investor resale profit sharing</li>
        </ul>
      </Page>

      {/* PAGE 9: MONTHLY PLAN */}
      <Page number={9}>
        <h2 className="subtitle-medium">Execution Plan</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">30</div>
            <div className="stat-label">Live Properties</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">5-6</div>
            <div className="stat-label">Sales per month</div>
          </div>
        </div>
        <p className="content-body" style={{ marginTop: '40px' }}>
          Continuous rotation of inventory ensures freshness and exclusivity.
        </p>
      </Page>

      {/* PAGE 10: YEARLY NUMBERS */}
      <Page number={10}>
        <h2 className="subtitle-medium">Business Numbers</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">60</div>
            <div className="stat-label">Properties / Year</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">₹180 Cr</div>
            <div className="stat-label">Total Sales Volume</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">10-15%</div>
            <div className="stat-label">Estimated Profit Margin</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">₹18-25 Cr</div>
            <div className="stat-label">Annual Profit Goal</div>
          </div>
        </div>
      </Page>

      {/* PAGE 11: BUYER TYPES */}
      <Page number={11}>
        <h2 className="subtitle-medium">Our Buyers</h2>
        <div className="content-body">
          <div style={{ marginBottom: '20px' }}>
            <span className="gold-text">End Users:</span> Looking for a dream home without the broker headache.
          </div>
          <div style={{ marginBottom: '20px' }}>
            <span className="gold-text">Investors:</span> Seeking verified, high-growth assets.
          </div>
          <div>
            <span className="gold-text">NRIs:</span> Trusting a platform that handles everything transparently.
          </div>
        </div>
      </Page>

      {/* PAGE 12: APP CONCEPT */}
      <Page number={12}>
        <h2 className="subtitle-medium">The App</h2>
        <div style={{ 
          height: '400px', 
          border: '1px solid var(--color-gold-muted)', 
          marginTop: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(45deg, #050505, #111)'
        }}>
          <div className="gold-text" style={{ fontSize: '24px' }}>Minimal Interface</div>
          <div style={{ color: 'var(--color-text-dim)', fontSize: '14px', letterSpacing: '2px' }}>EXCLUSIVITY BY DESIGN</div>
        </div>
        <ul className="bullet-list">
          <li>Clean interface</li>
          <li>Limited listings</li>
          <li>Easy contact</li>
        </ul>
      </Page>

      {/* PAGE 13: BRAND STRATEGY */}
      <Page number={13}>
        <h2 className="subtitle-medium">Brand</h2>
        <ul className="bullet-list">
          <li>Luxury aesthetic and tone</li>
          <li>Premium high-fidelity content</li>
          <li>Cinematic video tours</li>
          <li>Exclusive "Invitation Only" feel</li>
        </ul>
      </Page>

      {/* PAGE 14: WHY WE WIN */}
      <Page number={14}>
        <h2 className="subtitle-medium">Our Advantage</h2>
        <ul className="bullet-list">
          <li>Limited Inventory = Higher Focus</li>
          <li>Better Quality = Higher Trust</li>
          <li>Faster Selling = Better Cashflow</li>
          <li>High Trust = Repeat Business</li>
        </ul>
      </Page>

      {/* PAGE 15: RISK CONTROL */}
      <Page number={15}>
        <h2 className="subtitle-medium">Risk Management</h2>
        <ul className="bullet-list">
          <li>Only vetted, high-demand deals</li>
          <li>Limited capital exposure</li>
          <li>Backing from established investors</li>
          <li>Pre-identified buyer pool</li>
        </ul>
      </Page>

      {/* PAGE 16: SCALE PLAN */}
      <Page number={16}>
        <h2 className="subtitle-medium">Growth</h2>
        <div className="content-body">
          <p className="gold-text">Phase 1: Local Dominance</p>
          <p style={{ fontSize: '14px', marginBottom: '30px' }}>Start with one high-premium area.</p>
          
          <p className="gold-text">Phase 2: Regional Expansion</p>
          <p style={{ fontSize: '14px', marginBottom: '30px' }}>Expand to multiple luxury locations.</p>
          
          <p className="gold-text">Phase 3: National Presence</p>
          <p style={{ fontSize: '14px' }}>Establish as India's premier property exchange.</p>
        </div>
      </Page>

      {/* PAGE 17: VALUATION GOAL */}
      <Page number={17}>
        <h2 className="subtitle-medium">Target</h2>
        <div className="content-body" style={{ textAlign: 'center', marginTop: '100px' }}>
          <div className="gold-text" style={{ fontSize: '64px' }}>₹100 Crore</div>
          <div style={{ fontSize: '18px', letterSpacing: '4px', textTransform: 'uppercase' }}>Valuation Target</div>
          <p style={{ marginTop: '40px', fontWeight: '300' }}>
            Built on strong deals + brand authority + systemic scalability.
          </p>
        </div>
      </Page>

      {/* PAGE 18: FINAL PAGE */}
      <Page number={18} className="page-cover">
        <img src="/.png" alt="JB Crownstone Logo" className="cover-logo" style={{ width: '80px', marginBottom: '20px' }} />
        <h2 className="subtitle-medium">Vision</h2>
        <div className="content-body" style={{ fontSize: '24px', fontStyle: 'italic' }}>
          "We are building the most trusted and premium real estate platform in India."
        </div>
        <div style={{ marginTop: '100px', height: '1px', width: '100px', backgroundColor: 'var(--color-gold)', margin: '100px auto' }}></div>
      </Page>
    </div>
  );
};

export default LuxuryBooklet;
