import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const contactItems = [
  {
    label: 'Email',
    value: 'admin@jbcrownstone.com',
    link: 'mailto:admin@jbcrownstone.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
        <path d="M2 6l8 5 8-5" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: 'Contact us for details',
    link: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 5a2 2 0 012-2h1.5l2 4.5-1.5 1.5a11 11 0 005 5l1.5-1.5L18 14.5V16a2 2 0 01-2 2C7.6 18 2 12.4 2 5a2 2 0 011-1.7L3 5z" />
      </svg>
    ),
  },
  {
    label: 'Offices',
    value: 'Global / Dubai (Coming Soon)',
    link: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="8" r="3" />
        <path d="M10 2C6.7 2 4 4.7 4 8c0 5 6 10 6 10s6-5 6-10c0-3.3-2.7-6-6-6z" />
      </svg>
    ),
  },
  // {
  //   label: 'Web',
  //   value: 'jbcrownstone.com',
  //   link: 'https://jbcrownstone.com',
  //   icon: (
  //     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
  //       <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" />
  //       <path d="M10 2c-2 2.5-3 5-3 8s1 5.5 3 8M10 2c2 2.5 3 5 3 8s-1 5.5-3 8M2 10h16" />
  //     </svg>
  //   ),
  // },
];

export default function Contact() {
  useScrollAnimation();

  const [formState, setFormState] = useState({
    status: 'idle',
    buttonText: 'Send Enquiry',
    disabled: false,
    error: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ status: 'sending', buttonText: 'Sending...', disabled: true, error: '' });

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      service: e.target.service.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      let json = {};
      try { json = await res.json(); } catch { /* empty body */ }
      if (!res.ok) throw new Error(json.error || 'Server error - is the backend running?');
      setFormState({ status: 'sent', buttonText: "Sent - We'll be in touch", disabled: true, error: '' });
      setTimeout(() => {
        setFormState({ status: 'idle', buttonText: 'Send Enquiry', disabled: false, error: '' });
        e.target.reset();
      }, 3000);
    } catch (err) {
      setFormState({ status: 'idle', buttonText: 'Send Enquiry', disabled: false, error: err.message });
    }
  };

  return (
    <>
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="page-hero-label animate">Get In Touch</p>
          <h1 className="page-hero-title animate delay-1">
            Contact <span>Us</span>
          </h1>
          <p className="page-hero-desc animate delay-2">
            Ready to elevate your wealth? Our team of advisors is available to discuss
            your bespoke financial strategy.
          </p>
        </div>
      </div>

      {/* ── Contact Grid ── */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="animate from-left">
              <p className="label" style={{ marginBottom: '8px' }}>Reach Us</p>
              <div className="ornament left" style={{ marginBottom: '32px' }}>
                <div className="ornament-line" />
                <div className="ornament-diamond" />
                <div className="ornament-line right" />
              </div>

              {contactItems.map((item) => (
                <div key={item.label} className="contact-item">
                  <div className="contact-icon-box">{item.icon}</div>
                  <div>
                    <div className="contact-item-label">{item.label}</div>
                    <div className="contact-item-value">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="contact-note">
                <p>
                  We typically respond within 24 hours. For urgent matters, please
                  reach out via email directly.
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              className="contact-form animate from-right"
              onSubmit={handleSubmit}
            >
              <h3 className="contact-form-title">Send an Enquiry</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input name="name" type="text" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>Service Interest</label>
                <select name="service" required>
                  <option value="">Select a service...</option>
                  <option>Real Estate &amp; Advisory</option>
                  <option>Gold Loans</option>
                  <option>Asset Management (Dubai)</option>
                  <option>Smart Connect</option>
                  <option>Hospitalities</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" placeholder="Tell us about your goals..." />
              </div>

              {formState.error && (
                <p style={{ color: '#f87171', fontSize: '14px', margin: 0 }}>{formState.error}</p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={formState.disabled}
                style={{ alignSelf: 'flex-start', padding: '14px 32px' }}
              >
                {formState.buttonText}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
