# DSC Italy - Sito aziendale

Sito web di DSC Italy, azienda di Daniele Speziale specializzata in AI Generativa e sviluppo software (web, Android, iOS, Single Page Application).

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- React Router 7
- Lucide React (icone)

## Comandi

```bash
npm install     # installa le dipendenze
npm run dev     # avvia il server di sviluppo su http://localhost:5173
npm run build   # build di produzione in /dist
npm run preview # anteprima della build
```

## Struttura

```
src/
  components/   Header, Footer, Layout, SectionTitle
  data/         contenuti del sito (servizi, progetti, dati aziendali)
  pages/        Home, Servizi, Progetti, ChiSiamo, Contatti
  index.css     tema e classi di utilità Tailwind
```

## Personalizzazione

- Dati aziendali (nome, email, indirizzo): `src/data/site.ts`
- Servizi: `src/data/services.ts`
- Progetti: `src/data/projects.ts`

Il form contatti apre il client di posta con la richiesta precompilata (`mailto:`). Per un invio server-side collegare un endpoint API in `src/pages/Contatti.tsx`.
