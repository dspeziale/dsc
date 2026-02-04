import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Cpu, CheckCircle } from 'lucide-react';
import './Home.css';

const Home = () => {
  const services = [
    {
      icon: <Monitor size={40} />,
      title: 'Sviluppo Web',
      description: 'Applicazioni web moderne, responsive e performanti con le tecnologie piu avanzate.',
    },
    {
      icon: <Smartphone size={40} />,
      title: 'App Mobile',
      description: 'App native e cross-platform per iOS e Android che offrono esperienze utente eccezionali.',
    },
    {
      icon: <Cpu size={40} />,
      title: 'Soluzioni Hardware',
      description: 'Integrazione hardware-software, IoT e sistemi embedded personalizzati.',
    },
  ];

  const features = [
    'Analisi approfondita delle esigenze',
    'Sviluppo agile e iterativo',
    'Codice pulito e manutenibile',
    'Supporto continuo post-lancio',
    'Formazione del personale',
    'Documentazione completa',
  ];

  return (
    <main className="home">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Trasformiamo le tue idee in
              <span className="highlight"> soluzioni digitali</span>
            </h1>
            <p className="hero-subtitle">
              DS Consulting e il tuo partner tecnologico per lo sviluppo di software web,
              applicazioni mobile e soluzioni hardware innovative.
            </p>
            <div className="hero-buttons">
              <Link to="/contatti" className="btn btn-primary">
                Richiedi un preventivo
                <ArrowRight size={20} />
              </Link>
              <Link to="/servizi" className="btn btn-secondary">
                Scopri i servizi
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-shape"></div>
            <div className="hero-code">
              <pre>
                <code>
{`const innovation = {
  web: true,
  mobile: true,
  hardware: true
};

DS.Consulting(innovation);`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="services-preview section">
        <div className="container">
          <h2 className="section-title">I Nostri Servizi</h2>
          <p className="section-subtitle">
            Offriamo soluzioni complete per ogni esigenza tecnologica della tua azienda
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/servizi" className="btn btn-primary">
              Vedi tutti i servizi
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="why-us section">
        <div className="container">
          <div className="why-us-grid">
            <div className="why-us-content">
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Perche scegliere DS Consulting?
              </h2>
              <p className="why-us-text">
                Con anni di esperienza nel settore IT, offriamo competenze trasversali
                che coprono l'intero ciclo di sviluppo software. Il nostro approccio
                consulenziale ci permette di comprendere a fondo le tue esigenze.
              </p>
              <ul className="features-list">
                {features.map((feature, index) => (
                  <li key={index}>
                    <CheckCircle size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="why-us-stats">
              <div className="stat-card">
                <span className="stat-number">10+</span>
                <span className="stat-label">Anni di esperienza</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">50+</span>
                <span className="stat-label">Progetti completati</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">Clienti soddisfatti</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto a iniziare il tuo progetto?</h2>
            <p>Contattaci oggi per una consulenza gratuita</p>
            <Link to="/contatti" className="btn btn-primary">
              Parliamone insieme
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
