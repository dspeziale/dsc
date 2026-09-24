import { Link } from 'react-router-dom'
import { Mail, MapPin } from 'lucide-react'
import { navLinks, site } from '../data/site'
import { services } from '../data/services'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-ink-soft/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-lg font-bold text-white">{site.name}</p>
          <p className="mt-3 max-w-md text-sm text-slate-400">
            Soluzioni di AI Generativa e sviluppo software su misura: web, Android, iOS e
            Single Page Application. Dal {site.founded} accompagniamo aziende e professionisti
            nella trasformazione digitale.
          </p>
          <div className="mt-5 space-y-2 text-sm text-slate-400">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-accent">
              <Mail size={16} /> {site.email}
            </a>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {site.address}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Servizi</p>
          <ul className="space-y-2 text-sm text-slate-400">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/servizi#${s.slug}`} className="hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-white">Azienda</p>
          <ul className="space-y-2 text-sm text-slate-400">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {year} {site.name}. Tutti i diritti riservati.
      </div>
    </footer>
  )
}
