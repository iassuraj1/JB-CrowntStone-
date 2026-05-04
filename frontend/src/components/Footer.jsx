import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About Us' },
  { to: '/smart-connect', label: 'Smart Connection' },
  { to: '/fnb', label: 'Food & Beverage' },
  { to: '/contact', label: 'Contact' },
];

const services = [
  'Real Estate & Consulting',
  'Gold Loans',
  'Wealth Management (Dubai)',
  'Smart Connect Platform',
  'Restaurants & F&B',
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-name">JB CROWNSTONE</div>
            <div className="footer-brand-tagline">Wealth Management &amp; Private Wealth</div>
            <p className="footer-brand-desc">
              A private wealth management firm dedicated to providing institutional-grade
              investment strategies to select private clients and family offices
              around the world.
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Navigation</div>
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <ul>
              {services.map((s) => (
                <li key={s}>
                  <Link to="/services">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <ul>
              <li>
                <a href="mailto:admin@jbcrownstone.com">admin@jbcrownstone.com</a>
              </li>
              <li>
                <span style={{ color: 'rgba(255,255,255,0.45)' }}>Dubai (Coming Soon)</span>
              </li>
              <li>
                <a href="https://jbcrownstone.com" target="_blank" rel="noreferrer">
                  jbcrownstone.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">
          © 2024 JB Crownstone. All rights reserved. Investments involve risks.
        </span>
        <span className="footer-est">FOUNDED IN 2021</span>
      </div>
    </footer>
  );
}
