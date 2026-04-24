import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jbc_token');
    const stored = localStorage.getItem('jbc_user');
    if (token && stored) {
      try { setUser(JSON.parse(stored)); } catch { logout(); }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('jbc_token', token);
    localStorage.setItem('jbc_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('jbc_token');
    localStorage.removeItem('jbc_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
