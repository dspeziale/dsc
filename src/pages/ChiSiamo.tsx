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
    <main className="pt-20">
      {/* Hero / Header Section */}
      <section className="bg-surface py-24 border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Il Nostro DNA</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface tracking-tighter leading-tight mb-6">
            Chi <span className="text-gradient">Siamo</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
            Un collettivo di menti creative e ingegneri visionari dedicati alla costruzione del futuro digitale.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface mb-8">La Nostra Storia</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              DSC Italy nasce dalla fusione tra artigianato digitale e ingegneria d'avanguardia. Fondata con l'obiettivo di elevare lo standard delle soluzioni tecnologiche in Italia, siamo cresciuti trasformando sfide complesse in opportunità di business tangibili.
            </p>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              La nostra evoluzione ci ha portato a specializzarci in settori critici come l'Intelligenza Artificiale Generativa e la Cybersecurity, mantenendo sempre un forte legame con lo sviluppo hardware e IoT che ha caratterizzato le nostre origini.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:shadow-xl transition-all">
                <span className="material-symbols-outlined text-primary text-4xl mb-4">visibility</span>
                <h3 className="font-headline font-bold text-xl mb-2">Vision</h3>
                <p className="text-on-surface-variant text-sm">Essere l'acceleratore tecnologico preferito dalle aziende che puntano all'eccellenza globale.</p>
             </div>
             <div className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:shadow-xl transition-all">
                <span className="material-symbols-outlined text-primary text-4xl mb-4">bolt</span>
                <h3 className="font-headline font-bold text-xl mb-2">Mission</h3>
                <p className="text-on-surface-variant text-sm">Progettare e costruire ecosistemi digitali sicuri, scalabili e orientati al futuro.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="font-headline text-4xl font-bold text-on-surface mb-16">I Nostri Valori</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="group p-8 bg-surface rounded-xl border border-outline-variant/10 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10">
                  <span className="material-symbols-outlined text-primary text-3xl">{v.icon}</span>
                </div>
                <h4 className="font-headline font-bold text-xl mb-3">{v.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface">Main Contributors</h2>
            <p className="text-on-surface-variant text-lg mt-4">Il cuore pulsante di ogni nostra innovazione.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, i) => (
              <div key={i} className="group relative bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 hover:border-primary/30 transition-all duration-300">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-on-primary-container font-headline text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">
                  {member.initials}
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-1">{member.name}</h3>
                <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience / Tech Stack Banner */}
      <section className="py-24 bg-on-surface text-surface">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">Oltre la Consulenza: Partnership Strategica</h2>
              <p className="text-surface-variant text-lg opacity-80">Non siamo solo fornitori di codice. Siamo ingegneri che si sporcano le mani con l'hardware e sognano con l'IA per dare a ogni cliente un vantaggio competitivo reale.</p>
           </div>
           <Link to="/contatti" className="px-10 py-5 bg-primary text-on-primary rounded-xl font-bold hover:brightness-110 transition-all shadow-xl shadow-primary/20">
              Lavora con Noi
           </Link>
        </div>
      </section>
    </main>
  );
};

export default ChiSiamo;

export default ChiSiamo;
