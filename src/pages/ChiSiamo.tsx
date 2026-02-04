import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Users, Award, Zap, ArrowRight } from 'lucide-react';
import './ChiSiamo.css';

const ChiSiamo = () => {
  const values = [
    {
      icon: <Target size={32} />,
      title: 'Innovazione',
      description:
        'Siamo sempre alla ricerca delle soluzioni tecnologiche piu avanzate per i nostri clienti.',
    },
    {
      icon: <Heart size={32} />,
      title: 'Passione',
      description:
        'Amiamo quello che facciamo e questo si riflette nella qualita del nostro lavoro.',
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
        'Puntiamo sempre al massimo della qualita in ogni progetto che realizziamo.',
    },
  ];

  const team = [
    {
      name: 'Marco Rossi',
      role: 'CEO & Founder',
      description: 'Oltre 15 anni di esperienza nel settore IT e nella gestione di progetti software.',
    },
    {
      name: 'Laura Bianchi',
      role: 'CTO',
      description: 'Esperta di architetture software e tecnologie cloud con background in aziende multinazionali.',
    },
    {
      name: 'Giuseppe Verdi',
      role: 'Lead Developer',
      description: 'Full-stack developer specializzato in React, Node.js e sviluppo mobile.',
    },
    {
      name: 'Anna Neri',
      role: 'UX/UI Designer',
      description: 'Designer con focus su user experience e interfacce intuitive e accessibili.',
    },
  ];

  return (
    <main className="chi-siamo">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Chi Siamo</h1>
          <p className="page-subtitle">
            Un team di professionisti appassionati di tecnologia
          </p>
        </div>
      </section>

      <section className="about-intro section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-content">
              <h2>La Nostra Storia</h2>
              <p>
                DS Consulting nasce dalla passione per la tecnologia e dalla volonta
                di offrire soluzioni software di alta qualita alle aziende italiane.
              </p>
              <p>
                Fondata con l'obiettivo di colmare il gap tra le esigenze aziendali
                e le potenzialita della tecnologia moderna, DS Consulting si e
                rapidamente affermata come partner affidabile per lo sviluppo di
                soluzioni digitali innovative.
              </p>
              <p>
                Il nostro team unisce competenze diverse - dallo sviluppo web al
                mobile, dall'hardware all'intelligenza artificiale - per offrire
                un servizio completo e personalizzato.
              </p>
            </div>
            <div className="intro-visual">
              <div className="visual-box">
                <div className="visual-item">
                  <Eye size={48} />
                  <h3>Vision</h3>
                  <p>Essere il punto di riferimento per l'innovazione digitale delle PMI italiane.</p>
                </div>
                <div className="visual-item">
                  <Zap size={48} />
                  <h3>Mission</h3>
                  <p>Trasformare le idee in soluzioni tecnologiche concrete e di valore.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values section">
        <div className="container">
          <h2 className="section-title">I Nostri Valori</h2>
          <p className="section-subtitle">
            I principi che guidano ogni nostra decisione e azione
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team section">
        <div className="container">
          <h2 className="section-title">Il Nostro Team</h2>
          <p className="section-subtitle">
            Professionisti esperti pronti a realizzare il tuo progetto
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card card">
                <div className="team-avatar">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section section">
        <div className="container">
          <div className="cta-box">
            <h2>Vuoi far parte del nostro team?</h2>
            <p>Siamo sempre alla ricerca di talenti appassionati di tecnologia</p>
            <Link to="/contatti" className="btn btn-primary">
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
