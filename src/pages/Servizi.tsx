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

const Servizi = () => {
  const services = [
    {
      icon: <Monitor size={40} />,
      title: 'Sviluppo Web',
      description:
        'Creiamo applicazioni web moderne e performanti utilizzando le tecnologie più avanzate come React, Vue, Node.js e molto altro.',
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
      description: 'Testiamo accuratamente per garantire qualità e sicurezza.',
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
    <main className="pt-20">
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">I Nostri Servizi</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Soluzioni tecnologiche complete per ogni esigenza aziendale
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent-dark rounded-2xl text-white mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Shield size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container">
          <h2 className="section-title">Il Nostro Processo</h2>
          <p className="section-subtitle">
            Un approccio strutturato per garantire il successo del tuo progetto
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-2xl shadow-custom hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-accent"
              >
                <span className="absolute -top-6 left-8 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent to-secondary text-white font-bold text-xl rounded-full shadow-lg">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-primary mb-3 mt-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="bg-gradient-to-br from-accent to-accent-dark rounded-3xl p-12 md:p-16 text-center text-white shadow-custom-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hai un progetto in mente?</h2>
            <p className="text-lg md:text-xl opacity-95 mb-8 max-w-2xl mx-auto">
              Parliamone insieme. Analizziamo le tue esigenze e troviamo la
              soluzione migliore per te.
            </p>
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-accent font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl uppercase tracking-wide"
            >
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
