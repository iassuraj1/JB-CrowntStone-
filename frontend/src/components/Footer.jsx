import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Casa' },
  { to: '/services', label: 'Servizi' },
  { to: '/about', label: 'Chi Siamo' },
  { to: '/smart-connect', label: 'Connessione Intelligente' },
  { to: '/fnb', label: 'Food & Beverage' },
  { to: '/contact', label: 'Contatto' },
];

const services = [
  'Immobiliare e Consulenza',
  'Prestiti in Oro',
  'Gestione Patrimoniale (Dubai)',
  'Piattaforma Smart Connect',
  'Ristorazione & F&B',
];

export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-name">JB CROWNSTONE</div>
            <div className="footer-brand-tagline">Gestione Patrimoniale &amp; Ricchezza Privata</div>
            <p className="footer-brand-desc">
              Una società di gestione patrimoniale privata dedicata a fornire strategie
              di investimento di livello istituzionale a clienti privati e family office
              selezionati in tutto il mondo.
            </p>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Navigazione</div>
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Servizi</div>
            <ul>
              {services.map((s) => (
                <li key={s}>
                  <Link to="/services">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Contatto</div>
            <ul>
              <li>
                <a href="mailto:admin@jbcrownstone.com">admin@jbcrownstone.com</a>
              </li>
              <li>
                <span style={{ color: 'rgba(255,255,255,0.45)' }}>Dubai (Prossimamente)</span>
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
          © 2024 JB Crownstone. Tutti i diritti riservati. Gli investimenti comportano rischi.
        </span>
        <span className="footer-est">FONDATO NEL 2021</span>
      </div>
    </footer>
  );
}
