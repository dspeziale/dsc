import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0f172a]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Agentic Era Orchestration</span>
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white mb-8">
              Sviluppo <br/><span className="text-gradient">Agentico</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-2xl leading-relaxed mb-12 max-w-2xl font-light">
              Progettiamo ecosistemi autonomi sfruttando la potenza di <span className="text-white font-bold">Claude 3.5</span>, <span className="text-white font-bold">Gemini 1.5 Pro</span> e <span className="text-white font-bold">LLaMA 3.3</span> per scalabilità senza precedenti.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/contatti" className="px-8 py-4 bg-emerald-500 text-slate-900 rounded-xl font-bold shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 active:scale-95 transition-all duration-300">
                Avvia Progetto AI
              </Link>
              <Link to="/servizi" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all duration-300 backdrop-blur-md">
                Esplora Frameworks
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-4/5 hidden lg:block opacity-20 mix-blend-screen pointer-events-none">
          <img 
            alt="AI Network" 
            className="w-full h-full object-contain grayscale invert" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7NNBAYlxqqIouLIWHLeUqR-KB0XajJQyDx7Fpsb-NY79L1e55-kXZH9VK6a1D6Q45UlClj0d-ad6HA3Ns2HyN3vU-YPCJ3PJG7yjz5qkINR7ISVv7403BJu3wbbk79Z7Vhj2DhU1jlzPnQE9rFGWMacFxPoLmzl1eTyfwmU6QOmV-1AxB7oCAGFiyxpBEXecEl8YHHcHzm1KGKw6TD_cKaP3QrHIbGelCdHoMkVsfa9CnHap9_8ux3m8GWEjLoAOdFyh-rl_ilQvr"
          />
        </div>
      </section>

      {/* Models Section (New) */}
      <section className="py-20 bg-[#0f172a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="text-white font-headline font-bold text-xl flex items-center gap-3">ANTHROPIC CLAUDE</div>
           <div className="text-white font-headline font-bold text-xl flex items-center gap-3">GOOGLE GEMINI PRO</div>
           <div className="text-white font-headline font-bold text-xl flex items-center gap-3">GROQ LLaMA 3.3</div>
           <div className="text-white font-headline font-bold text-xl flex items-center gap-3">OPENAI GPT-4o</div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20 text-center md:text-left">
            <span className="text-emerald-600 font-headline font-bold tracking-widest uppercase text-xs">Core Tech</span>
            <h2 className="font-headline text-4xl md:text-6xl font-bold mt-4 text-slate-900 tracking-tight">Soluzioni Verticali</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group p-8 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                <span className="material-symbols-outlined text-emerald-600 text-3xl group-hover:text-white">hub</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-slate-900 mb-4">Sviluppo Agentico</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Orchestrazione di agenti multi-modali per l'automazione di task complessi tramite RAG e Tool-Use.
              </p>
              <Link to="/ai-security" className="flex items-center text-emerald-600 font-bold cursor-pointer hover:gap-2 transition-all">
                Dettagli Modelli <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
            {/* Service Card 2 */}
            <div className="group p-8 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                <span className="material-symbols-outlined text-emerald-600 text-3xl group-hover:text-white">terminal</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-slate-900 mb-4">Sviluppo Web/Cloud</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Piattaforme scalabili built-to-last con architetture serverless e database distribuiti ad alte performance.
              </p>
              <Link to="/servizi" className="flex items-center text-emerald-600 font-bold cursor-pointer hover:gap-2 transition-all">
                Architetture <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
            {/* Service Card 3 */}
            <div className="group p-8 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                <span className="material-symbols-outlined text-emerald-600 text-3xl group-hover:text-white">security</span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-slate-900 mb-4">Cyber Orchestration</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Sicurezza proattiva integrata con AI per il monitoraggio continuo e la risposta rapida alle minacce.
              </p>
              <Link to="/ai-security" className="flex items-center text-emerald-600 font-bold cursor-pointer hover:gap-2 transition-all">
                Security Stack <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-emerald-600 font-headline font-bold tracking-widest uppercase text-xs">Standard di Eccellenza</span>
              <h2 className="font-headline text-4xl md:text-6xl font-bold mt-4 mb-8 text-slate-900 tracking-tight">Perché DS Consulting?</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <span className="material-symbols-outlined text-emerald-600">bolt</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">Velocità Inferenziale</h4>
                    <p className="text-slate-600">Ottimizzazione tramite Groq e LLaMA 3.3 per risposte in millisecondi.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <span className="material-symbols-outlined text-emerald-600">psychology</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">Agentic Orchestration</h4>
                    <p className="text-slate-600">Uso avanzato di Claude e Gemini per task cognitivi complessi e multi-step.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                    <span className="material-symbols-outlined text-emerald-600">verified_user</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">Security-First AI</h4>
                    <p className="text-slate-600">Ogni integrazione AI è schermata da protocolli di sicurezza enterprise.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="absolute -z-10 inset-0 bg-emerald-500/5 blur-[100px] rounded-full"></div>
              <div className="bg-slate-50 p-8 rounded-3xl flex flex-col items-center justify-center text-center border border-slate-100">
                <span className="font-headline text-5xl font-bold text-emerald-600 mb-2">10+</span>
                <span className="text-slate-600 font-medium text-xs uppercase tracking-widest">Anni di expertise</span>
              </div>
              <div className="bg-slate-900 p-8 rounded-3xl flex flex-col items-center justify-center text-center mt-12">
                <span className="font-headline text-5xl font-bold text-emerald-400 mb-2">50+</span>
                <span className="text-emerald-100/50 font-medium text-xs uppercase tracking-widest">Sistemi AI Live</span>
              </div>
              <div className="bg-slate-900 p-8 rounded-3xl flex flex-col items-center justify-center text-center -mt-12">
                <span className="font-headline text-4xl font-bold text-emerald-400 mb-2">100%</span>
                <span className="text-emerald-100/50 font-medium text-xs uppercase tracking-widest">Sicurezza Garantita</span>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl flex flex-col items-center justify-center text-center border border-slate-100">
                <span className="font-headline text-5xl font-bold text-emerald-600 mb-2">24/7</span>
                <span className="text-slate-600 font-medium text-xs uppercase tracking-widest">AI Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden relative bg-slate-900 shadow-2xl">
          <div className="relative z-10 px-8 md:px-20 py-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">Sei pronto per l'era <br/><span className="text-emerald-400">Agentica?</span></h2>
              <p className="text-slate-400 text-lg">Integriamo i modelli più potenti al mondo nel tuo workflow aziendale.</p>
            </div>
            <Link to="/contatti" className="shrink-0 px-10 py-5 bg-emerald-500 text-slate-900 rounded-xl font-bold text-lg shadow-2xl shadow-emerald-500/30 hover:bg-emerald-400 active:scale-95 transition-all duration-300 flex items-center gap-3">
              Inizia la Trasformazione <span className="material-symbols-outlined">rocket_launch</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
