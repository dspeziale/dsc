import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated || false;
  const logout = auth?.logout || (() => { });

  const handleLogout = () => {
    setIsMenuOpen(false);
    navigate('/');
    setTimeout(() => {
      logout();
    }, 50);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/servizi', label: 'Solutions' },
    { path: '/progetti', label: 'Projects' },
    { path: '/ai-security', label: 'Advisory' },
    { path: '/contatti', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
      isScrolled ? 'bg-surface/90 backdrop-blur-xl shadow-2xl' : 'bg-surface/50 backdrop-blur-xl'
    }`}>
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <Link to="/" className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface hover:text-primary transition-all duration-300">
          Daniele Speziale
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-all duration-300 active:scale-95 ${
                isActive(item.path)
                  ? 'text-primary font-bold border-b-2 border-primary pb-1 font-title-md'
                  : 'text-on-surface-variant font-medium font-title-md hover:text-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to="/admin/dashboard"
              className={`transition-all duration-300 active:scale-95 ${
                isActive('/admin/dashboard')
                  ? 'text-primary font-bold border-b-2 border-primary pb-1 font-title-md'
                  : 'text-on-surface-variant font-medium font-title-md hover:text-primary'
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Trailing Action */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-error text-on-error px-6 py-2 rounded font-label-mono text-label-mono hover:bg-error-container transition-colors active:scale-95"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/contatti"
              className="bg-primary text-on-primary px-6 py-2 rounded font-label-mono text-label-mono hover:bg-primary-container transition-colors active:scale-95"
            >
              Contact
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined text-[32px]">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface-container-low backdrop-blur-lg border-t border-white/10">
          <div className="flex flex-col p-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-title-md transition-all duration-300 ${
                  isActive(item.path) ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={`font-title-md transition-all duration-300 ${
                  isActive('/admin/dashboard') ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'
                }`}
              >
                Dashboard
              </Link>
            )}
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-on-surface-variant font-medium font-title-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

