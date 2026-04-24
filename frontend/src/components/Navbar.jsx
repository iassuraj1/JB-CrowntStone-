import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/smart-connect', label: 'Smart Connect' },
  { to: '/fnb', label: 'F&B' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate  = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          <img src="/shield_jb_logo.png" alt="JB Crownstone" className="nav-logo-img" />
          <div>
            <span className="nav-brand-text">JB Crownstone</span>
            <span className="nav-tagline">Private Wealth &amp; Asset Management</span>
          </div>
        </Link>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end}
                className={({ isActive }) => (isActive ? 'active' : '')}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-outline">
                {user.name.split(' ')[0]}'s Portal
              </Link>
              <button className="btn btn-primary" onClick={handleLogout}>Sign Out</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline">Login</Link>
          )}
          <button className="nav-hamburger" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
            <span className={mobileOpen ? 'open' : ''} />
            <span className={mobileOpen ? 'open' : ''} />
            <span className={mobileOpen ? 'open' : ''} />
          </button>
        </div>
      </div>

      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end}
            className={({ isActive }) => (isActive ? 'active' : '')}>
            {link.label}
          </NavLink>
        ))}
        {user ? (
          <>
            <Link to="/dashboard">My Dashboard</Link>
            <button onClick={handleLogout} style={{ background:'none', border:'none', color:'inherit', cursor:'pointer', textAlign:'left', padding:'12px 24px', fontSize:'inherit' }}>Sign Out</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
