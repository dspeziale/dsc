import { Link } from 'react-router-dom';

const ChiSiamo = () => {
  const values = [
    {
      icon: 'lightbulb',
      title: 'Innovazione',
      description: 'Siamo sempre alla ricerca delle soluzioni tecnologiche più avanzate per i nostri clienti.',
    },
    {
      icon: 'favorite',
      title: 'Passione',
      description: 'Amiamo quello che facciamo e questo si riflette nella qualità del nostro lavoro.',
    },
    {
      icon: 'groups',
      title: 'Collaborazione',
      description: 'Lavoriamo a stretto contatto con i clienti per raggiungere obiettivi comuni.',
    },
    {
      icon: 'workspace_premium',
      title: 'Eccellenza',
      description: 'Puntiamo sempre al massimo della qualità in ogni progetto che realizziamo.',
    },
  ];

  const team = [
    {
      name: 'Daniele Speziale',
      role: 'CEO & Founder',
      initials: 'DS',
      bio: 'Visionario tecnologico con oltre 35 anni di esperienza nel guidare l\'innovazione digitale.',
    },
    {
      name: 'Fabrizio Manni',
      role: 'CTO',
      initials: 'FM',
      bio: 'Architetto software specializzato in sistemi enterprise e infrastrutture cloud scalabili.',
    },
    {
      name: 'Claudio Rapisardi',
      role: 'Lead Developer',
      initials: 'CR',
      bio: 'Esperto Full-Stack con focus su AI Integration e sviluppo mobile ad alte performance.',
    },
    {
      name: 'Anna Graminini',
      role: 'UX/UI Designer',
      initials: 'AG',
      bio: 'Creatrice di esperienze digitali intuitive che fondono estetica e funzionalità.',
    },
  ];

  retur    <main className="pt-20 bg-[#0f172a] text-white">
      {/* Hero / Header Section */}
      <section className="py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 mb-6 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Il Nostro DNA</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-bold text-white tracking-tighter leading-[0.9] mb-8">
            Chi <span className="text-gradient">Siamo</span>
          </h1>
          <p className="text-slate-400 text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
            Un collettivo di menti creative e ingegneri visionari dedicati alla costruzione del futuro digitale e agentico.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-white mb-8 tracking-tight">La Nostra Storia</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              DSC Italy nasce dalla fusione tra artigianato digitale e ingegneria d'avanguardia. Fondata con l'obiettivo di elevare lo standard delle soluzioni tecnologiche, siamo cresciuti trasformando sfide complesse in opportunità di business tangibili.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              Oggi, nell'era dell'Intelligenza Artificiale, la nostra missione si evolve: orchestriamo agenti autonomi e sistemi di cybersecurity per rendere ogni azienda un leader tecnologico.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-10 rounded-3xl bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-all group">
                <span className="material-symbols-outlined text-emerald-400 text-5xl mb-6 group-hover:scale-110 transition-transform">visibility</span>
                <h3 className="font-headline font-bold text-2xl mb-2 text-white">Vision</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Essere l'acceleratore tecnologico preferito dalle aziende che puntano all'eccellenza globale e all'automazione cognitiva.</p>
             </div>
             <div className="p-10 rounded-3xl bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-all group">
                <span className="material-symbols-outlined text-emerald-400 text-5xl mb-6 group-hover:scale-110 transition-transform">bolt</span>
                <h3 className="font-headline font-bold text-2xl mb-2 text-white">Mission</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Progettare e costruire ecosistemi digitali sicuri, scalabili e agentici, orientati a risultati misurabili.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-20 tracking-tight">I Nostri Valori</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {values.map((v, i) => (
              <div key={i} className="group">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 group-hover:bg-emerald-500 transition-all duration-500">
                  <span className="material-symbols-outlined text-emerald-400 text-4xl group-hover:text-slate-900">{v.icon}</span>
                </div>
                <h4 className="font-headline font-bold text-2xl mb-4 text-white tracking-tight">{v.title}</h4>
                <p className="text-slate-400 text-base leading-relaxed font-light">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center md:text-left mb-24">
            <h2 className="font-headline text-4xl md:text-7xl font-bold text-white tracking-tighter">Main Contributors</h2>
            <p className="text-slate-400 text-xl mt-6 font-light">Il cuore pulsante di ogni nostra innovazione tecnologica.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="group relative bg-slate-900 rounded-[2rem] p-10 border border-white/5 hover:border-emerald-500/30 transition-all duration-500">
                <div className="w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-emerald-400 to-primary flex items-center justify-center text-slate-900 font-headline text-3xl font-bold mb-8 group-hover:scale-110 transition-transform">
                  {member.initials}
                </div>
                <h3 className="text-2xl font-headline font-bold text-white mb-2 tracking-tight">{member.name}</h3>
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-[0.2em] mb-6">{member.role}</p>
                <p className="text-slate-400 text-base leading-relaxed font-light">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience / Tech Stack Banner */}
      <section className="py-32 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-16">
           <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 tracking-tight">Oltre la Consulenza: <br/><span className="text-emerald-600">Partnership Strategica</span></h2>
              <p className="text-slate-600 text-xl leading-relaxed font-light">Non siamo solo sviluppatori. Siamo ingegneri che fondono hardware, cloud e agenti autonomi per dare a ogni cliente un vantaggio competitivo reale.</p>
           </div>
           <Link to="/contatti" className="px-12 py-6 bg-emerald-500 text-slate-900 rounded-2xl font-bold text-xl hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/30 active:scale-95">
              Lavora con Noi
           </Link>
        </div>
      </section>
ion>
    </main>
  );
};

export default ChiSiamo;
