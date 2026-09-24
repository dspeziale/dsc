export interface Project {
  title: string
  category: string
  description: string
  stack: string[]
  results: string
}

export const projects: Project[] = [
  {
    title: 'Assistente AI per il customer care',
    category: 'AI Generativa',
    description:
      "Chatbot basato su LLM e RAG che risponde ai clienti consultando manuali e ticket storici, con passaggio all'operatore quando necessario.",
    stack: ['LLM', 'RAG', 'Python', 'React'],
    results: 'Riduzione del 60% dei ticket di primo livello',
  },
  {
    title: "Agente per l'elaborazione documenti",
    category: 'AI Generativa',
    description:
      'Pipeline che legge fatture e contratti, estrae i dati strutturati e li inserisce nel gestionale, con revisione umana sui casi dubbi.',
    stack: ['LLM', 'OCR', 'Node.js', 'PostgreSQL'],
    results: 'Da 15 minuti a 40 secondi per documento',
  },
  {
    title: 'Piattaforma e-commerce B2B',
    category: 'Web',
    description:
      "Portale ordini per rivenditori con listini personalizzati, gestione magazzino e integrazione con l'ERP aziendale.",
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Stripe'],
    results: 'Oltre 2.000 ordini al mese gestiti online',
  },
  {
    title: 'App logistica per corrieri',
    category: 'Android',
    description:
      'App nativa per la gestione delle consegne con firma digitale, foto di prova, navigazione e funzionamento offline.',
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    results: 'Utilizzata da 300 corrieri ogni giorno',
  },
  {
    title: 'App benessere e allenamento',
    category: 'iOS',
    description:
      'App per iPhone e Apple Watch con piani di allenamento, sincronizzazione HealthKit e abbonamenti in-app.',
    stack: ['Swift', 'SwiftUI', 'HealthKit', 'StoreKit'],
    results: 'Valutazione media 4,8 su App Store',
  },
  {
    title: 'Dashboard operativa in tempo reale',
    category: 'SPA',
    description:
      'Single Page Application per il monitoraggio di impianti industriali con grafici live, allarmi e reportistica esportabile.',
    stack: ['React', 'WebSocket', 'Recharts', 'Express'],
    results: 'Tempo di reazione agli allarmi dimezzato',
  },
]

export const projectCategories = ['Tutti', 'AI Generativa', 'Web', 'Android', 'iOS', 'SPA']
