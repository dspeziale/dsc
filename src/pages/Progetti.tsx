import { useState } from 'react';
import { Link } from 'react-router-dom';

const Progetti = () => {
    const [filter, setFilter] = useState('All');

    const projects = [
        {
            title: 'DSC Tracker',
            description: 'Sistema avanzato di tracciamento GPS per la gestione della flotta in tempo reale.',
            category: 'Web',
            image: 'https://www.digitalmatter.com/hubfs/Imported_Blog_Media/Blog-Post-image-17-1.jpg',
            tags: ['React', 'Node.js', 'Postgres'],
            url: 'https://dstracker.vercel.app/',
        },
        {
            title: 'Nexus Financial Engine',
            description: 'Piattaforma di analytics predittiva per il settore Fintech, focalizzata su scalabilità e visualizzazione dati.',
            category: 'Web',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcTEIjDVv7bixOfG5zZUB-1CEqXOi39mJPBd-5NB9j3JzwT2pNlFHEz1D8ktfMTO8QM8Qb5Q6UuuM4Mtqrx3Q8VzQHBkDCU1RMgubELxb0lZIPrqxRq9OKXXCTcbAy6jyM2WtF1LC_6U8ReIDIue4FMg0ldLaPYfCU3BcvsBFtGn_yHnilMladFXI45ew5AGDMokN_TIbEBx3DoWJ-y5-SU8V_k7ZqjpbU_aR3gNpwcTJBwq2MpGEhNhDVMBYZOYF2q4Ov-Cydg4j_',
            tags: ['Fintech', 'Analytics'],
            url: '#',
        },
        {
            title: 'Aurora Smart Factory',
            description: 'Integrazione di sistemi hardware e software per l\'automazione di impianti industriali.',
            category: 'Hardware',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDeMoG7NaPXDRQowC63Ye3z9OHKAjvOkA4N4OX9WgRCVEIFXYiPxs2oa7MgePcnNDDbRhWHyXovOwUKnU0EFsabNW7rx5GL5TwkjVymtQKtftkKRtUxR_SoByeqxYpHOBowlklbQ-FnbUbsjpbcKiELl-e0dWmxkqHH8ZByVHE7Zj5bAeRMgk8306Lht_xmdKuRZMuYUVnLH-te5yLHsjc8o2qNIRFLvDXTBBFZYbGWO-tvAdxs6Sr2_ivXfj2vXJsBnOr7DaTcguv',
            tags: ['IoT', 'Automation'],
            url: '#',
        },
        {
            title: 'CoSearch AI Agent',
            description: 'Soluzione di ricerca semantica per team, che sfrutta LLM avanzati per il recupero di documenti in tempo reale.',
            category: 'AI / Security',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0q6C3ApJ980Jjir9fIouk0nQLTLby1mjA7SQzQHMwsdmbqVH9t_s63QZ-mM9uQVLqHfTccz4gKKStoikTLdSGxfZzmVsj3zQuoIV6UX-dY6_nKHXEAIWsdwEBLpnqUM83wKaGUfRUvlKCIKDj9YrXRF61wO35IqZGbled3jCFS6sqyMfWM8lrC3W52Ybkq3n7tXgvEO6uDoll7QDMuIFsaUW5-fM6FA3Y2T558Via8eJwMAG7y0xiOEuUL5TQfUN681yYafQEyCoo',
            tags: ['Python', 'LLaMA', 'Groq'],
            url: '#',
        },
        {
            title: 'Impulse RAG',
            description: 'Sistema di generazione automatica di FAQ utilizzando RAG per trasformare documentazione in knowledge base.',
            category: 'AI / Security',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVcAFxqE6oQgFOmcM2iXwNnCjeJ21xAc0L06xH8t6TtTW6G__uAmC7m_ZsWoDe0kfKjcqpJTy_d3YlppBrreT4Ok9jROBtm6E0W3aAR2nyCOwSW4xzQow7S5fqKZ4aAZQY45eX-W7l3X5lKTo7TVfC0BVrVDuBh3IC2TZWDrMj8gp9_Tg8Weh9HS--biGwYyzcPs4Ac6HNk2mS2TF7R3oL0q9aKYxBOyxGggUeGhP5r1xEhXuc0GbCN5fnA2q6g-Be9VAB2IoTH8xi',
            tags: ['Flask', 'RAG', 'AI'],
            url: '#',
        },
        {
            title: 'Lux Concierge App',
            description: 'Esperienza mobile premium per servizi di lusso, con integrazione di AI per personalizzazione utente.',
            category: 'Mobile',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCZ76sHmtD95iEv_xOi3FyamqxFb_vnsm90KEUP_mRIWuNmhEVwa_Dhrsf8SQjyvRJyqC2q9aM8RDEDbmoMiPhxTa0WvUyRTVduD0njFELIhOm_d9bHRjabreb7VYNNdN5HBRAl2j-pbhT7cwIVTC7mAROHJt__0O9X2KmlHwKpENzV67ZgKr0zv1zrgfLRMf1eJ5XoG5W8bt8X8bcsZHZH-FlKNSRIxTK5mEwQ5GjqLGQDEF8VBxUUEdfhZ1kSLYrB9mwIn-CYkwC',
            tags: ['React Native', 'AI'],
            url: '#',
        },
    ];

    const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

    return (
        <main className="relative pt-32 pb-section-gap overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-blueprint opacity-50"></div>
            <div className="absolute top-0 right-0 w-3/4 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Page Header */}
            <header className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-20 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-8 border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary pulse-indicator"></span>
                    <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest">Portfolio Eccellenza</span>
                </div>
                <h1 className="font-display-lg text-display-lg text-on-surface mb-8">
                    I Nostri <br /><span className="text-primary">Progetti</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-outline-variant pl-4">
                    Esplora come abbiamo trasformato visioni audaci in ecosistemi digitali ad alto impatto. Curiamo ogni dettaglio, dalla logica hardware all'intelligenza agentica.
                </p>
            </header>

            {/* Filter Bar */}
            <section className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-16">
                <div className="flex flex-wrap items-center gap-4 py-4 border-y border-outline-variant/30">
                    {['All', 'Web', 'Mobile', 'Hardware', 'AI / Security'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-2.5 rounded font-label-mono text-label-mono uppercase tracking-widest transition-all duration-300 ${
                                filter === cat
                                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                                    : 'hover:bg-primary/5 text-on-surface-variant border border-transparent hover:border-primary/20'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Project Grid */}
            <section className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {filteredProjects.map((project, index) => (
                    <div key={index} className="group relative flex flex-col bg-surface/50 backdrop-blur-xl rounded border border-outline-variant overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 shadow-2xl">
                        <div className="aspect-[16/10] overflow-hidden bg-surface-container">
                            <img
                                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100"
                                src={project.image}
                                alt={project.title}
                            />
                        </div>
                        <div className="p-10">
                            <span className="font-label-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-3 block">{project.category}</span>
                            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-4 tracking-tight leading-none">{project.title}</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-8 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2.5 mb-8">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-surface-container border border-outline-variant/50 text-[9px] font-label-mono uppercase tracking-wider rounded text-on-surface-variant">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a href={project.url} target={project.url.startsWith('h') ? '_blank' : '_self'} className="inline-flex items-center gap-3 text-primary font-bold group/link text-sm hover:text-primary-fixed-dim transition-colors">
                                View Case Study
                                <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover/link:translate-x-2">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                ))}
            </section>

            {/* Case Study Section */}
            <section className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mt-40">
                <div className="group relative flex flex-col lg:flex-row bg-surface/50 backdrop-blur-xl rounded border border-outline-variant overflow-hidden transition-all duration-500 hover:border-primary/50 shadow-2xl">
                    <div className="lg:w-1/2 overflow-hidden h-80 lg:h-auto border-b lg:border-b-0 lg:border-r border-outline-variant">
                        <img
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110 grayscale brightness-75 group-hover:grayscale-0"
                            alt="Cloud Infrastructure"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlanJ1sD9jWr_fZyv4LlbrD7gnW33inqb9zQLvIe4rxOkt3jO9cwvmBcxnZdQIMWWXpqPrtM8xQ8DNVQdaHR6dm3i3UgQ-dBRRrW89fGO-JMJ8Owojoqpn8WcdIn3UeQ65Dcqlg4WuzziO2ukdpyXohOVY9C6wWTqxrNNtKTdJlswiJyw8JsICLCRG5NKF90A2ogBGl7V-bpTZ5YdEOMsqiAkCoGtq-m3iTL79capE5yCb6QNonmjGkjklBuLi-_whnPpN04eqWZye"
                        />
                    </div>
                    <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                        <span className="font-label-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-4 block">Enterprise Scaling</span>
                        <h3 className="font-display-lg text-display-lg text-on-surface mb-6 leading-none">Enterprise <br />Cloud Shield</h3>
                        <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                            Un'infrastruttura cloud resiliente progettata per supportare ecosistemi agentici critici. Sicurezza totale, latenza minima e scalabilità infinita.
                        </p>
                        <Link to="/contatti" className="inline-flex items-center gap-4 text-primary font-bold group/link text-xl hover:text-primary-fixed-dim font-label-mono uppercase tracking-widest">
                            Request Strategic Analysis
                            <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover/link:translate-x-2">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="relative z-10 py-40 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
                <div className="p-16 md:p-24 bg-surface border border-outline-variant rounded-xl text-center shadow-3xl relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
                    <h2 className="font-display-lg text-display-lg text-on-surface mb-10 relative z-10 leading-tight">Costruiamo il tuo prossimo<br />successo digitale.</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12 relative z-10 font-bold">Dalla prototipazione rapida al deployment globale.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link to="/contatti" className="px-12 py-5 bg-primary text-on-primary rounded font-label-mono text-label-mono uppercase tracking-widest hover:bg-primary-container transition-all shadow-2xl">
                            Inizia ora
                        </Link>
                        <Link to="/servizi" className="px-12 py-5 border border-outline-variant text-on-surface font-label-mono text-label-mono uppercase tracking-widest hover:bg-surface-container-high transition-all rounded">
                            Esplora Servizi
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Progetti;
