import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm)
      return setError('Passwords do not match.');
    setLoading(true);
    try {
      const res  = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed.');
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/shield_jb_logo.png" alt="JB Crownstone" />
        </div>
        <p className="auth-eyebrow">Private Client Portal</p>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-sub">Join JB Crownstone's exclusive client network</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Full Name</label>
            <input name="name" type="text" value={form.name}
              onChange={handleChange} placeholder="Your full name" required />
          </div>
          <div className="auth-field">
            <label>Email Address</label>
            <input name="email" type="email" value={form.email}
              onChange={handleChange} placeholder="your@email.com" required />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input name="password" type="password" value={form.password}
              onChange={handleChange} placeholder="Minimum 6 characters" required />
          </div>
          <div className="auth-field">
            <label>Confirm Password</label>
            <input name="confirm" type="password" value={form.confirm}
              onChange={handleChange} placeholder="Repeat your password" required />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn btn-gold btn-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
