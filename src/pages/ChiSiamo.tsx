import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Handshake, ShieldCheck, Zap } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { site } from '../data/site'

const values = [
  {
    icon: Brain,
    title: 'AI con giudizio',
    desc: 'Usiamo l\'AI Generativa dove porta valore reale, con controllo umano e attenzione a costi, privacy e qualità.',
  },
  {
    icon: Zap,
    title: 'Concretezza',
    desc: 'Rilasci frequenti, obiettivi misurabili e nessuna tecnologia scelta per moda.',
  },
  {
    icon: ShieldCheck,
    title: 'Sicurezza',
    desc: 'Sviluppo sicuro, protezione dei dati e conformità GDPR in ogni progetto.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    desc: 'Non consegniamo e spariamo: restiamo al tuo fianco per far evolvere il prodotto.',
  },
]

const stack = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'Kotlin', 'Swift', 'Flutter',
  'PostgreSQL', 'Docker', 'LLM & RAG', 'Cloud AWS / Azure',
]

export default function ChiSiamo() {
  return (
    <>
      <section className="glow-bg border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle
            eyebrow="Chi siamo"
            title="Tecnologia artigianale, visione da AI"
            subtitle={`${site.name} nasce nel ${site.founded} dall'esperienza di ${site.founder} nello sviluppo software. Oggi unisce competenze consolidate su web e mobile alla specializzazione in Intelligenza Artificiale Generativa.`}
            align="left"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-12 px-4 py-20 md:grid-cols-2">
        <div className="space-y-5 text-slate-300">
          <h2 className="text-2xl font-bold text-white">La nostra storia</h2>
          <p>
            Siamo partiti sviluppando siti e applicazioni per piccole e medie imprese italiane,
            imparando che la tecnologia funziona solo quando risolve un problema concreto.
          </p>
          <p>
            Negli anni abbiamo costruito piattaforme web, app Android e iOS e Single Page
            Application per settori diversi: logistica, commercio, sanità, industria e servizi.
          </p>
          <p>
            Oggi la nostra specializzazione è l'AI Generativa: aiutiamo le aziende a integrare
            modelli linguistici nei processi reali, con soluzioni sicure, misurabili e sostenibili
            nel tempo.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-2xl font-bold text-ink">
              DS
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{site.founder}</p>
              <p className="text-sm text-slate-400">Fondatore e AI Solutions Architect</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate-300">
            Sviluppatore e architetto software con lunga esperienza su web, mobile e sistemi
            enterprise. Guida la progettazione delle soluzioni di AI Generativa e segue
            personalmente ogni progetto, dall'analisi al rilascio.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle eyebrow="Valori" title="Come lavoriamo" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card">
                <v.icon className="text-accent" size={26} />
                <h3 className="mt-4 font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <SectionTitle eyebrow="Tecnologie" title="Il nostro stack" />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {stack.map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-4 py-2 font-mono text-sm text-slate-300">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/contatti" className="btn-primary">
            Lavoriamo insieme <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
