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
            color: 'bg-surface/50 border-outline-variant/30 text-on-surface'
        },
        {
            name: 'Gemini 1.5 Pro',
            vendor: 'Google',
            bestFor: 'Massive Context (2M tokens)',
            color: 'bg-primary/10 border-primary/30 text-primary'
        },
        {
            name: 'LLaMA 3.3 70B',
            vendor: 'Meta via Groq',
            bestFor: 'Open-Source Performance',
            color: 'bg-surface/50 border-outline-variant/30 text-on-surface'
        },
        {
            name: 'GPT-4o',
            vendor: 'OpenAI',
            bestFor: 'Versatility & Vision',
            color: 'bg-surface/50 border-outline-variant/30 text-on-surface'
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
        <main className="relative pt-32 pb-section-gap">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-tech-grid opacity-50"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Hero Section */}
            <header className="relative z-10 py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-8 border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary pulse-indicator"></span>
                    <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest">Agentic Intelligence Squad</span>
                </div>
                <h1 className="font-display-lg text-display-lg text-on-surface mb-8">
                    Agentic <br /><span className="text-primary">Orchestration</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-outline-variant pl-4">
                    Sviluppiamo la prossima generazione di assistenti autonomi integrando i modelli più avanzati di <span className="text-primary font-bold">Anthropic</span>, <span className="text-primary font-bold">Google</span> e <span className="text-primary font-bold">Meta</span>.
                </p>
            </header>

            {/* Model Stack Marquee/Grid */}
            <section className="relative z-10 py-24 border-y border-white/5 bg-surface/30 backdrop-blur-xl">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                    <h2 className="font-label-mono text-label-mono text-primary uppercase tracking-[0.3em] mb-12 text-center">Inference & Reasoning Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
                        {modelStack.map((m, i) => (
                            <div key={i} className={`p-8 rounded border glass-card-hover ${m.color} flex flex-col justify-between h-48`}>
                                <div>
                                    <span className="font-label-mono text-[10px] uppercase opacity-60 tracking-widest">{m.vendor}</span>
                                    <h3 className="font-headline-lg text-headline-lg mt-1 tracking-tight">{m.name}</h3>
                                </div>
                                <div className="font-label-mono text-[10px] uppercase tracking-widest">Best for: {m.bestFor}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="relative z-10 py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {coreCapabilities.map((cap, i) => (
                        <div key={i} className="group">
                            <div className="w-16 h-16 rounded bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                                <span className="material-symbols-outlined text-primary text-4xl group-hover:text-on-primary">{cap.icon}</span>
                            </div>
                            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4 tracking-tight">{cap.title}</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{cap.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Selected Projects Showcase */}
            <section className="relative z-10 py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div>
                        <h2 className="font-display-lg text-display-lg text-on-surface mb-4">AI Focus</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">Integrazioni reali di modelli allo stato dell'arte in architetture agentiche complesse.</p>
                    </div>
                </div>

                <div className="space-y-40">
                    {projects.map((project, i) => (
                        <article key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center group`}>
                            <div className="w-full md:w-1/2 relative overflow-hidden rounded border border-outline-variant bg-surface/50 backdrop-blur-xl shadow-2xl">
                                <img
                                    className="w-full h-[500px] object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                                    src={project.image}
                                    alt={project.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-60"></div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-8">
                                <div className="flex flex-wrap gap-3">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="px-4 py-1 rounded font-label-mono text-[10px] bg-primary/10 text-primary uppercase tracking-[0.2em] border border-primary/20">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="font-headline-lg text-display-lg text-on-surface tracking-tight leading-none">{project.title}</h3>
                                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{project.description}</p>
                                <button className="inline-flex items-center gap-4 font-label-mono text-primary font-bold hover:text-primary-fixed-dim transition-all group/btn">
                                    Technical Specs <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA Final */}
            <section className="relative z-10 py-40 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                <div className="p-16 md:p-24 bg-surface border border-outline-variant rounded-xl text-center shadow-3xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
                    <h2 className="font-display-lg text-display-lg text-on-surface mb-10 relative z-10">Porta l'Intelligenza <br />Agentica nella tua Azienda.</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12 relative z-10 font-light">Dall'inferenza ultra-rapida su Groq all'analisi multimodale con Gemini 1.5 Pro.</p>
                    <Link to="/contatti" className="inline-block px-12 py-5 bg-primary text-on-primary rounded font-label-mono text-label-mono uppercase tracking-widest hover:bg-primary-container transition-all relative z-10 shadow-2xl">
                        Schedule AI Audit
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default AiSecurity;

