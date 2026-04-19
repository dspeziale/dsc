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

    return (        <main className="pt-32 pb-24 bg-[#0f172a] text-white">
            {/* Page Header */}
            <header className="max-w-7xl mx-auto px-8 mb-20 text-center md:text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 mb-8 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Portfolio Eccellenza</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-headline font-bold text-white tracking-tighter leading-[0.85] mb-8">
                    I Nostri <br/><span className="text-gradient">Progetti</span>
                </h1>
                <p className="text-slate-400 text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
                    Esplora come abbiamo trasformato visioni audaci in ecosistemi digitali ad alto impatto. Curiamo ogni dettaglio, dalla logica hardware all'intelligenza agentica.
                </p>
            </header>

            {/* Filter Bar */}
            <section className="max-w-7xl mx-auto px-8 mb-16 relative z-10">
                <div className="flex flex-wrap items-center gap-4 py-4 border-y border-white/5">
                    {['All', 'Web', 'Mobile', 'Hardware', 'AI / Security'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-2.5 rounded-xl font-bold font-headline text-sm uppercase tracking-widest transition-all duration-300 ${
                                filter === cat 
                                  ? 'bg-emerald-500 text-slate-900 shadow-lg shadow-emerald-500/20' 
                                  : 'hover:bg-white/5 text-slate-400 border border-transparent hover:border-white/10'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Project Grid */}
            <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
                {filteredProjects.map((project, index) => (
                    <div key={index} className="group relative flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/30 shadow-2xl">
                        <div className="aspect-[16/10] overflow-hidden bg-slate-800">
                            <img
                                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100"
                                src={project.image}
                                alt={project.title}
                            />
                        </div>
                        <div className="p-10">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-3 block">{project.category}</span>
                            <h3 className="text-3xl font-headline font-bold text-white mb-4 tracking-tight">{project.title}</h3>
                            <p className="text-slate-400 text-base font-light line-clamp-2 mb-8 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2.5 mb-8">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-wider rounded-lg text-slate-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a href={project.url} target={project.url.startsWith('h') ? '_blank' : '_self'} className="inline-flex items-center gap-3 text-emerald-400 font-bold group/link text-sm hover:text-emerald-300 transition-colors">
                                View Case Study
                                <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover/link:translate-x-2">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                ))}
            </section>

            {/* Case Study Section */}
            <section className="max-w-7xl mx-auto px-8 mt-40 relative z-10">
                <div className="group relative flex flex-col lg:flex-row bg-slate-900 rounded-[3rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-emerald-500/20">
                    <div className="lg:w-1/2 overflow-hidden h-80 lg:h-auto border-b lg:border-b-0 lg:border-r border-white/5">
                        <img
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
                            alt="Cloud Infrastructure"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlanJ1sD9jWr_fZyv4LlbrD7gnW33inqb9zQLvIe4rxOkt3jO9cwvmBcxnZdQIMWWXpqPrtM8xQ8DNVQdaHR6dm3i3UgQ-dBRRrW89fGO-JMJ8Owojoqpn8WcdIn3UeQ65Dcqlg4WuzziO2ukdpyXohOVY9C6wWTqxrNNtKTdJlswiJyw8JsICLCRG5NKF90A2ogBGl7V-bpTZ5YdEOMsqiAkCoGtq-m3iTL79capE5yCb6QNonmjGkjklBuLi-_whnPpN04eqWZye"
                        />
                    </div>
                    <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-4 block">Enterprise Scaling</span>
                        <h3 className="text-4xl lg:text-6xl font-headline font-bold text-white mb-6 tracking-tighter leading-none">Enterprise <br/>Cloud Shield</h3>
                        <p className="text-slate-400 text-lg lg:text-xl mb-10 leading-relaxed font-light">
                            Un'infrastruttura cloud resiliente progettata per supportare ecosistemi agentici critici. Sicurezza totale, latenza minima e scalabilità infinita.
                        </p>
                        <Link to="/contatti" className="inline-flex items-center gap-4 text-emerald-400 font-bold group/link text-xl hover:text-emerald-300">
                            Request Strategic Analysis
                            <span className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover/link:translate-x-2">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-40 px-8 relative z-10">
                <div className="max-w-5xl mx-auto p-16 md:p-24 bg-gradient-to-br from-emerald-500 to-primary text-slate-900 rounded-[3rem] text-center shadow-3xl shadow-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-4xl md:text-6xl font-headline font-bold mb-10 relative z-10 leading-tight">Costruiamo il tuo prossimo<br/>successo digitale.</h2>
                    <p className="text-slate-900/70 text-xl max-w-2xl mx-auto mb-12 relative z-10 font-bold">Dalla prototipazione rapida al deployment globale.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <Link to="/contatti" className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                            Inizia ora
                        </Link>
                        <Link to="/servizi" className="px-12 py-5 border-2 border-slate-900/20 text-slate-900 font-bold text-xl hover:bg-slate-900/5 transition-all rounded-2xl">
                            Esplora Servizi
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default Progetti;
