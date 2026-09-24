import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { projectCategories, projects } from '../data/projects'

export default function Progetti() {
  const [active, setActive] = useState('Tutti')
  const visible = active === 'Tutti' ? projects : projects.filter((p) => p.category === active)

  return (
    <>
      <section className="glow-bg border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle
            eyebrow="Progetti"
            title="Soluzioni che generano risultati"
            subtitle="Una selezione di progetti realizzati: ogni soluzione nasce da un problema concreto e si misura sui risultati ottenuti."
            align="left"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                active === c
                  ? 'border-accent bg-accent text-ink'
                  : 'border-white/15 text-slate-300 hover:border-accent hover:text-accent'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <article key={p.title} className="card flex flex-col">
              <p className="font-mono text-xs uppercase tracking-wider text-accent-2">{p.category}</p>
              <h2 className="mt-3 text-lg font-semibold text-white">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-slate-400">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="rounded-md bg-white/5 px-2 py-1 font-mono text-xs text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-5 border-t border-white/10 pt-4 text-sm font-medium text-accent">
                {p.results}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-400">Vuoi vedere il tuo progetto in questa pagina?</p>
          <Link to="/contatti" className="btn-primary mt-5">
            Parliamone <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
