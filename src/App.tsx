import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Servizi from './pages/Servizi';
import ChiSiamo from './pages/ChiSiamo';
import Progetti from './pages/Progetti';
import Contatti from './pages/Contatti';

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
  return (
    <Router>
      <VisitLogger />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servizi" element={<Servizi />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/progetti" element={<Progetti />} />
        <Route path="/contatti" element={<Contatti />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
