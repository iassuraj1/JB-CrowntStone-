import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const metrics = [
  { label: 'Portfolio Value',  value: '-',      note: 'Pending advisor review' },
  { label: 'Active Services',  value: '0',       note: 'No active services yet' },
  { label: 'Open Enquiries',   value: '0',       note: 'All enquiries resolved' },
  { label: 'Member Since',     value: null,      note: '' },
];

const quickLinks = [
  { label: 'Real Estate & Advisory', href: 'http://www.jbcrownstone.com:8080/', external: true },
  { label: 'Send an Enquiry',        href: '/contact' },
  { label: 'Our Services',           href: '/services' },
  { label: 'About JB Crownstone',   href: '/about' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const joined = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
    : '-';

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <div>
            <p className="dashboard-eyebrow">Private Client Dashboard</p>
            <h1 className="dashboard-title">Welcome, {user?.name?.split(' ')[0]}</h1>
            <p className="dashboard-sub">{user?.email}</p>
          </div>
          <button className="btn btn-outline" onClick={handleLogout}>Sign Out</button>
        </div>
      </div>

      <div className="dashboard-body">
        {/* Metrics */}
        <div className="dashboard-metrics">
          {metrics.map((m) => (
            <div key={m.label} className="dash-metric">
              <span className="dash-metric-label">{m.label}</span>
              <span className="dash-metric-value">
                {m.label === 'Member Since' ? joined : m.value}
              </span>
              {m.label !== 'Member Since' && (
                <span className="dash-metric-note">{m.note}</span>
              )}
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          {/* Account Info */}
          <div className="dash-card">
            <h2 className="dash-card-title">Account Details</h2>
            <div className="dash-info-row"><span>Name</span><span>{user?.name}</span></div>
            <div className="dash-info-row"><span>Email</span><span>{user?.email}</span></div>
            <div className="dash-info-row"><span>Status</span><span className="dash-badge">Active</span></div>
            <div className="dash-info-row"><span>Member Since</span><span>{joined}</span></div>
          </div>

          {/* Quick Links */}
          <div className="dash-card">
            <h2 className="dash-card-title">Quick Access</h2>
            <div className="dash-links">
              {quickLinks.map((l) =>
                l.external ? (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="dash-link">
                    {l.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 10L10 2M5 2h5v5" /></svg>
                  </a>
                ) : (
                  <a key={l.label} href={l.href} className="dash-link">
                    {l.label}
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 5h10M6 1l4 4-4 4" /></svg>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Notice */}
          <div className="dash-card dash-card-notice">
            <div className="dash-notice-icon">JB</div>
            <h3>Your Advisor Will Be In Touch</h3>
            <p>
              A dedicated JB Crownstone relationship manager will contact you within
              24 hours to discuss your private wealth strategy.
            </p>
            <a href="/contact" className="btn btn-gold" style={{ marginTop: '20px', display: 'inline-block' }}>
              Contact an Advisor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
