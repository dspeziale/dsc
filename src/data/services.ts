import type { LucideIcon } from 'lucide-react'
import { Sparkles, Globe, Smartphone, Apple, LayoutTemplate, Layers } from 'lucide-react'

export interface Service {
  slug: string
  title: string
  short: string
  description: string
  bullets: string[]
  icon: LucideIcon
}

export const services: Service[] = [
  {
    slug: 'ai-generativa',
    title: 'AI Generativa',
    short: 'Assistenti, agenti e automazioni basate su LLM integrate nei tuoi processi.',
    description:
      'Progettiamo e integriamo soluzioni di Intelligenza Artificiale Generativa: chatbot aziendali, agenti che operano su dati e strumenti interni, pipeline RAG su documenti proprietari e generazione automatica di contenuti.',
    bullets: [
      'Assistenti conversazionali su documenti aziendali (RAG)',
      'Agenti AI con accesso a CRM, ERP e API interne',
      'Automazione di email, report e classificazione',
      'Valutazione, sicurezza e monitoraggio dei modelli',
    ],
    icon: Sparkles,
  },
  {
    slug: 'sviluppo-web',
    title: 'Sviluppo Web',
    short: 'Siti, portali e piattaforme web performanti, accessibili e sicure.',
    description:
      'Realizziamo applicazioni web moderne, dal sito vetrina alla piattaforma enterprise, con attenzione a performance, SEO, accessibilità e sicurezza.',
    bullets: [
      'Frontend React, Next.js e TypeScript',
      'Backend Node.js, Python, .NET e API REST/GraphQL',
      'E-commerce, portali e aree riservate',
      'Deploy cloud, CI/CD e monitoraggio',
    ],
    icon: Globe,
  },
  {
    slug: 'android',
    title: 'App Android',
    short: 'Applicazioni native Android in Kotlin, pubblicate e mantenute sul Play Store.',
    description:
      'Sviluppiamo app Android native con Kotlin e Jetpack Compose, curando UX, prestazioni e integrazione con servizi cloud e notifiche.',
    bullets: [
      'Kotlin e Jetpack Compose',
      'Integrazione API, push, pagamenti e mappe',
      'Pubblicazione e gestione sul Google Play Store',
      'Manutenzione evolutiva e aggiornamenti',
    ],
    icon: Smartphone,
  },
  {
    slug: 'ios',
    title: 'App iOS',
    short: 'App native per iPhone e iPad in Swift, con design allineato alle linee guida Apple.',
    description:
      "Progettiamo app iOS native con Swift e SwiftUI, integrate con l'ecosistema Apple e distribuite tramite App Store e TestFlight.",
    bullets: [
      'Swift e SwiftUI',
      'Integrazione con Apple Pay, HealthKit, notifiche',
      'Pubblicazione su App Store e TestFlight',
      'Supporto iPhone, iPad e Apple Watch',
    ],
    icon: Apple,
  },
  {
    slug: 'spa',
    title: 'Single Page Application',
    short: 'Interfacce web reattive e veloci per gestionali, dashboard e strumenti interni.',
    description:
      "Costruiamo Single Page Application per gestionali, dashboard e applicazioni interattive, con architetture scalabili e un'esperienza utente fluida.",
    bullets: [
      'React, Vue e Angular',
      'Dashboard in tempo reale e data visualization',
      'Autenticazione, ruoli e permessi',
      'Progressive Web App installabili',
    ],
    icon: LayoutTemplate,
  },
  {
    slug: 'cross-platform',
    title: 'App Cross-Platform',
    short: 'Un unico codice per Android e iOS con Flutter o React Native.',
    description:
      "Quando servono tempi e costi ridotti, sviluppiamo app multipiattaforma con Flutter o React Native mantenendo un'esperienza vicina al nativo.",
    bullets: [
      'Flutter e React Native',
      'Codice condiviso Android e iOS',
      'Integrazione con moduli nativi quando necessario',
      'Rilascio coordinato sugli store',
    ],
    icon: Layers,
  },
]
