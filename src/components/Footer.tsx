import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-3xl font-bold group-hover:text-accent transition-colors duration-300">
                DS
              </span>
              <span className="text-xl font-normal text-gray-300">Consulting</span>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Soluzioni software innovative per far crescere il tuo business.
              Sviluppo web, mobile e hardware su misura.
            </p>
            {/* Social Media */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Link Rapidi</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-accent transition-colors duration-300 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/servizi"
                  className="text-gray-300 hover:text-accent transition-colors duration-300 inline-block"
                >
                  Servizi
                </Link>
              </li>
              <li>
                <Link
                  to="/chi-siamo"
                  className="text-gray-300 hover:text-accent transition-colors duration-300 inline-block"
                >
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link
                  to="/contatti"
                  className="text-gray-300 hover:text-accent transition-colors duration-300 inline-block"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Servizi</h4>
            <ul className="space-y-3 text-gray-300">
              <li>Sviluppo Web</li>
              <li>App Mobile</li>
              <li>Soluzioni Hardware</li>
              <li>Consulenza IT</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contatti</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span className="break-words">dsconsulting.italy@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>+39 352 015 0489</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Via Carlo Arturo Jemolo, 283, Roma</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-bold mb-3 text-white">Resta Aggiornato</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Iscriviti alla newsletter per ricevere aggiornamenti e novità
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors duration-300"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-accent hover:bg-accent-light rounded-lg font-bold transition-colors duration-300"
              >
                Iscriviti
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} DS Consulting. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
