import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight leading-tight text-on-surface mb-8">
              Trasformiamo le tue idee in <span className="text-gradient">soluzioni digitali</span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              DS Consulting è il tuo partner tecnologico per lo sviluppo di software web, applicazioni mobile e soluzioni hardware innovative.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/contatti" className="px-8 py-4 bg-gradient-to-br from-primary-container to-primary text-on-primary-container rounded-lg font-bold shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all duration-300">
                Richiedi un Preventivo
              </Link>
              <Link to="/servizi" className="px-8 py-4 bg-surface-container border border-outline-variant/30 text-on-surface rounded-lg font-bold hover:bg-surface-container-high active:scale-95 transition-all duration-300">
                Scopri i Servizi
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-4/5 hidden lg:block opacity-40 mix-blend-screen pointer-events-none">
          <img 
            alt="Tech Abstract" 
            className="w-full h-full object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7NNBAYlxqqIouLIWHLeUqR-KB0XajJQyDx7Fpsb-NY79L1e55-kXZH9VK6a1D6Q45UlClj0d-ad6HA3Ns2HyN3vU-YPCJ3PJG7yjz5qkINR7ISVv7403BJu3wbbk79Z7Vhj2DhU1jlzPnQE9rFGWMacFxPoLmzl1eTyfwmU6QOmV-1AxB7oCAGFiyxpBEXecEl8YHHcHzm1KGKw6TD_cKaP3QrHIbGelCdHoMkVsfa9CnHap9_8ux3m8GWEjLoAOdFyh-rl_ilQvr"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-surface-container-low relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20 text-center">
            <span className="text-primary font-headline font-bold tracking-widest uppercase text-sm">Le Nostre Competenze</span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mt-4 text-on-surface">I Nostri Servizi</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group p-8 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">language</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">Sviluppo Web</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Creiamo piattaforme web scalabili, sicure e ad alte prestazioni, ottimizzate per ogni dispositivo e motore di ricerca.
              </p>
              <Link to="/servizi" className="flex items-center text-primary font-bold cursor-pointer hover:gap-2 transition-all">
                Scopri di più <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
            {/* Service Card 2 */}
            <div className="group p-8 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">smartphone</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">App Mobile</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Sviluppiamo applicazioni mobile native e cross-platform intuitive che offrono un'esperienza utente senza compromessi.
              </p>
              <Link to="/servizi" className="flex items-center text-primary font-bold cursor-pointer hover:gap-2 transition-all">
                Scopri di più <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
            {/* Service Card 3 */}
            <div className="group p-8 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">developer_board</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">Soluzioni Hardware</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Progettazione hardware su misura e integrazione IoT per trasformare il mondo fisico attraverso la tecnologia digitale.
              </p>
              <Link to="/servizi" className="flex items-center text-primary font-bold cursor-pointer hover:gap-2 transition-all">
                Scopri di più <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-headline font-bold tracking-widest uppercase text-sm">Valore Aggiunto</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold mt-4 mb-8 text-on-surface">Perché scegliere DS Consulting?</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Analisi Profonda</h4>
                    <p className="text-on-surface-variant">Studiamo il tuo business per trovare la soluzione tecnologica più efficace.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-primary">bolt</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Sviluppo Agile</h4>
                    <p className="text-on-surface-variant">Metodologie iterative per rilasci rapidi e feedback costanti.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined text-primary">support_agent</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Supporto Continuo</h4>
                    <p className="text-on-surface-variant">Non ti abbandoniamo mai: manutenzione e assistenza garantite.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute -z-10 inset-0 bg-primary/5 blur-[100px] rounded-full"></div>
              <div className="bg-surface-container-low p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="font-headline text-5xl font-bold text-primary mb-2">10+</span>
                <span className="text-on-surface-variant font-medium">Anni di esperienza</span>
              </div>
              <div className="bg-surface-container-low p-8 rounded-2xl flex flex-col items-center justify-center text-center mt-12">
                <span className="font-headline text-5xl font-bold text-primary mb-2">50+</span>
                <span className="text-on-surface-variant font-medium">Progetti completati</span>
              </div>
              <div className="bg-surface-container-low p-8 rounded-2xl flex flex-col items-center justify-center text-center -mt-12">
                <span className="font-headline text-4xl font-bold text-primary mb-2">100%</span>
                <span className="text-on-surface-variant font-medium">Clienti soddisfatti</span>
              </div>
              <div className="bg-surface-container-low p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="font-headline text-5xl font-bold text-primary mb-2">24/7</span>
                <span className="text-on-surface-variant font-medium">Supporto Tecnico</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative bg-surface-container-high border border-outline-variant/20">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Team Meeting" 
              className="w-full h-full object-cover opacity-20" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN-iuySfswKERrhmvJnY7S7hAhMVBxSy7Tqz85XzvzQ5sD3KEvLMVXrwwV4_N7eRG5bSRcDJqOR62mVJRgEUOqTkp3i016mPGP3Z58E9shszYIpdNrtX8Ganp5x7V7SCcl7lerYTSI8JK15YAAYxktWMmNPgMcq1PrAX-9SJ8GLmjQ6yixqT6HQAh6K0J-hUzqTPQ0_9x1FkhS2IS9WWEz20kMbuhekse9f6lNlbDx7tiPVRJWB7OXUSGMg7N2U7Y7YiKkHTeF1bjp"
            />
          </div>
          <div className="relative z-10 px-8 md:px-20 py-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-surface mb-4">Pronto a iniziare il tuo progetto?</h2>
              <p className="text-on-surface-variant text-lg">Parliamo della tua visione e trasformiamola in una realtà tecnologica di successo.</p>
            </div>
            <Link to="/contatti" className="shrink-0 px-10 py-5 bg-gradient-to-br from-primary-container to-primary text-on-primary-container rounded-xl font-bold text-lg shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center gap-3">
              Parliamone Insieme <span className="material-symbols-outlined">chat</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
