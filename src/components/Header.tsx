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
    { path: '/servizi', label: 'Services' },
    { path: '/progetti', label: 'Projects' },
    { path: '/ai-security', label: 'AI & Security' },
    { path: '/chi-siamo', label: 'About Us' },
    { path: '/contatti', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0b1326]/80 backdrop-blur-md shadow-2xl' : 'bg-[#0b1326]/40 backdrop-blur-sm'
    }`}>
      <div className="flex justify-between items-center px-8 py-4 w-full max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-black text-slate-100 tracking-tighter font-headline">
          DSC Italy
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-headline font-bold tracking-tight transition-all duration-300 pb-1 border-b-2 ${
                isActive(item.path)
                  ? 'text-orange-500 border-orange-500'
                  : 'text-slate-400 border-transparent hover:text-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && (
             <Link
             to="/admin/dashboard"
             className={`font-headline font-bold tracking-tight transition-all duration-300 pb-1 border-b-2 ${
               isActive('/admin/dashboard')
                 ? 'text-orange-500 border-orange-500'
                 : 'text-slate-400 border-transparent hover:text-slate-100'
             }`}
           >
             Dashboard
           </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-br from-error-container to-error text-on-error-container px-6 py-2 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-br from-primary-container to-primary text-on-primary-container px-6 py-2 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all duration-300"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0b1326]/95 backdrop-blur-lg border-t border-slate-800">
          <div className="flex flex-col p-8 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-headline font-bold text-xl tracking-tight transition-all duration-300 ${
                  isActive(item.path) ? 'text-orange-500' : 'text-slate-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={`font-headline font-bold text-xl tracking-tight transition-all duration-300 ${
                  isActive('/admin/dashboard') ? 'text-orange-500' : 'text-slate-400'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
