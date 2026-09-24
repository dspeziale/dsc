import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { services } from '../data/services'
import { site } from '../data/site'

export default function Contatti() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Richiesta: ${data.get('service')}`)
    const body = encodeURIComponent(
      `Nome: ${data.get('name')}\nEmail: ${data.get('email')}\nAzienda: ${data.get('company') || '-'}\n\n${data.get('message')}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <section className="glow-bg border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <SectionTitle
            eyebrow="Contatti"
            title="Parliamo del tuo progetto"
            subtitle="Raccontaci l'idea o il problema da risolvere: ti rispondiamo entro 24 ore con una prima valutazione, senza impegno."
            align="left"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-6">
          <div className="card flex items-start gap-4">
            <Mail className="shrink-0 text-accent" />
            <div>
              <p className="font-semibold text-white">Email</p>
              <a href={`mailto:${site.email}`} className="text-sm text-slate-400 hover:text-accent">
                {site.email}
              </a>
            </div>
          </div>
          <div className="card flex items-start gap-4">
            <MapPin className="shrink-0 text-accent" />
            <div>
              <p className="font-semibold text-white">Sede</p>
              <p className="text-sm text-slate-400">{site.address}</p>
            </div>
          </div>
          <div className="card">
            <p className="font-semibold text-white">Cosa succede dopo</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-400">
              <li>Leggiamo la tua richiesta e ti rispondiamo entro 24 ore.</li>
              <li>Fissiamo una call di 30 minuti per capire obiettivi e vincoli.</li>
              <li>Ricevi una proposta con tempi, costi e fasi del progetto.</li>
            </ol>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-5 md:p-8">
          {sent && (
            <p className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
              Grazie! Si è aperto il tuo client di posta con la richiesta precompilata. Se non è
              successo, scrivici a {site.email}.
            </p>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block text-slate-300">Nome e cognome *</span>
              <input name="name" required className="input" placeholder="Mario Rossi" />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-slate-300">Email *</span>
              <input name="email" type="email" required className="input" placeholder="mario@azienda.it" />
            </label>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block text-slate-300">Azienda</span>
              <input name="company" className="input" placeholder="Azienda Srl" />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-slate-300">Servizio di interesse *</span>
              <select name="service" required className="input" defaultValue="">
                <option value="" disabled>
                  Seleziona
                </option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Altro">Altro</option>
              </select>
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1.5 block text-slate-300">Messaggio *</span>
            <textarea
              name="message"
              required
              rows={6}
              className="input resize-y"
              placeholder="Descrivi il progetto, gli obiettivi e le tempistiche..."
            />
          </label>
          <p className="text-xs text-slate-500">
            I dati inviati saranno usati solo per rispondere alla tua richiesta, nel rispetto del GDPR.
          </p>
          <button type="submit" className="btn-primary">
            Invia richiesta <Send size={18} />
          </button>
        </form>
      </section>
    </>
  )
}
