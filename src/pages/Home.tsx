import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Cpu, CheckCircle } from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: <Monitor size={40} />,
      title: 'Sviluppo Web',
      description: 'Applicazioni web moderne, responsive e performanti con le tecnologie più avanzate.',
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
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center bg-gradient-to-br from-orange-50 via-white to-gray-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Trasformiamo le tue idee in
                <span className="relative inline-block ml-3">
                  <span className="text-gradient">soluzioni digitali</span>
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-accent/20 -z-10" />
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                DS Consulting è il tuo partner tecnologico per lo sviluppo di software web,
                applicazioni mobile e soluzioni hardware innovative.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/contatti" className="btn btn-primary">
                  Richiedi un preventivo
                  <ArrowRight size={20} />
                </Link>
                <Link to="/servizi" className="btn btn-secondary">
                  Scopri i servizi
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative flex justify-center items-center lg:order-first lg:order-last">
              {/* Animated shape */}
              <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-accent via-secondary to-success opacity-15 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-[morphing_8s_ease-in-out_infinite]" />

              {/* Code snippet */}
              <div className="relative bg-gradient-to-br from-primary-dark to-primary p-8 rounded-2xl shadow-custom-lg border-l-4 border-accent">
                <pre className="text-sm md:text-base">
                  <code className="text-blue-200 font-mono">
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
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">I Nostri Servizi</h2>
          <p className="section-subtitle">
            Offriamo soluzioni complete per ogni esigenza tecnologica della tua azienda
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card text-center group border-t-4 border-transparent hover:border-t-accent">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent-dark rounded-2xl text-white mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/servizi" className="btn btn-primary">
              Vedi tutti i servizi
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="section bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="section-title !text-left !mb-6">
                Perché scegliere DS Consulting?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-accent to-secondary rounded-full mb-6" />
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
                Con anni di esperienza nel settore IT, offriamo competenze trasversali
                che coprono l'intero ciclo di sviluppo software. Il nostro approccio
                consulenziale ci permette di comprendere a fondo le tue esigenze.
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-800 font-bold text-lg">
                    <CheckCircle size={20} className="text-success flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-6">
              <div className="bg-white p-8 rounded-2xl text-center shadow-custom border-l-4 border-accent transition-transform duration-300 hover:translate-x-2">
                <span className="block text-6xl font-bold text-gradient leading-none mb-2">10+</span>
                <span className="text-gray-600 font-bold">Anni di esperienza</span>
              </div>
              <div className="bg-white p-8 rounded-2xl text-center shadow-custom border-l-4 border-secondary transition-transform duration-300 hover:translate-x-2">
                <span className="block text-6xl font-bold text-gradient leading-none mb-2">50+</span>
                <span className="text-gray-600 font-bold">Progetti completati</span>
              </div>
              <div className="bg-white p-8 rounded-2xl text-center shadow-custom border-l-4 border-success transition-transform duration-300 hover:translate-x-2">
                <span className="block text-6xl font-bold text-gradient leading-none mb-2">100%</span>
                <span className="text-gray-600 font-bold">Clienti soddisfatti</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-accent to-accent-dark py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-white/10 rounded-full" />

        <div className="container relative">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pronto a iniziare il tuo progetto?</h2>
            <p className="text-xl md:text-2xl opacity-95 mb-8">Contattaci oggi per una consulenza gratuita</p>
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-accent font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl uppercase tracking-wide"
            >
              Parliamone insieme
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes morphing {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          50% {
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          }
        }
      `}</style>
    </main>
  );
};

export default Home;
