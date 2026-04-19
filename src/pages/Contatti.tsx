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

  return (    <main className="pt-20 bg-[#0f172a] text-white">
      {/* Header */}
      <section className="py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 mb-6 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Inizia la Conversazione</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-bold text-white tracking-tighter leading-[0.9] mb-8">
            Pronto a <span className="text-gradient">Collaborare?</span>
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
            Siamo pronti ad ascoltare le tue sfide e trasformarle in successi tecnologici. Contattaci oggi stesso.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-32 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Form */}
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-primary rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
             <div className="relative bg-slate-900 p-10 md:p-16 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <h2 className="text-4xl font-headline font-bold text-white mb-10 tracking-tight">Inviaci un Messaggio</h2>
                
                {submitStatus === 'success' && (
                   <div className="mb-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4 text-emerald-400 font-bold">
                     <span className="material-symbols-outlined text-3xl">check_circle</span>
                     <div>
                       <div className="text-lg">Messaggio inviato!</div>
                       <div className="text-sm font-normal opacity-70">Ti ricontatteremo entro 24 ore.</div>
                     </div>
                   </div>
                )}
                
                {submitStatus === 'error' && (
                   <div className="mb-10 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-400 font-bold">
                     <span className="material-symbols-outlined text-3xl">error</span>
                     <div>
                       <div className="text-lg">Errore nell'invio</div>
                       <div className="text-sm font-normal opacity-70">{errorMessage}</div>
                     </div>
                   </div>
                )}

                <form className="space-y-8" onSubmit={handleSubmit}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Nome Completo</label>
                         <input 
                           type="text" 
                           name="nome"
                           value={formData.nome}
                           onChange={handleChange}
                           required
                           className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 transition-all font-light" 
                           placeholder="John Doe" 
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Email Business</label>
                         <input 
                           type="email" 
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           required
                           className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 transition-all font-light" 
                           placeholder="john@company.com" 
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Ragione Sociale</label>
                         <input 
                           type="text" 
                           name="azienda"
                           value={formData.azienda}
                           onChange={handleChange}
                           className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 transition-all font-light" 
                           placeholder="Digital Corp S.p.A." 
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Servizio di Interesse</label>
                         <div className="relative">
                            <select 
                              name="servizio"
                              value={formData.servizio}
                              onChange={handleChange}
                              className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 transition-all appearance-none font-light cursor-pointer"
                            >
                               <option value="" className="bg-slate-900">Seleziona...</option>
                               <option value="web" className="bg-slate-900">Web & Cloud Systems</option>
                               <option value="mobile" className="bg-slate-900">Mobile Ecosystems</option>
                               <option value="hardware" className="bg-slate-900">IoT & Hardware Logic</option>
                               <option value="ai" className="bg-slate-900">Agentic AI Solutions</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">expand_more</span>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Dettagli del Progetto</label>
                      <textarea 
                        name="messaggio"
                        value={formData.messaggio}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800/50 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-slate-800 transition-all min-h-[180px] resize-none font-light leading-relaxed" 
                        placeholder="Descrivi brevemente i tuoi obiettivi tecnologici..."
                      ></textarea>
                   </div>

                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="w-full bg-emerald-500 text-slate-900 font-headline font-bold text-xl py-6 rounded-2xl shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
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
                   <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-all duration-500">
                      <span className="material-symbols-outlined text-emerald-400 text-3xl group-hover:text-slate-900">mail</span>
                   </div>
                   <div>
                      <h4 className="font-headline font-bold text-2xl mb-2 text-white">Scrivici</h4>
                      <p className="text-slate-400 text-lg">info@dscitaly.com</p>
                      <p className="text-slate-500 text-sm mt-2 font-light italic">Response SLA: 24 ore</p>
                   </div>
                </div>

                <div className="flex gap-8 items-start group">
                   <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-all duration-500">
                      <span className="material-symbols-outlined text-emerald-400 text-3xl group-hover:text-slate-900">call</span>
                   </div>
                   <div>
                      <h4 className="font-headline font-bold text-2xl mb-2 text-white">Chiamaci</h4>
                      <p className="text-slate-400 text-lg">+39 352 015 0489</p>
                      <p className="text-slate-500 text-sm mt-2 font-light italic">Operativi Lun-Ven, 9:00 - 18:00</p>
                   </div>
                </div>

                <div className="flex gap-8 items-start group">
                   <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-all duration-500">
                      <span className="material-symbols-outlined text-emerald-400 text-3xl group-hover:text-slate-900">location_on</span>
                   </div>
                   <div>
                      <h4 className="font-headline font-bold text-2xl mb-2 text-white">Headquarters</h4>
                      <p className="text-slate-400 text-lg leading-relaxed">Via Carlo Arturo Jemolo, 283<br/>Roma, Italia</p>
                   </div>
                </div>
             </div>

             <div className="p-10 bg-slate-900 border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                <h4 className="font-headline font-bold text-2xl mb-4 relative z-10 text-white">AI Strategy Audit</h4>
                <p className="text-slate-400 text-base leading-relaxed mb-8 relative z-10 font-light">Hai bisogno di un'analisi immediata per integrare architetture agentiche o LLM? Prenota un technical audit di 15 minuti.</p>
                <Link to="/contatti" className="text-emerald-400 font-bold inline-flex items-center gap-3 group/link relative z-10 text-lg hover:text-emerald-300">
                   Scegli uno Slot <span className="material-symbols-outlined text-xl group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
                </Link>
             </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contatti;
