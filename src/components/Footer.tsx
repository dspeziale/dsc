import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-text">DS</span>
              <span className="logo-subtext">Consulting</span>
            </Link>
            <p className="footer-description">
              Soluzioni software innovative per far crescere il tuo business.
              Sviluppo web, mobile e hardware su misura.
            </p>
          </div>

          <div className="footer-links">
            <h4>Link Rapidi</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/servizi">Servizi</Link></li>
              <li><Link to="/chi-siamo">Chi Siamo</Link></li>
              <li><Link to="/contatti">Contatti</Link></li>
            </ul>
          </div>

          <div className="footer-services">
            <h4>Servizi</h4>
            <ul>
              <li>Sviluppo Web</li>
              <li>App Mobile</li>
              <li>Soluzioni Hardware</li>
              <li>Consulenza IT</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contatti</h4>
            <ul>
              <li>
                <Mail size={18} />
                <span>info@dsconsulting.it</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+39 123 456 7890</span>
              </li>
              <li>
                <MapPin size={18} />
                <span>Via Roma 123, Milano</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} DS Consulting. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
