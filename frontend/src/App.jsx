import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import SmartConnect from './pages/SmartConnect';
import FNB from './pages/FNB';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function AppInner() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const authPage = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="app">
      <BackgroundCanvas />
      {!authPage && <Navbar />}
      <main key={location.pathname} className="page-enter">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/services"    element={<Services />} />
          <Route path="/about"       element={<About />} />
          <Route path="/smart-connect" element={<SmartConnect />} />
          <Route path="/fnb"         element={<FNB />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/signup"      element={<Signup />} />
          <Route path="/dashboard"   element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
        </Routes>
      </main>
      {!authPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  );
}
