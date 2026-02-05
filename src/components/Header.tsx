import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Safely get auth context with fallback
  let isAuthenticated = false;
  try {
    const auth = useAuth();
    isAuthenticated = auth?.isAuthenticated || false;
  } catch (error) {
    // AuthContext not available, user not authenticated
    isAuthenticated = false;
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/servizi', label: 'Servizi' },
    { path: '/chi-siamo', label: 'Chi Siamo' },
    { path: '/progetti', label: 'Progetti' },
    { path: '/contatti', label: 'Contatti' },
  ];

  // Add Admin link if authenticated, Login link if not
  const allNavItems = isAuthenticated
    ? [...navItems, { path: '/admin', label: 'Admin', icon: Shield }]
    : [...navItems, { path: '/login', label: 'Login', icon: Shield }];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
              DS
            </span>
            <span className="text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">Consulting</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {allNavItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`font-bold uppercase tracking-wide text-sm transition-colors duration-300 relative group ${isActive(item.path)
                      ? 'text-accent'
                      : 'text-gray-700 hover:text-accent'
                      }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-primary hover:text-accent transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
            }`}
        >
          <ul className="flex flex-col gap-4 pt-4">
            {allNavItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-bold uppercase tracking-wide text-sm transition-colors duration-300 ${isActive(item.path)
                    ? 'text-accent'
                    : 'text-gray-700 hover:text-accent'
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
