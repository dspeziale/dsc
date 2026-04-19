import { Link } from 'react-router-dom';

const Servizi = () => {
  const services = [
    {
      icon: 'language',
      title: 'Sviluppo Web',
      description: 'Creiamo piattaforme web scalabili, sicure e ad alte prestazioni, ottimizzate per ogni dispositivo e motore di ricerca.',
      details: ['Single Page Applications', 'Piattaforme E-commerce', 'Sistemi di Management', 'Web App Progressive'],
    },
    {
      icon: 'smartphone',
      title: 'App Mobile',
      description: 'Sviluppiamo applicazioni mobile native e cross-platform intuitive che offrono un\'esperienza utente senza compromessi.',
      details: ['iOS / Android Native', 'React Native / Flutter', 'Mobile Strategy', 'UX/UI Discovery'],
    },
    {
      icon: 'developer_board',
      title: 'Soluzioni Hardware',
      description: 'Progettazione hardware su misura e integrazione IoT per trasformare il mondo fisico attraverso la tecnologia digitale.',
      details: ['Embedded Systems', 'IoT Ecosystems', 'Firmware Development', 'Prototyping'],
    },
    {
      icon: 'hub',
      title: 'AI & Data Science',
      description: 'Integrazione di modelli di intelligenza artificiale e analisi dati per automatizzare processi e generare insight.',
      details: ['Agentic AI', 'RAG Architectures', 'Predictive Analytics', 'Machine Learning'],
    },
    {
      icon: 'shield_lock',
      title: 'Cybersecurity',
      description: 'Protezione delle infrastrutture digitali attraverso analisi delle vulnerabilità e implementazione di protocolli di sicurezza.',
      details: ['Network Scanning', 'Threat Analysis', 'Secure Coding', 'Compliance'],
    },
    {
      icon: 'cloud',
      title: 'Cloud & Infrastructure',
      description: 'Infrastrutture cloud scalabili e sicure per supportare il carico critico delle applicazioni enterprise.',
      details: ['AWS / Azure / GCP', 'Kubernetes / Docker', 'CI/CD Pipelines', 'Scalability'],
    },
  ];

  return (
    <main className="pt-20">
      {/* Header Section */}
      <section className="bg-surface py-24 border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Eccellenza Tecnologica</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface tracking-tighter leading-tight mb-6">
            I Nostri <span className="text-gradient">Servizi</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
            Offriamo soluzioni tecnologiche d'avanguardia per aziende ambiziose. Dalla strategia hardware allo sviluppo software di classe enterprise.
          </p>
        </div>
      </section>
      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group p-10 rounded-3xl bg-white hover:bg-emerald-50 border border-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-8 group-hover:bg-emerald-500 transition-all">
                  <span className="material-symbols-outlined text-emerald-600 text-4xl group-hover:text-white transition-colors">{service.icon}</span>
                </div>
                <h3 className="font-headline text-3xl font-bold text-slate-900 mb-6">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-10 text-lg">
                  {service.description}
                </p>
                <div className="space-y-4">
                  {service.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20 text-center md:text-left">
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">Agentic Workflow</h2>
            <p className="text-slate-600 text-xl max-w-xl font-light">Come integriamo l'intelligenza autonoma nei tuoi processi core.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { step: '01', title: 'Discovery', desc: 'Identifichiamo i task cognitivi automatizzabili tramite LLM avanzati.' },
              { step: '02', title: 'Orchestration', desc: 'Progettiamo la logica degli agenti (Claude/GPT) e i tool a loro disposizione.' },
              { step: '03', title: 'Deployment', desc: 'Distribuiamo su infrastrutture ad alta velocità ottimizzate Groq/LLaMA.' },
              { step: '04', title: 'Optimization', desc: 'Monitoraggio costante e fine-tuning dei prompt per precisione totale.' },
            ].map((p, index) => (
              <div key={index} className="relative p-10 rounded-3xl bg-slate-50 border border-slate-100">
                <span className="text-8xl font-black text-emerald-500/10 absolute top-4 right-4 select-none">{p.step}</span>
                <h3 className="font-headline text-2xl font-bold text-slate-900 mb-4 relative z-10">{p.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed relative z-10">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden relative bg-[#0f172a] shadow-2xl">
          <div className="relative z-10 px-8 md:px-20 py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Scalabilità <br/><span className="text-emerald-400">Automatizzata.</span></h2>
              <p className="text-slate-400 text-xl font-light">Trasforma la tua azienda con agenti AI di classe mondiale.</p>
            </div>
            <Link to="/contatti" className="shrink-0 px-12 py-6 bg-emerald-500 text-slate-900 rounded-2xl font-bold text-xl shadow-2xl shadow-emerald-500/30 hover:bg-emerald-400 active:scale-95 transition-all duration-300 flex items-center gap-4">
              Inizia Ora <span className="material-symbols-outlined text-2xl">rocket_launch</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Servizi;
