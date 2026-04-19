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
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group p-8 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/10 transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">{service.icon}</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">{service.title}</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="space-y-3">
                  {service.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                      <span className="material-symbols-outlined text-primary text-xs">check_circle</span>
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
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-4">Il Nostro Metodo</h2>
            <p className="text-on-surface-variant text-lg max-w-xl">Un approccio strutturato e iterativo per garantire il successo di ogni progetto.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Analisi', desc: 'Studiamo il tuo business per trovare la soluzione tecnologica più efficace.' },
              { step: '02', title: 'Design', desc: 'Progettiamo l\'esperienza utente e l\'architettura tecnica dettagliata.' },
              { step: '03', title: 'Sviluppo', desc: 'Implementiamo la soluzione con metodologie agili e feedback costanti.' },
              { step: '04', title: 'Supporto', desc: 'Garantiamo manutenzione e assistenza continua post-lancio.' },
            ].map((p, index) => (
              <div key={index} className="relative p-8 rounded-xl bg-surface-container-low border border-outline-variant/10">
                <span className="text-6xl font-black text-primary/5 absolute top-4 right-4">{p.step}</span>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-3">{p.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative bg-surface-container-high border border-outline-variant/20">
          <div className="relative z-10 px-8 md:px-20 py-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4">Hai un'idea innovativa?</h2>
              <p className="text-on-surface-variant text-lg">Mettiamo a tua disposizione la nostra expertise tecnica per trasformarla in realtà.</p>
            </div>
            <Link to="/contatti" className="shrink-0 px-10 py-5 bg-gradient-to-br from-primary-container to-primary text-on-primary-container rounded-xl font-bold text-lg shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center gap-3">
              Inizia Ora <span className="material-symbols-outlined">rocket_launch</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Servizi;

export default Servizi;
