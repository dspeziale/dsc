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
        <main className="pt-32 pb-24">
            {/* Page Header */}
            <header className="max-w-7xl mx-auto px-8 mb-20 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Portfolio Eccellenza</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface tracking-tighter leading-none mb-6">
                    I Nostri <span className="text-gradient">Progetti</span>
                </h1>
                <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
                    Esplora come abbiamo trasformato visioni audaci in realtà digitali ad alto impatto. Curiamo ogni dettaglio, dalla strategia hardware al software d'avanguardia.
                </p>
            </header>

            {/* Filter Bar */}
            <section className="max-w-7xl mx-auto px-8 mb-12">
                <div className="flex flex-wrap items-center gap-4 py-2 border-b border-outline-variant/10">
                    {['All', 'Web', 'Mobile', 'Hardware', 'AI / Security'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                                filter === cat ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high text-on-surface-variant'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Project Grid */}
            <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <div key={index} className="group relative flex flex-col bg-surface-container rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                        <div className="aspect-[16/10] overflow-hidden bg-slate-200">
                            <img
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                src={project.image}
                                alt={project.title}
                            />
                        </div>
                        <div className="p-8">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">{project.category}</span>
                            <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">{project.title}</h3>
                            <p className="text-on-surface-variant text-sm line-clamp-2 mb-6 leading-relaxed">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 bg-surface-container-highest text-[10px] font-bold uppercase rounded text-on-surface-variant">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <a className="inline-flex items-center gap-2 text-primary font-bold group/link" href={project.url} target={project.url.startsWith('h') ? '_blank' : '_self'}>
                                Vedi Dettagli
                                <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover/link:translate-x-1">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                ))}
            </section>

            {/* Special Feature Section */}
            <section className="max-w-7xl mx-auto px-8 mt-24">
                <div className="md:col-span-2 group relative flex flex-col md:flex-row bg-surface-container-low rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="md:w-1/2 overflow-hidden h-64 md:h-auto">
                        <img
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt="Cloud Infrastructure"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlanJ1sD9jWr_fZyv4LlbrD7gnW33inqb9zQLvIe4rxOkt3jO9cwvmBcxnZdQIMWWXpqPrtM8xQ8DNVQdaHR6dm3i3UgQ-dBRRrW89fGO-JMJ8Owojoqpn8WcdIn3UeQ65Dcqlg4WuzziO2ukdpyXohOVY9C6wWTqxrNNtKTdJlswiJyw8JsICLCRG5NKF90A2ogBGl7V-bpTZ5YdEOMsqiAkCoGtq-m3iTL79capE5yCb6QNonmjGkjklBuLi-_whnPpN04eqWZye"
                        />
                    </div>
                    <div className="md:w-1/2 p-10 flex flex-col justify-center">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Enterprise Case Study</span>
                        <h3 className="text-3xl font-headline font-bold text-on-surface mb-4">Enterprise Cloud Shield</h3>
                        <p className="text-on-surface-variant text-base mb-8 leading-relaxed">
                            Un'infrastruttura cloud robusta e sicura progettata per supportare il carico critico di multinazionali operanti in settori regolamentati. Ottimizzazione delle performance e resilienza totale.
                        </p>
                        <Link to="/contatti" className="inline-flex items-center gap-2 text-primary font-bold group/link text-lg">
                            Richiedi un'Analisi
                            <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover/link:translate-x-1">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-8 mt-32 text-center">
                <div className="relative p-12 md:p-20 rounded-3xl overflow-hidden border border-outline-variant/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-surface-container-highest z-0"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-8">Pronto a iniziare il tuo prossimo progetto?</h2>
                        <p className="text-on-surface-variant text-lg mb-10 max-w-2xl mx-auto">Mettiamo a disposizione il nostro team di esperti per trasformare la tua idea in un successo tangibile.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contatti" className="bg-gradient-to-r from-primary-container to-primary text-on-primary-container px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all">
                                Inizia ora
                            </Link>
                            <Link to="/servizi" className="px-10 py-4 rounded-xl border border-outline-variant text-on-surface font-bold text-lg hover:bg-surface-variant transition-all">
                                Scopri i Servizi
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Progetti;

export default Progetti;
