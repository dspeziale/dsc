import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { site } from '../data/site'

const process = [
  { step: '01', title: 'Analisi', desc: 'Studiamo il tuo business e i tuoi dati per individuare la soluzione più efficace.' },
  { step: '02', title: 'Design', desc: 'Progettiamo esperienza utente, architettura e, se serve, la strategia AI.' },
  { step: '03', title: 'Sviluppo', desc: 'Costruiamo con metodologie agili, rilasci frequenti e feedback continuo.' },
  { step: '04', title: 'Supporto', desc: 'Manutenzione, monitoraggio ed evoluzione della soluzione nel tempo.' },
]

const stats = [
  { value: '10+', label: 'anni di esperienza' },
  { value: '120+', label: 'progetti consegnati' },
  { value: '4', label: 'piattaforme: web, Android, iOS, SPA' },
  { value: '100%', label: 'soluzioni su misura' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="glow-bg grid-bg relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-36">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-accent" />
            AI Generativa applicata al business
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Software su misura, <span className="gradient-text">potenziato dall'AI</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            {site.name} progetta e sviluppa soluzioni di Intelligenza Artificiale Generativa,
            applicazioni web, app Android e iOS e Single Page Application. Trasformiamo idee e
            processi in prodotti digitali concreti.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contatti" className="btn-primary">
              Richiedi una consulenza <ArrowRight size={18} />
            </Link>
            <Link to="/servizi" className="btn-ghost">
              Scopri i servizi
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="mt-1 text-sm text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionTitle
          eyebrow="Servizi"
          title="Cosa facciamo"
          subtitle="Dall'integrazione di modelli generativi allo sviluppo di applicazioni per ogni piattaforma."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} to={`/servizi#${s.slug}`} className="card group">
              <s.icon className="text-accent" size={28} />
              <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.short}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-accent opacity-0 transition group-hover:opacity-100">
                Approfondisci <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* AI focus */}
      <section className="border-y border-white/10 bg-ink-soft/40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="AI Generativa"
              title="L'intelligenza artificiale che lavora per la tua azienda"
              subtitle="Non un esperimento, ma strumenti concreti integrati nei processi quotidiani: assistenti che conoscono i tuoi documenti, agenti che completano attività ripetitive, automazioni che fanno risparmiare ore ogni giorno."
              align="left"
            />
            <ul className="mt-8 space-y-3">
              {[
                'Chatbot e assistenti su dati proprietari',
                'Agenti AI collegati a CRM, ERP e API',
                'Estrazione dati da documenti, email e PDF',
                'Generazione di contenuti, report e codice',
                'Sicurezza, privacy e controllo dei costi',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={18} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/servizi#ai-generativa" className="btn-ghost mt-8">
              Scopri le soluzioni AI <ArrowRight size={18} />
            </Link>
          </div>
          <div className="card font-mono text-sm leading-relaxed text-slate-300">
            <p className="text-slate-500">// esempio: assistente aziendale</p>
            <p className="mt-3">
              <span className="text-accent-2">utente</span>: Quali clausole di recesso ha il
              contratto con Rossi Srl?
            </p>
            <p className="mt-3">
              <span className="text-accent">assistente</span>: Il contratto prevede recesso con
              preavviso di 60 giorni (art. 12). Ho trovato il documento firmato il 3 marzo. Vuoi
              che prepari la bozza di comunicazione?
            </p>
            <p className="mt-3 text-slate-500">
              fonti: contratti/rossi-srl-2025.pdf · crm/clienti/rossi
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionTitle
          eyebrow="Metodo"
          title="Come lavoriamo"
          subtitle="Un percorso chiaro, dall'idea al rilascio e oltre."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="card">
              <p className="font-mono text-sm text-accent">{p.step}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects preview */}
      <section className="border-t border-white/10 bg-ink-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <SectionTitle
            eyebrow="Progetti"
            title="Alcuni lavori recenti"
            subtitle="Una selezione di soluzioni realizzate per i nostri clienti."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <div key={p.title} className="card">
                <p className="font-mono text-xs uppercase tracking-wider text-accent-2">
                  {p.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{p.description}</p>
                <p className="mt-4 text-sm font-medium text-accent">{p.results}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/progetti" className="btn-ghost">
              Tutti i progetti <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="glow-bg">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Hai un progetto in mente?
          </h2>
          <p className="mt-4 text-slate-300">
            Raccontaci di cosa hai bisogno: ti rispondiamo entro 24 ore con una prima valutazione.
          </p>
          <Link to="/contatti" className="btn-primary mt-8">
            Contattaci <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
