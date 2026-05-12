import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="relative pt-32 pb-section-gap">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-tech-grid"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="flex flex-col items-start gap-stack-lg max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary pulse-indicator"></span>
            <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest">System Architecture Status: Optimal</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface">
            Daniele Speziale. <br />
            <span className="text-primary">Principal AI Architect</span> & Tech Lead.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-outline-variant pl-4">
            35+ years of engineering. Building production-grade AI: Scalable GenAI, Advanced RAG, Multi-Agent Systems.
          </p>
          <div className="flex flex-wrap gap-stack-md pt-stack-md">
            <Link to="/contatti" className="bg-primary text-on-primary font-label-mono text-label-mono px-8 py-3 rounded hover:bg-primary-container transition-colors shadow-[0_0_15px_rgba(138,235,255,0.2)]">
              Initiate Protocol: Contact
            </Link>
            <Link to="/servizi" className="border border-outline text-on-surface font-label-mono text-label-mono px-8 py-3 rounded hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,235,255,0.1)]">
              View Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Data Density / Stats Section */}
      <section className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          {/* Stat Card 1 */}
          <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant rounded p-stack-lg flex flex-col justify-center items-center hover:border-primary/50 transition-colors group">
            <div className="font-display-lg text-display-lg text-on-surface group-hover:text-primary transition-colors">35+</div>
            <div className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mt-stack-sm text-center">Years Eng</div>
          </div>
          {/* Stat Card 2 */}
          <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant rounded p-stack-lg flex flex-col justify-center items-center hover:border-primary/50 transition-colors group">
            <div className="font-display-lg text-display-lg text-on-surface group-hover:text-primary transition-colors">4</div>
            <div className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mt-stack-sm text-center">LLMs in Prod</div>
          </div>
          {/* Stat Card 3 */}
          <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant rounded p-stack-lg flex flex-col justify-center items-center hover:border-primary/50 transition-colors group">
            <div className="font-display-lg text-display-lg text-on-surface group-hover:text-primary transition-colors">10+</div>
            <div className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mt-stack-sm text-center">AI Agents</div>
          </div>
          {/* Stat Card 4 */}
          <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant rounded p-stack-lg flex flex-col justify-center items-center hover:border-primary/50 transition-colors group">
            <div className="font-display-lg text-display-lg text-on-surface group-hover:text-primary transition-colors">3</div>
            <div className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest mt-stack-sm text-center">Years GenAI</div>
          </div>
        </div>
      </section>

      {/* Core Focus Area */}
      <section className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap" id="expertise">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 flex flex-col gap-stack-md">
            <h2 className="font-label-mono text-label-mono text-primary uppercase tracking-widest border-b border-white/10 pb-2 w-fit">
              Architectural Oversight
            </h2>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">
              Translating Complexity into Concrete Strategy.
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Focusing on the critical translation of high-level business requirements into scalable, production-grade architectural decisions.
            </p>
            <ul className="flex flex-col gap-unit mt-stack-sm">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">check_box</span>
                <span className="font-body-md text-body-md text-on-surface">Build vs Buy Analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">check_box</span>
                <span className="font-body-md text-body-md text-on-surface">Cost & Latency Optimization</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">check_box</span>
                <span className="font-body-md text-body-md text-on-surface">AI Governance & Security</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7 h-full min-h-[400px] relative rounded border border-outline-variant bg-surface/50 backdrop-blur-xl overflow-hidden group">
            {/* Abstract Tech Visual */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity group-hover:opacity-60"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZ_i_RM34101fuVdXY2T_gwW0YIn5DeaP1sgCiA9uVrylJX0JeodeE0Epb5dx3NqhOK2xQm0FsCd91MUZBIwDY-pAhsnYWA6qklmJOMyvT05rg6FxNIEdJO3aZx1Zp7Lr5Bv6vKQmAPzYpaHeINQvA3AqCBGRjsUBnT3P6PyQ-yl6KgfQpxrh7F82KjCo1t9G6qwPn_iSwjlVfhFNIiqmnboXP4m9swkj4v9s0GlYMiDMdFEsZjCWkh17LCBFjrwg_lc-b8jlj_R4')" }}
            >
            </div>
            {/* Blueprint Overlay */}
            <div className="absolute inset-0 bg-tech-grid opacity-50 mix-blend-overlay"></div>
            <div className="absolute bottom-4 left-4 font-label-mono text-label-mono text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">schema</span>
              Topology Diagram / L2 Abstraction
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

