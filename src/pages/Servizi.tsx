import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { services } from '../data/services'

export default function Servizi() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    }
  }, [hash])

  return (
    <>
      <section className="glow-bg border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle
            eyebrow="Servizi"
            title="Tutto ciò che serve per il tuo prodotto digitale"
            subtitle="Dall'AI Generativa alle app native, un unico partner per progettare, sviluppare e far crescere la tua soluzione."
            align="left"
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-slate-300 transition hover:border-accent hover:text-accent"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-20">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className="card scroll-mt-24 grid gap-8 md:grid-cols-[1fr_1.4fr] md:p-10"
          >
            <div>
              <div className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-2/20">
                <s.icon className="text-accent" size={28} />
              </div>
              <p className="mt-6 font-mono text-xs text-slate-500">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">{s.title}</h2>
              <p className="mt-3 text-slate-400">{s.description}</p>
            </div>
            <div className="flex flex-col justify-between">
              <ul className="grid gap-3 sm:grid-cols-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={16} />
                    {b}
                  </li>
                ))}
              </ul>
              <Link to="/contatti" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Richiedi un preventivo <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
