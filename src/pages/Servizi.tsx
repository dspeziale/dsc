import { Link } from 'react-router-dom';
import {
  Monitor,
  Smartphone,
  Cpu,
  Code2,
  Database,
  Cloud,
  Shield,
  ArrowRight,
} from 'lucide-react';
import './Servizi.css';

const Servizi = () => {
  const services = [
    {
      icon: <Monitor size={40} />,
      title: 'Sviluppo Web',
      description:
        'Creiamo applicazioni web moderne e performanti utilizzando le tecnologie piu avanzate come React, Vue, Node.js e molto altro.',
      features: [
        'Single Page Applications (SPA)',
        'E-commerce personalizzati',
        'Portali aziendali',
        'Dashboard e pannelli di controllo',
      ],
    },
    {
      icon: <Smartphone size={40} />,
      title: 'Sviluppo Mobile',
      description:
        'Sviluppiamo app mobile native e cross-platform che offrono prestazioni eccellenti su iOS e Android.',
      features: [
        'App iOS native (Swift)',
        'App Android native (Kotlin)',
        'App cross-platform (React Native, Flutter)',
        'Progressive Web Apps (PWA)',
      ],
    },
    {
      icon: <Cpu size={40} />,
      title: 'Soluzioni Hardware',
      description:
        'Integriamo software e hardware per creare soluzioni embedded, IoT e sistemi di automazione su misura.',
      features: [
        'Sistemi IoT e sensori',
        'Automazione industriale',
        'Firmware personalizzato',
        'Prototipazione rapida',
      ],
    },
    {
      icon: <Code2 size={40} />,
      title: 'Sviluppo Software',
      description:
        'Progettiamo e sviluppiamo software gestionale e applicazioni desktop personalizzate per le tue esigenze.',
      features: [
        'Software gestionale ERP',
        'Applicazioni desktop',
        'Integrazioni API',
        'Migrazione sistemi legacy',
      ],
    },
    {
      icon: <Database size={40} />,
      title: 'Database e Big Data',
      description:
        'Gestiamo e ottimizziamo database relazionali e NoSQL, con soluzioni per analisi e gestione dei big data.',
      features: [
        'Progettazione database',
        'Ottimizzazione performance',
        'Data warehousing',
        'Business Intelligence',
      ],
    },
    {
      icon: <Cloud size={40} />,
      title: 'Cloud e DevOps',
      description:
        'Supportiamo la migrazione al cloud e implementiamo pipeline CI/CD per deployment automatizzati.',
      features: [
        'AWS, Azure, Google Cloud',
        'Docker e Kubernetes',
        'CI/CD pipelines',
        'Monitoraggio e logging',
      ],
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Analisi',
      description: 'Studiamo le tue esigenze e definiamo i requisiti del progetto.',
    },
    {
      step: '02',
      title: 'Progettazione',
      description: 'Creiamo architettura, wireframe e design della soluzione.',
    },
    {
      step: '03',
      title: 'Sviluppo',
      description: 'Implementiamo la soluzione con metodologie agili.',
    },
    {
      step: '04',
      title: 'Testing',
      description: 'Testiamo accuratamente per garantire qualita e sicurezza.',
    },
    {
      step: '05',
      title: 'Deployment',
      description: 'Rilasciamo il prodotto e forniamo formazione.',
    },
    {
      step: '06',
      title: 'Supporto',
      description: 'Assistenza continua e manutenzione evolutiva.',
    },
  ];

  return (
    <main className="servizi">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">I Nostri Servizi</h1>
          <p className="page-subtitle">
            Soluzioni tecnologiche complete per ogni esigenza aziendale
          </p>
        </div>
      </section>

      <section className="services-list section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-item card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, i) => (
                    <li key={i}>
                      <Shield size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process section">
        <div className="container">
          <h2 className="section-title">Il Nostro Processo</h2>
          <p className="section-subtitle">
            Un approccio strutturato per garantire il successo del tuo progetto
          </p>
          <div className="process-grid">
            {process.map((item, index) => (
              <div key={index} className="process-item">
                <span className="process-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta section">
        <div className="container">
          <div className="cta-box">
            <h2>Hai un progetto in mente?</h2>
            <p>
              Parliamone insieme. Analizziamo le tue esigenze e troviamo la
              soluzione migliore per te.
            </p>
            <Link to="/contatti" className="btn btn-primary">
              Richiedi una consulenza
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Servizi;
