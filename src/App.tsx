import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Servizi from './pages/Servizi';
import ChiSiamo from './pages/ChiSiamo';
import Progetti from './pages/Progetti';
import Contatti from './pages/Contatti';
import Login from './pages/Login';
import Admin from './pages/Admin';

// Component to log visits on route change
function VisitLogger() {
  const location = useLocation();

  useEffect(() => {
    const logVisit = async () => {
      try {
        await fetch('/api/log-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: location.pathname,
          }),
        });
      } catch (error) {
        // Silently fail - don't block user experience
        console.debug('Visit logging failed:', error);
      }
    };

    logVisit();
  }, [location.pathname]);

  return null;
}

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <VisitLogger />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/progetti" element={<Progetti />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
