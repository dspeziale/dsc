import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitor-count');
        const data = await response.json();
        if (response.ok) {
          setVisitorCount(data.count);
        }
      } catch (error) {
        console.debug('Failed to fetch visitor count:', error);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <footer className="bg-[#0f172a] w-full border-t border-emerald-500/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 max-w-7xl mx-auto">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="text-xl font-bold text-white font-headline flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-[10px]">DSC</span>
            DSC Italy
          </div>
          <p className="text-slate-400 font-body text-sm leading-relaxed max-w-xs">
            Curating digital excellence and innovative hardware solutions since 2014. Professional consulting for ambitious brands.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors">public</span>
            <span className="material-symbols-outlined text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors">diversity_3</span>
            <span className="material-symbols-outlined text-slate-500 hover:text-emerald-400 cursor-pointer transition-colors">terminal</span>
          </div>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="font-bold mb-6 font-headline text-emerald-400 uppercase text-xs tracking-widest">Services</h4>
          <ul className="space-y-4">
            <li><Link className="text-slate-400 hover:text-white text-sm hover:translate-x-1 transition-transform duration-200 inline-block" to="/servizi">Web Development</Link></li>
            <li><Link className="text-slate-400 hover:text-white text-sm hover:translate-x-1 transition-transform duration-200 inline-block" to="/servizi">Mobile Apps</Link></li>
            <li><Link className="text-slate-400 hover:text-white text-sm hover:translate-x-1 transition-transform duration-200 inline-block" to="/servizi">Hardware IoT</Link></li>
            <li><Link className="text-slate-400 hover:text-white text-sm hover:translate-x-1 transition-transform duration-200 inline-block" to="/servizi">Agentic AI Solutions</Link></li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-bold mb-6 font-headline text-emerald-400 uppercase text-xs tracking-widest">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link className="text-slate-400 hover:text-white text-sm hover:translate-x-1 transition-transform duration-200 inline-block" to="/progetti">Portfolio</Link></li>
            <li><Link className="text-slate-400 hover:text-white text-sm hover:translate-x-1 transition-transform duration-200 inline-block" to="/chi-siamo">About Us</Link></li>
            <li><Link className="text-slate-400 hover:text-white text-sm hover:translate-x-1 transition-transform duration-200 inline-block" to="/contatti">Contact</Link></li>
            <li><Link className="text-slate-400 hover:text-white text-sm hover:translate-x-1 transition-transform duration-200 inline-block" to="/login">Login</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-bold mb-6 font-headline text-emerald-400 uppercase text-xs tracking-widest">Contact</h4>
          <p className="text-slate-400 text-sm mb-2">info@dscitaly.com</p>
          <p className="text-slate-400 text-sm mb-6">+39 352 015 0489</p>
          <div className="flex items-center gap-4 text-emerald-400 font-semibold text-sm hover:text-emerald-300 cursor-pointer">
            LinkedIn <span className="material-symbols-outlined text-xs">open_in_new</span>
          </div>
          {visitorCount !== null && (
            <div className="mt-8 text-slate-500 text-[10px] uppercase tracking-wider">
              Network Pulse: <span className="text-emerald-400 font-bold">{visitorCount}</span> active units
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-slate-800/50 text-center">
        <p className="text-slate-500 font-body text-xs">
          © {currentYear} DSC Italy. Curating Digital Innovation for the Agentic Era.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
