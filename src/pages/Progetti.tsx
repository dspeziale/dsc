import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';

const Progetti = () => {
    const projects = [
        {
            title: 'DS Tracker',
            description: 'PiattaformaSistema avanzato di tracciamento GPS per la gestione della tua flotta in tempo reale.',
            image: 'https://www.digitalmatter.com/hubfs/Imported_Blog_Media/Blog-Post-image-17-1.jpg',
            tags: ['React', 'Node.js', 'Postgres', 'Vite'],
            date: '2025',
            demoUrl: 'https://dstracker.vercel.app/',
            githubUrl: '#',
        },
        {
            title: 'Dashboard Analytics',
            description: 'Dashboard interattiva per visualizzazione dati e analytics in tempo reale.',
            image: 'https://via.placeholder.com/600x400/3498db/ffffff?text=Analytics+Dashboard',
            tags: ['Vue.js', 'D3.js', 'PostgreSQL', 'WebSocket'],
            date: '2024',
            demoUrl: '#',
            githubUrl: '#',
        },
        {
            title: 'Mobile App Fitness',
            description: 'App mobile cross-platform per tracking allenamenti e nutrizione.',
            image: 'https://via.placeholder.com/600x400/27ae60/ffffff?text=Fitness+App',
            tags: ['React Native', 'Firebase', 'Redux', 'HealthKit'],
            date: '2023',
            demoUrl: '#',
            githubUrl: '#',
        },
        {
            title: 'CRM Aziendale',
            description: 'Sistema CRM personalizzato per gestione clienti e pipeline vendite.',
            image: 'https://via.placeholder.com/600x400/e74c3c/ffffff?text=CRM+System',
            tags: ['Angular', 'NestJS', 'MySQL', 'Docker'],
            date: '2023',
            demoUrl: '#',
            githubUrl: '#',
        },
        {
            title: 'IoT Smart Home',
            description: 'Sistema di automazione domestica con controllo dispositivi IoT.',
            image: 'https://via.placeholder.com/600x400/9b59b6/ffffff?text=Smart+Home',
            tags: ['Python', 'MQTT', 'Raspberry Pi', 'React'],
            date: '2023',
            demoUrl: '#',
            githubUrl: '#',
        },
        {
            title: 'Booking System',
            description: 'Piattaforma di prenotazione online per hotel e strutture ricettive.',
            image: 'https://via.placeholder.com/600x400/f39c12/ffffff?text=Booking+System',
            tags: ['Next.js', 'Prisma', 'Stripe', 'Tailwind'],
            date: '2024',
            demoUrl: '#',
            githubUrl: '#',
        },
    ];

    return (
        <main className="pt-20">
            {/* Page Header */}
            <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20">
                <div className="container text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">I Nostri Progetti</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                        Scopri alcuni dei progetti che abbiamo realizzato per i nostri clienti
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="card group overflow-hidden"
                            >
                                {/* Project Image */}
                                <div className="relative overflow-hidden rounded-xl mb-6 -mx-8 -mt-8">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Project Info */}
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                    <Calendar size={16} />
                                    <span>{project.date}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                                    {project.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            <Tag size={12} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4 pt-4 border-t border-gray-200">
                                    <a
                                        href={project.demoUrl} target="_blank"
                                        className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors duration-300"
                                    >
                                        <ExternalLink size={18} />
                                        <span className="font-semibold">Demo</span>
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300"
                                    >
                                        <Github size={18} />
                                        <span className="font-semibold">GitHub</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-gradient-to-br from-gray-50 to-orange-50">
                <div className="container">
                    <div className="bg-gradient-to-br from-accent to-accent-dark rounded-3xl p-12 md:p-16 text-center text-white shadow-custom-lg">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Hai un progetto in mente?
                        </h2>
                        <p className="text-lg md:text-xl opacity-95 mb-8 max-w-2xl mx-auto">
                            Trasformiamo la tua idea in realtà. Contattaci per una consulenza gratuita.
                        </p>
                        <a
                            href="/contatti"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-accent font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl uppercase tracking-wide"
                        >
                            Inizia il tuo progetto
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Progetti;
