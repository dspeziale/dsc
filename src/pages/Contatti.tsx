import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

const Contatti = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    azienda: '',
    servizio: '',
    messaggio: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nome: '',
          email: '',
          telefono: '',
          azienda: '',
          servizio: '',
          messaggio: '',
        });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Errore durante l\'invio del messaggio');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Errore di connessione. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative pt-32 pb-section-gap overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-tech-grid opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <section className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-6 border border-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary pulse-indicator"></span>
          <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest">Inizia la Conversazione</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-8">
          Pronto a <span className="text-primary">Collaborare?</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-outline-variant pl-4">
          Siamo pronti ad ascoltare le tue sfide e trasformarle in successi tecnologici. Contattaci oggi stesso.
        </p>
      </section>

      {/* Contact Content */}
      <section className="relative z-10 py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Form */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-primary/10 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-surface/50 backdrop-blur-xl p-10 md:p-16 rounded border border-outline-variant shadow-2xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-10 tracking-tight">Inviaci un Messaggio</h2>

            {submitStatus === 'success' && (
              <div className="mb-10 p-6 bg-primary/10 border border-primary/20 rounded flex items-center gap-4 text-primary font-bold">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
                <div>
                  <div className="font-title-md text-title-md">Messaggio inviato!</div>
                  <div className="font-body-md text-body-md font-normal opacity-70">Ti ricontatteremo entro 24 ore.</div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-10 p-6 bg-error/10 border border-error/20 rounded flex items-center gap-4 text-error font-bold">
                <span className="material-symbols-outlined text-3xl">error</span>
                <div>
                  <div className="font-title-md text-title-md">Errore nell'invio</div>
                  <div className="font-body-md text-body-md font-normal opacity-70">{errorMessage}</div>
                </div>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant ml-1">Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-6 py-5 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-surface-container transition-all font-body-md text-body-md"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant ml-1">Email Business</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-6 py-5 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-surface-container transition-all font-body-md text-body-md"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant ml-1">Ragione Sociale</label>
                  <input
                    type="text"
                    name="azienda"
                    value={formData.azienda}
                    onChange={handleChange}
                    className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-6 py-5 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-surface-container transition-all font-body-md text-body-md"
                    placeholder="Digital Corp S.p.A."
                  />
                </div>
                <div className="space-y-3">
                  <label className="font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant ml-1">Servizio di Interesse</label>
                  <div className="relative">
                    <select
                      name="servizio"
                      value={formData.servizio}
                      onChange={handleChange}
                      className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-6 py-5 text-on-surface focus:outline-none focus:border-primary/50 focus:bg-surface-container transition-all appearance-none font-body-md text-body-md cursor-pointer"
                    >
                      <option value="" className="bg-surface">Seleziona...</option>
                      <option value="web" className="bg-surface">Web & Cloud Systems</option>
                      <option value="mobile" className="bg-surface">Mobile Ecosystems</option>
                      <option value="hardware" className="bg-surface">IoT & Hardware Logic</option>
                      <option value="ai" className="bg-surface">Agentic AI Solutions</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant ml-1">Dettagli del Progetto</label>
                <textarea
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container/50 border border-outline-variant/30 rounded px-6 py-5 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-surface-container transition-all min-h-[180px] resize-none font-body-md text-body-md leading-relaxed"
                  placeholder="Descrivi brevemente i tuoi obiettivi tecnologici..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-on-primary font-label-mono text-label-mono uppercase tracking-widest py-6 rounded shadow-2xl hover:bg-primary-container active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
              >
                {isSubmitting ? 'Processing Network...' : 'Invia Briefing Progetto'}
                {!isSubmitting && <span className="material-symbols-outlined text-2xl">send</span>}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col justify-center gap-16">
          <div className="space-y-12">
            <div className="flex gap-8 items-start group">
              <div className="w-16 h-16 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:text-on-primary">mail</span>
              </div>
              <div>
                <h4 className="font-headline-lg text-headline-lg font-bold mb-2 text-on-surface tracking-tight leading-none">Scrivici</h4>
                <p className="font-body-lg text-body-lg text-on-surface-variant">dsconsulting.italy@gmail.com</p>
                <p className="font-body-md text-body-md text-on-surface-variant/50 mt-2 italic">Response SLA: 24 ore</p>
              </div>
            </div>

            <div className="flex gap-8 items-start group">
              <div className="w-16 h-16 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:text-on-primary">call</span>
              </div>
              <div>
                <h4 className="font-headline-lg text-headline-lg font-bold mb-2 text-on-surface tracking-tight leading-none">Chiamaci</h4>
                <p className="font-body-lg text-body-lg text-on-surface-variant">+39 352 015 0489</p>
                <p className="font-body-md text-body-md text-on-surface-variant/50 mt-2 italic">Operativi Lun-Ven, 9:00 - 18:00</p>
              </div>
            </div>

            <div className="flex gap-8 items-start group">
              <div className="w-16 h-16 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                <span className="material-symbols-outlined text-primary text-3xl group-hover:text-on-primary">location_on</span>
              </div>
              <div>
                <h4 className="font-headline-lg text-headline-lg font-bold mb-2 text-on-surface tracking-tight leading-none">Headquarters</h4>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">Via Carlo Arturo Jemolo, 283<br />Roma, Italia</p>
              </div>
            </div>
          </div>

          <div className="p-10 bg-surface/50 backdrop-blur-xl border border-outline-variant rounded shadow-2xl relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <h4 className="font-headline-lg text-headline-lg font-bold mb-4 relative z-10 text-on-surface">AI Strategy Audit</h4>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8 relative z-10">Hai bisogno di un'analisi immediata per integrare architetture agentiche o LLM? Prenota un technical audit di 15 minuti.</p>
            <Link to="/contatti" className="font-label-mono text-label-mono text-primary uppercase tracking-widest inline-flex items-center gap-3 group/link relative z-10 hover:text-primary-fixed-dim">
              Scegli uno Slot <span className="material-symbols-outlined text-xl group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contatti;

