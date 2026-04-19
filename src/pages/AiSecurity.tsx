import { Link } from 'react-router-dom';

const AiSecurity = () => {
    const coreCapabilities = [
        {
            title: 'AI Architecture',
            icon: 'neurology',
            description: 'Progettazione di sistemi basati su LLM, RAG e agenti autonomi per l\'automazione intelligente.'
        },
        {
            title: 'Cyber Orchestration',
            icon: 'security',
            description: 'Infrastrutture di sicurezza proattive con monitoraggio in tempo reale e threat intelligence.'
        },
        {
            title: 'Data Intelligence',
            icon: 'database',
            description: 'Trasformazione di Big Data in insight azionabili attraverso modelli predittivi avanzati.'
        }
    ];

    const projects = [
        {
            title: 'CoSearch AI Agent',
            tags: ['Python', 'LLaMA', 'Groq'],
            description: 'Semantic search solution designed for Teams, leveraging advanced LLMs for real-time document retrieval and context-aware query processing.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0q6C3ApJ980Jjir9fIouk0nQLTLby1mjA7SQzQHMwsdmbqVH9t_s63QZ-mM9uQVLqHfTccz4gKKStoikTLdSGxfZzmVsj3zQuoIV6UX-dY6_nKHXEAIWsdwEBLpnqUM83wKaGUfRUvlKCIKDj9YrXRF61wO35IqZGbled3jCFS6sqyMfWM8lrC3W52Ybkq3n7tXgvEO6uDoll7QDMuIFsaUW5-fM6FA3Y2T558Via8eJwMAG7y0xiOEuUL5TQfUN681yYafQEyCoo'
        },
        {
            title: 'Impulse RAG',
            tags: ['Flask', 'RAG', 'AI'],
            description: 'Automatic FAQ generation system utilizing Retrieval-Augmented Generation to transform unstructured documentation into interactive knowledge bases.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVcAFxqE6oQgFOmcM2iXwNnCjeJ21xAc0L06xH8t6TtTW6G__uAmC7m_ZsWoDe0kfKjcqpJTy_d3YlppBrreT4Ok9jROBtm6E0W3aAR2nyCOwSW4xzQow7S5fqKZ4aAZQY45eX-W7l3X5lKTo7TVfC0BVrVDuBh3IC2TZWDrMj8gp9_Tg8Weh9HS--biGwYyzcPs4Ac6HNk2mS2TF7R3oL0q9aKYxBOyxGggUeGhP5r1xEhXuc0GbCN5fnA2q6g-Be9VAB2IoTH8xi'
        },
        {
            title: 'Ranger AI',
            tags: ['Security', 'Analysis', 'AI'],
            description: 'High-speed security log ingestion engine. Analyzes millions of events per second to detect anomalies using machine learning heuristics.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-bxJ7zi6S-9vlNqp7mzEMZbKau2gToxjtFzkk40eGItjSlrsLRruS2PWpRVU-pknOH32nYf0yG4akdTZEtGgB9e8EhoZ12DFuB4zhmNKOeaHzR3nsKy9pKi0aB3fYtr3Oe3Pb5Xe703DocH7tAGd5AY2LqP7FOYpP8gcj28-5sJCiuOnbzoCdUKcJqVm5OEyKtymZnQivTE6H0uJC_mla6Wy-HMo3XxKJMPLv5oRTvRH6n1SGtm2vYqGtDrc2hEUiUcyvEZZQkBxW'
        },
        {
            title: 'Network Scanner',
            tags: ['NMAP', 'Networking', 'Python'],
            description: 'Sophisticated NMAP orchestration tool for continuous network surface mapping and vulnerability identification in enterprise environments.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUbR0foELUSb89hBI81jDKC89o5YWGTC2xp0BaCXKvbNj7y6mPxfETxjgopHkrB0XNmh4uqNgJxJI9f0RItL1SoSH6W_UTmOEnMuwYocbyWh_TokhCEm_PtytDaALw9GNsDwbkSB9MwyFRXhjCbD8lu_GXoQC5E09v-yurW-liwOPH-9dIIhI3eNcjCvvm81D0HEBMZcSewDoSme5wU7mm7GBAWz-rTX4cVEs6m-NAxLK8nbY6JZm5GnTItwzgxCao3SqW4EgntFDg'
        }
    ];

    return (
        <main className="pt-20 bg-background text-on-surface min-h-screen">
            {/* Hero Section */}
            <header className="py-24 px-8 max-w-7xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-8 border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Vanguard Systems</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.95] mb-8 tracking-tighter opacity-0 translate-y-4 animate-fade-in">
                    AI & <br/><span className="text-gradient">Cyber Security</span>
                </h1>
                <p className="text-on-surface-variant text-xl md:text-2xl max-w-2xl leading-relaxed opacity-0 translate-y-4 animate-fade-in [animation-delay:200ms]">
                    Oltre il convenzionale. Sviluppiamo architetture AI resilienti e sistemi di difesa informatica orchestrati per l'era della Cognitive Computing.
                </p>
            </header>

            {/* Core Capabilities */}
            <section className="py-24 px-8 max-w-7xl mx-auto border-t border-outline-variant/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {coreCapabilities.map((cap, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/30 transition-all duration-500">
                            <span className="material-symbols-outlined text-primary text-5xl mb-6 group-hover:scale-110 transition-transform">{cap.icon}</span>
                            <h3 className="text-2xl font-headline font-bold mb-4">{cap.title}</h3>
                            <p className="text-on-surface-variant leading-relaxed">{cap.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Selected Projects Showcase */}
            <section className="py-32 px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Focus Tecnologico</h2>
                        <p className="text-on-surface-variant max-w-md">Un'immersione nelle nostre realizzazioni più avanzate tra intelligenza artificiale e sicurezza infrastrutturale.</p>
                    </div>
                    <div className="text-7xl font-headline font-black opacity-5 select-none hidden md:block">01 — 04</div>
                </div>

                <div className="space-y-32">
                    {projects.map((project, i) => (
                        <article key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-20 items-center group`}>
                            <div className="w-full md:w-1/2 relative overflow-hidden rounded-3xl bg-surface-container shadow-2xl">
                                <img 
                                    className="w-full h-[400px] object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 scale-105 group-hover:scale-100" 
                                    src={project.image} 
                                    alt={project.title} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="flex flex-wrap gap-3">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="px-4 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                                <h3 className="text-4xl font-headline font-bold tracking-tight">{project.title}</h3>
                                <p className="text-on-surface-variant text-lg leading-relaxed">{project.description}</p>
                                <button className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                                    Dettagli Tecnici <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-32 px-8">
                <div className="max-w-5xl mx-auto p-12 md:p-20 bg-on-surface text-surface rounded-[3rem] text-center shadow-3xl shadow-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 relative z-10">Mettiamo in sicurezza la tua innovazione AI.</h2>
                    <p className="text-surface-variant text-lg max-w-2xl mx-auto mb-10 opacity-80 relative z-10">Dalla threat intelligence alla mitigazione proattiva, costruiamo scudi digitali per architetture scalabili.</p>
                    <Link to="/contatti" className="inline-block px-12 py-5 bg-primary text-on-primary rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all relative z-10">
                        Inizia Consulenza
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default AiSecurity;
