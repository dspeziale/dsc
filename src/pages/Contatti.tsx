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
    <main className="pt-20">
      {/* Header */}
      <section className="bg-surface py-24 border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Inizia la Conversazione</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface tracking-tighter leading-tight mb-6">
            Pronto a <span className="text-gradient">Collaborare?</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
            Siamo pronti ad ascoltare le tue sfide e trasformarle in successi tecnologici. Contattaci oggi stesso.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Form */}
          <div className="p-1 w-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-3xl">
             <div className="bg-surface p-8 md:p-12 rounded-[inherit] border border-outline-variant/10 shadow-2xl">
                <h2 className="text-3xl font-headline font-bold text-on-surface mb-8">Inviaci un Messaggio</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-600 font-bold">
                    <span className="material-symbols-outlined">check_circle</span>
                    Messaggio inviato con successo!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-600 font-bold">
                    <span className="material-symbols-outlined">error</span>
                    {errorMessage}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Nome</label>
                         <input 
                           type="text" 
                           name="nome"
                           value={formData.nome}
                           onChange={handleChange}
                           required
                           className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors" 
                           placeholder="John Doe" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
                         <input 
                           type="email" 
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           required
                           className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors" 
                           placeholder="john@example.com" 
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Società</label>
                         <input 
                           type="text" 
                           name="azienda"
                           value={formData.azienda}
                           onChange={handleChange}
                           className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors" 
                           placeholder="Company S.p.A." 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Servizio</label>
                         <select 
                           name="servizio"
                           value={formData.servizio}
                           onChange={handleChange}
                           className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors appearance-none"
                         >
                            <option value="">Seleziona...</option>
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile Apps</option>
                            <option value="hardware">Hardware / IoT</option>
                            <option value="ai">AI Solutions</option>
                         </select>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Messaggio</label>
                      <textarea 
                        name="messaggio"
                        value={formData.messaggio}
                        onChange={handleChange}
                        required
                        className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-5 py-4 text-on-surface focus:outline-none focus:border-primary transition-colors min-h-[150px] resize-none" 
                        placeholder="Parlaci del tuo progetto..."
                      ></textarea>
                   </div>

                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="w-full bg-gradient-to-r from-primary-container to-primary text-on-primary-container font-headline font-bold text-lg py-5 rounded-xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                   >
                      {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
                      {!isSubmitting && <span className="material-symbols-outlined">send</span>}
                   </button>
                </form>
             </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col justify-center gap-12">
             <div className="space-y-8">
                <div className="flex gap-6 items-start">
                   <div className="w-14 h-14 rounded-2xl bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-3xl">mail</span>
                   </div>
                   <div>
                      <h4 className="font-headline font-bold text-xl mb-1">Scrivici</h4>
                      <p className="text-on-surface-variant">info@dscitaly.com</p>
                      <p className="text-on-surface-variant text-sm mt-1 opacity-70">Rispondiamo mediamente entro 24 ore.</p>
                   </div>
                </div>

                <div className="flex gap-6 items-start">
                   <div className="w-14 h-14 rounded-2xl bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-3xl">call</span>
                   </div>
                   <div>
                      <h4 className="font-headline font-bold text-xl mb-1">Chiamaci</h4>
                      <p className="text-on-surface-variant">+39 352 015 0489</p>
                      <p className="text-on-surface-variant text-sm mt-1 opacity-70">Disponibili Lun-Ven, 9:00 - 18:00.</p>
                   </div>
                </div>

                <div className="flex gap-6 items-start">
                   <div className="w-14 h-14 rounded-2xl bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                   </div>
                   <div>
                      <h4 className="font-headline font-bold text-xl mb-1">Ufficio</h4>
                      <p className="text-on-surface-variant">Via Carlo Arturo Jemolo, 283</p>
                      <p className="text-on-surface-variant">Roma, Italia</p>
                   </div>
                </div>
             </div>

             <div className="p-8 bg-surface-container-low border border-outline-variant/10 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <h4 className="font-headline font-bold text-xl mb-4 relative z-10">Consulenza Diretta</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6 relative z-10">Hai un'urgenza o un progetto complesso che richiede un'analisi immediata? Prenota una sessione di 15 minuti con un nostro Lead Engineer.</p>
                <Link to="/contatti" className="text-primary font-bold inline-flex items-center gap-2 group/link relative z-10">
                   Scegli uno Slot <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
             </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Contatti;
