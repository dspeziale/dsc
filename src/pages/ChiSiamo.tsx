import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Users, Award, Zap, ArrowRight } from 'lucide-react';

const ChiSiamo = () => {
  const values = [
    {
      icon: <Target size={32} />,
      title: 'Innovazione',
      description:
        'Siamo sempre alla ricerca delle soluzioni tecnologiche più avanzate per i nostri clienti.',
    },
    {
      icon: <Heart size={32} />,
      title: 'Passione',
      description:
        'Amiamo quello che facciamo e questo si riflette nella qualità del nostro lavoro.',
    },
    {
      icon: <Users size={32} />,
      title: 'Collaborazione',
      description:
        'Lavoriamo a stretto contatto con i clienti per raggiungere obiettivi comuni.',
    },
    {
      icon: <Award size={32} />,
      title: 'Eccellenza',
      description:
        'Puntiamo sempre al massimo della qualità in ogni progetto che realizziamo.',
    },
  ];

  const team = [
    {
      name: 'Daniele Speziale',
      role: 'CEO & Founder',
      description: 'Oltre 35 anni di esperienza nel settore IT e nella gestione di progetti software.',
    },
    {
      name: 'Fabrizio Manni',
      role: 'CTO',
      description: 'Esperto di architetture software e tecnologie cloud con background in aziende multinazionali.',
    },
    {
      name: 'Claudio Rapisardi',
      role: 'Lead Developer',
      description: 'Full-stack developer specializzato in Python, React, Node.js e sviluppo mobile.',
    },
    {
      name: 'Anna Graminini',
      role: 'UX/UI Designer',
      description: 'Designer con focus su user experience e interfacce intuitive e accessibili.',
    },
  ];

  return (
    <main className="pt-20">
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Chi Siamo</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Un team di professionisti appassionati di tecnologia
          </p>
        </div>
      </section>

      {/* About Intro */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">La Nostra Storia</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                DS Consulting nasce dalla passione per la tecnologia e dalla volontà
                di offrire soluzioni software di alta qualità alle aziende italiane.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Fondata con l'obiettivo di colmare il gap tra le esigenze aziendali
                e le potenzialità della tecnologia moderna, DS Consulting si è
                rapidamente affermata come partner affidabile per lo sviluppo di
                soluzioni digitali innovative.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Il nostro team unisce competenze diverse - dallo sviluppo web al
                mobile, dall'hardware all'intelligenza artificiale - per offrire
                un servizio completo e personalizzato.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-accent/10 to-secondary/10 p-8 rounded-2xl border-l-4 border-accent">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center text-white">
                    <Eye size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3">Vision</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Essere il punto di riferimento per l'innovazione digitale delle PMI italiane.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary/10 to-success/10 p-8 rounded-2xl border-l-4 border-secondary">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center text-white">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-3">Mission</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Trasformare le idee in soluzioni tecnologiche concrete e di valore.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container">
          <h2 className="section-title">I Nostri Valori</h2>
          <p className="section-subtitle">
            I principi che guidano ogni nostra decisione e azione
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl text-center shadow-custom hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Il Nostro Team</h2>
          <p className="section-subtitle">
            Professionisti esperti pronti a realizzare il tuo progetto
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center group">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                <span className="inline-block px-4 py-1 bg-accent/10 text-accent font-semibold rounded-full text-sm mb-4">
                  {member.role}
                </span>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container">
          <div className="bg-gradient-to-br from-accent to-accent-dark rounded-3xl p-12 md:p-16 text-center text-white shadow-custom-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vuoi far parte del nostro team?</h2>
            <p className="text-lg md:text-xl opacity-95 mb-8">
              Siamo sempre alla ricerca di talenti appassionati di tecnologia
            </p>
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-accent font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl uppercase tracking-wide"
            >
              Contattaci
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChiSiamo;
