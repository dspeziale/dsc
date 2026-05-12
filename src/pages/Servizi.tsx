import { Link } from 'react-router-dom';

const Servizi = () => {
  return (
    <main className="flex-grow pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-blueprint opacity-50"></div>

      {/* Header Section */}
      <div className="relative z-10 max-w-3xl mb-section-gap">
        <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest block mb-stack-md">Architecture Overview</span>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-md">Enterprise Intelligence Systems</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Deploying robust, scalable, and secure AI technology stacks. Emphasizing precision in multi-agent orchestration, advanced retrieval mechanisms, and rigorous compliance governance.
        </p>
      </div>

      {/* Bento Grid: Solutions & Tech Stack */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Section 1: Agentic AI Design */}
        <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant/50 rounded-xl p-8 glass-card-hover hover:border-primary/50 transition-all duration-500 group relative">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-primary">hub</span>
          </div>
          <div className="border-b border-white/10 pb-4 mb-stack-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">account_tree</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Agentic AI Design</h2>
          </div>
          <ul className="space-y-stack-md font-body-md text-body-md text-on-surface-variant relative z-10">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
              <div>
                <strong className="text-on-surface block mb-1">Multi-Agent Tool Use</strong>
                Designing autonomous systems capable of executing complex, multi-step reasoning pathways using specialized toolsets.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
              <div>
                <strong className="text-on-surface block mb-1">RAG Orchestration</strong>
                Architecting coordination layers that dictate when and how agents retrieve, synthesize, and validate external knowledge bases.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-sm mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
              <div>
                <strong className="text-on-surface block mb-1">State Management</strong>
                Implementing persistent memory frameworks to maintain context continuity across long-running agentic interactions.
              </div>
            </li>
          </ul>
        </div>

        {/* Section 2: Advanced RAG & Retrieval */}
        <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant/50 rounded-xl p-8 glass-card-hover hover:border-primary/50 transition-all duration-500 group relative">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-primary">database</span>
          </div>
          <div className="border-b border-white/10 pb-4 mb-stack-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">plumbing</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Advanced Retrieval</h2>
          </div>
          <ul className="space-y-stack-md font-body-md text-body-md text-on-surface-variant relative z-10">
            <li className="flex items-start gap-3">
              <span className="font-label-mono text-label-mono text-primary mt-1">01.</span>
              <div>
                <strong className="text-on-surface block mb-1">Hybrid Search Pipelines</strong>
                Combining dense vector similarity with sparse keyword retrieval (BM25) to maximize recall and precision in domain-specific corpora.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-label-mono text-label-mono text-primary mt-1">02.</span>
              <div>
                <strong className="text-on-surface block mb-1">Embedding Optimization</strong>
                Selecting and fine-tuning embedding models tailored to specialized vocabularies and specific enterprise semantic requirements.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-label-mono text-label-mono text-primary mt-1">03.</span>
              <div>
                <strong className="text-on-surface block mb-1">Vector Store Infrastructure</strong>
                Deploying high-performance, scalable vector databases optimized for low-latency similarity queries at scale.
              </div>
            </li>
          </ul>
        </div>

        {/* Section 3: LLM Stack in Production */}
        <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant/50 rounded-xl p-8 glass-card-hover hover:border-primary/50 transition-all duration-500 group relative">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-primary">memory</span>
          </div>
          <div className="border-b border-white/10 pb-4 mb-stack-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">model_training</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Production LLM Stack</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 relative z-10">
            Agnostic model integration strategy prioritizing the right cognitive engine for specific workload requirements, balancing cost, latency, and reasoning capability.
          </p>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="border border-outline-variant/30 rounded p-4 flex items-center gap-3 hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">neurology</span>
              <span className="font-title-md text-title-md text-on-surface">Claude 3.5</span>
            </div>
            <div className="border border-outline-variant/30 rounded p-4 flex items-center gap-3 hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">neurology</span>
              <span className="font-title-md text-title-md text-on-surface">Gemini Pro</span>
            </div>
            <div className="border border-outline-variant/30 rounded p-4 flex items-center gap-3 hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">neurology</span>
              <span className="font-title-md text-title-md text-on-surface">LLaMA 3.3</span>
            </div>
            <div className="border border-outline-variant/30 rounded p-4 flex items-center gap-3 hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">neurology</span>
              <span className="font-title-md text-title-md text-on-surface">GPT-4o</span>
            </div>
          </div>
        </div>

        {/* Section 4: Security & Governance */}
        <div className="bg-surface/50 backdrop-blur-xl border border-outline-variant/50 rounded-xl p-8 glass-card-hover hover:border-primary/50 transition-all duration-500 group relative">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
            <span className="material-symbols-outlined text-6xl text-primary">shield_lock</span>
          </div>
          <div className="border-b border-white/10 pb-4 mb-stack-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">gavel</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Security & Governance</h2>
          </div>
          <div className="space-y-4 font-body-md text-body-md text-on-surface-variant relative z-10">
            <div className="flex items-center gap-4 bg-surface-container/50 p-3 rounded border border-outline-variant/20">
              <div className="w-2 h-2 rounded-full bg-primary pulse-indicator"></div>
              <span className="font-title-md text-title-md text-on-surface w-24">NIS2</span>
              <span className="text-sm">Critical infrastructure resilience and reporting.</span>
            </div>
            <div className="flex items-center gap-4 bg-surface-container/50 p-3 rounded border border-outline-variant/20">
              <div className="w-2 h-2 rounded-full bg-primary pulse-indicator"></div>
              <span className="font-title-md text-title-md text-on-surface w-24">GDPR</span>
              <span className="text-sm">Data anonymization and privacy preservation in models.</span>
            </div>
            <div className="flex items-center gap-4 bg-surface-container/50 p-3 rounded border border-outline-variant/20">
              <div className="w-2 h-2 rounded-full bg-primary pulse-indicator"></div>
              <span className="font-title-md text-title-md text-on-surface w-24">AI Act</span>
              <span className="text-sm">Risk-tier assessment and transparency compliance.</span>
            </div>
            <div className="flex items-center gap-4 bg-surface-container/50 p-3 rounded border border-outline-variant/20">
              <div className="w-2 h-2 rounded-full bg-primary pulse-indicator"></div>
              <span className="font-title-md text-title-md text-on-surface w-24">Cybersec</span>
              <span className="text-sm">Prompt injection defense and adversarial testing.</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 mt-section-gap text-center">
        <Link to="/contatti" className="inline-flex bg-primary text-on-primary font-label-mono text-label-mono px-12 py-4 rounded uppercase tracking-widest hover:bg-primary-container transition-all duration-300 shadow-xl shadow-primary/20">
          Initiate Project
        </Link>
      </div>
    </main>
  );
};

export default Servizi;

