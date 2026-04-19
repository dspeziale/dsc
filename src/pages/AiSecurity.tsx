import { Link } from 'react-router-dom';

const AiSecurity = () => {
    const coreCapabilities = [
        {
            title: 'Agentic Frameworks',
            icon: 'hub',
            description: 'Implementazione di pattern ReAct e Plan-and-Solve utilizzando Claude 3.5 Sonnet e GPT-4o.'
        },
        {
            title: 'Inferenza Ultra-Rapida',
            icon: 'bolt',
            description: 'Ottimizzazione di LLaMA 3.3 70B via Groq per applicazioni real-time a bassa latenza.'
        },
        {
            title: 'Multimodal RAG',
            icon: 'database',
            description: 'Architetture di recupero avanzato con Gemini 1.5 Pro per l\'analisi di video, audio e documenti complessi.'
        }
    ];

    const modelStack = [
        {
            name: 'Claude 3.5 Sonnet',
            vendor: 'Anthropic',
            bestFor: 'Coding & Reasoning',
            color: 'bg-[#f5f5f7] text-[#1d1d1f]'
        },
        {
            name: 'Gemini 1.5 Pro',
            vendor: 'Google',
            bestFor: 'Massive Context (2M tokens)',
            color: 'bg-primary text-white'
        },
        {
            name: 'LLaMA 3.3 70B',
            vendor: 'Meta via Groq',
            bestFor: 'Open-Source Performance',
            color: 'bg-emerald-500 text-slate-900'
        },
        {
            name: 'GPT-4o',
            vendor: 'OpenAI',
            bestFor: 'Versatility & Vision',
            color: 'bg-slate-800 text-white'
        }
    ];

    const projects = [
        {
            title: 'CoSearch AI Agent',
            tags: ['Claude 3.5', 'Groq', 'Vector DB'],
            description: 'Motore di ricerca semantica orchestrato da Claude 3.5 Sonnet. Utilizza Groq per il preprocessing rapido dei testi e LLaMA 3.3 per la sintesi finale dei risultati in millisecondi.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0q6C3ApJ980Jjir9fIouk0nQLTLby1mjA7SQzQHMwsdmbqVH9t_s63QZ-mM9uQVLqHfTccz4gKKStoikTLdSGxfZzmVsj3zQuoIV6UX-dY6_nKHXEAIWsdwEBLpnqUM83wKaGUfRUvlKCIKDj9YrXRF61wO35IqZGbled3jCFS6sqyMfWM8lrC3W52Ybkq3n7tXgvEO6uDoll7QDMuIFsaUW5-fM6FA3Y2T558Via8eJwMAG7y0xiOEuUL5TQfUN681yYafQEyCoo'
        },
        {
            title: 'Impulse RAG Orchestrator',
            tags: ['Gemini 1.5', 'RAG', 'Agentic'],
            description: 'Sistema di knowledge management che sfrutta il context window di 2M di Gemini 1.5 Pro per analizzare interi repository di documentazione tecnica senza perdita di contesto.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVcAFxqE6oQgFOmcM2iXwNnCjeJ21xAc0L06xH8t6TtTW6G__uAmC7m_ZsWoDe0kfKjcqpJTy_d3YlppBrreT4Ok9jROBtm6E0W3aAR2nyCOwSW4xzQow7S5fqKZ4aAZQY45eX-W7l3X5lKTo7TVfC0BVrVDuBh3IC2TZWDrMj8gp9_Tg8Weh9HS--biGwYyzcPs4Ac6HNk2mS2TF7R3oL0q9aKYxBOyxGggUeGhP5r1xEhXuc0GbCN5fnA2q6g-Be9VAB2IoTH8xi'
        }
    ];

    return (
        <main className="pt-20 bg-[#0f172a] text-white min-h-screen">
            {/* Hero Section */}
            <header className="py-24 px-8 max-w-7xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 mb-8 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Agentic Intelligence Squad</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-headline font-bold leading-[0.85] mb-8 tracking-tighter">
                   Agentic <br/><span className="text-gradient">Orchestration</span>
                </h1>
                <p className="text-slate-400 text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
                    Sviluppiamo la prossima generazione di assistenti autonomi integrando i modelli più avanzati di <span className="text-emerald-400 font-bold">Anthropic</span>, <span className="text-emerald-400 font-bold">Google</span> e <span className="text-emerald-400 font-bold">Meta</span>.
                </p>
            </header>

            {/* Model Stack Marquee/Grid */}
            <section className="py-24 border-y border-white/5 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-xs font-bold text-emerald-500 uppercase tracking-[0.3em] mb-12 text-center">Inference & Reasoning Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {modelStack.map((m, i) => (
                            <div key={i} className={`p-8 rounded-2xl ${m.color} flex flex-col justify-between h-48 transition-transform hover:-translate-y-2`}>
                                <div>
                                    <span className="text-[10px] font-bold uppercase opacity-60 tracking-widest">{m.vendor}</span>
                                    <h3 className="text-2xl font-bold font-headline mt-1 tracking-tight">{m.name}</h3>
                                </div>
                                <div className="text-xs font-bold">Best for: {m.bestFor}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="py-32 px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {coreCapabilities.map((cap, i) => (
                        <div key={i} className="group">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:bg-emerald-500 transition-all duration-500">
                                <span className="material-symbols-outlined text-emerald-400 text-4xl group-hover:text-slate-900">{cap.icon}</span>
                            </div>
                            <h3 className="text-3xl font-headline font-bold mb-4 tracking-tight">{cap.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-lg">{cap.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Selected Projects Showcase */}
            <section className="py-32 px-8 max-w-7xl mx-auto border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tighter">AI Focus</h2>
                        <p className="text-slate-400 max-w-md text-lg">Integrazioni reali di modelli allo stato dell'arte in architetture agentiche complesse.</p>
                    </div>
                </div>

                <div className="space-y-40">
                    {projects.map((project, i) => (
                        <article key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center group`}>
                            <div className="w-full md:w-1/2 relative overflow-hidden rounded-3xl bg-slate-800 shadow-2xl">
                                <img 
                                    className="w-full h-[500px] object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
                                    src={project.image} 
                                    alt={project.title} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-8">
                                <div className="flex flex-wrap gap-3">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em]">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">{project.title}</h3>
                                <p className="text-slate-400 text-xl leading-relaxed font-light">{project.description}</p>
                                <button className="inline-flex items-center gap-4 text-emerald-400 font-bold hover:text-emerald-300 transition-all text-lg group/btn">
                                    Technical Specs <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-40 px-8">
                <div className="max-w-5xl mx-auto p-16 md:p-24 bg-gradient-to-br from-emerald-500 to-primary text-white rounded-[3rem] text-center shadow-3xl shadow-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-4xl md:text-6xl font-headline font-bold mb-10 relative z-10 leading-tight">Porta l'Intelligenza <br/>Agentica nella tua Azienda.</h2>
                    <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12 relative z-10 font-light">Dall'inferenza ultra-rapida su Groq all'analisi multimodale con Gemini 1.5 Pro.</p>
                    <Link to="/contatti" className="inline-block px-12 py-5 bg-white text-slate-900 rounded-2xl font-bold text-xl hover:scale-105 active:scale-95 transition-all relative z-10 shadow-2xl">
                        Schedule AI Audit
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default AiSecurity;
