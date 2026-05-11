import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import ProtectedRoute from './components/ProtectedRoute';
import Services from './pages/Services';
import About from './pages/About';
import SmartConnect from './pages/SmartConnect';
import FNB from './pages/FNB';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JBours from './pages/JBours';

const Home = lazy(() => import('./pages/Home'));

function AppInner() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const currentPath = location.pathname.toLowerCase();
  const authPage = ['/login', '/signup'].includes(currentPath);
  const homePage = currentPath === '/';
  const standalonePage = authPage || currentPath.startsWith('/jbours');

  return (
    <div className={`app${homePage ? ' app-home' : ''}`}>
      {!standalonePage && !homePage && <BackgroundCanvas />}
      {!standalonePage && <Navbar />}
      <main key={location.pathname} className="page-enter">
        <Suspense fallback={<div className="route-loader">Loading experience...</div>}>
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
            <Route path="/JBours/*"     element={<JBours />} />
          </Routes>
        </Suspense>
      </main>
      {!standalonePage && <Footer />}
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
