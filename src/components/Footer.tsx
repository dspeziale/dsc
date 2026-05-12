import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-stack-lg bg-surface-container-lowest border-t border-outline-variant mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="col-span-1 lg:col-span-2">
          <div className="font-headline-lg text-headline-lg text-on-surface mb-stack-sm">
            Daniele Speziale
          </div>
          <div className="font-body-md text-body-md text-on-surface-variant">
            © {currentYear} Daniele Speziale. Principal AI Architect.
          </div>
        </div>
        <div className="flex flex-col gap-unit">
          <div className="font-label-mono text-label-mono text-primary uppercase tracking-widest mb-2">Connect</div>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">LinkedIn</a>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" href="#">GitHub</a>
        </div>
        <div className="flex flex-col gap-unit">
          <div className="font-label-mono text-label-mono text-primary uppercase tracking-widest mb-2">Engage</div>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" to="/servizi">Expertise</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100" to="/contatti">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

