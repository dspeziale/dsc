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

  return (
    <main className="relative pt-32 pb-section-gap">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-tech-grid opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero / Header Section */}
      <section className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-6 border border-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary pulse-indicator"></span>
          <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest">Il Nostro DNA</span>
        </div>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-8">
          Chi <span className="text-primary">Siamo</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-outline-variant pl-4">
          Un collettivo di menti creative e ingegneri visionari dedicati alla costruzione del futuro digitale e agentico.
        </p>
      </section>

      {/* Story Section */}
      <section className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-6">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8 tracking-tight">La Nostra Storia</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            DS Consulting nasce dalla fusione tra artigianato digitale e ingegneria d'avanguardia. Fondata con l'obiettivo di elevare lo standard delle soluzioni tecnologiche, siamo cresciuti trasformando sfide complesse in opportunità di business tangibili.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Oggi, nell'era dell'Intelligenza Artificiale, la nostra missione si evolve: orchestriamo agenti autonomi e sistemi di cybersecurity per rendere ogni azienda un leader tecnologico.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-10 rounded border border-outline-variant bg-surface/50 backdrop-blur-xl hover:border-primary/50 transition-all group">
            <span className="material-symbols-outlined text-primary text-5xl mb-6 group-hover:scale-110 transition-transform">visibility</span>
            <h3 className="font-title-md text-title-md font-bold mb-2 text-on-surface uppercase tracking-widest">Vision</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Essere l'acceleratore tecnologico preferito dalle aziende che puntano all'eccellenza globale e all'automazione cognitiva.</p>
          </div>
          <div className="p-10 rounded border border-outline-variant bg-surface/50 backdrop-blur-xl hover:border-primary/50 transition-all group">
            <span className="material-symbols-outlined text-primary text-5xl mb-6 group-hover:scale-110 transition-transform">bolt</span>
            <h3 className="font-title-md text-title-md font-bold mb-2 text-on-surface uppercase tracking-widest">Mission</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Progettare e costruire ecosistemi digitali sicuri, scalabili e agentici, orientati a risultati misurabili.</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-32 border-y border-white/5 bg-surface/30 backdrop-blur-xl">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-display-lg text-display-lg text-on-surface mb-20">I Nostri Valori</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {values.map((v, i) => (
              <div key={i} className="group">
                <div className="w-20 h-20 rounded bg-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                  <span className="material-symbols-outlined text-primary text-4xl group-hover:text-on-primary">{v.icon}</span>
                </div>
                <h4 className="font-headline-lg text-headline-lg font-bold mb-4 text-on-surface tracking-tight">{v.title}</h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center md:text-left mb-24">
          <h2 className="font-display-lg text-display-lg text-on-surface">Main Contributors</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-6">Il cuore pulsante di ogni nostra innovazione tecnologica.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group relative bg-surface/50 rounded border border-outline-variant p-10 glass-card-hover hover:border-primary/50 transition-all duration-500">
              <div className="w-24 h-24 rounded bg-primary/10 flex items-center justify-center text-primary font-display-lg text-3xl font-bold mb-8 group-hover:scale-110 transition-transform border border-primary/20">
                {member.initials}
              </div>
              <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-2 tracking-tight">{member.name}</h3>
              <p className="font-label-mono text-label-mono text-primary uppercase tracking-[0.2em] mb-6">{member.role}</p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience / Tech Stack Banner */}
      <section className="relative z-10 py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="p-16 md:p-24 bg-surface border border-outline-variant rounded-xl flex flex-col lg:flex-row items-center justify-between gap-16 group hover:border-primary/50 transition-colors">
          <div className="max-w-2xl">
            <h2 className="font-display-lg text-display-lg text-on-surface mb-8">Oltre la Consulenza: <br /><span className="text-primary">Partnership Strategica</span></h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">Non siamo solo sviluppatori. Siamo ingegneri che fondono hardware, cloud e agenti autonomi per dare a ogni cliente un vantaggio competitivo reale.</p>
          </div>
          <Link to="/contatti" className="px-12 py-6 bg-primary text-on-primary rounded font-label-mono text-label-mono uppercase tracking-widest hover:bg-primary-container transition-all shadow-2xl active:scale-95">
            Lavora con Noi
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ChiSiamo;

