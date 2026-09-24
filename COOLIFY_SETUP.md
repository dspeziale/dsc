# Deploy su Coolify

Guida al deploy del sito su **https://coolify.dsc-italy.app**.

## Come funziona

Su Vercel il frontend era servito come statico e le funzioni in `api/` come Serverless Functions.
Coolify esegue container Docker, quindi il progetto include:

| File | Ruolo |
|------|-------|
| `Dockerfile` | Build multi-stage: compila il frontend con Vite, poi crea l'immagine runtime (Node 24 Alpine) |
| `server/index.ts` | Server Express che serve `dist/` (fallback SPA) e monta ogni file di `api/**` su `/api/<percorso>` |
| `.dockerignore` | Esclude `node_modules`, `.git`, docs, ecc. dal contesto di build |
| `.env.example` | Elenco delle variabili d'ambiente richieste |

Gli handler in `api/` **non sono stati modificati**: la firma `(req, res)` di Vercel è compatibile con Express.
Ogni nuovo file `api/foo/bar.ts` con `export default handler` viene montato automaticamente su `/api/foo/bar`.

Il container espone la porta **3000** e risponde a `GET /healthz` per l'health check.

## Setup su Coolify

### 1. Crea la risorsa

1. Apri https://coolify.dsc-italy.app → **Projects** → il tuo progetto → **+ New Resource**
2. Scegli **Public Repository** (o **GitHub App** se hai collegato l'account GitHub)
3. Repository: `https://github.com/dspeziale/dsc` — branch: `main`
4. **Build Pack**: `Dockerfile`
5. Salva

### 2. Configurazione generale

Nella tab **General** della risorsa:

| Campo | Valore |
|-------|--------|
| Build Pack | Dockerfile |
| Dockerfile Location | `/Dockerfile` |
| Ports Exposes | `3000` |
| Domains | `https://dsc-italy.app` (o il dominio che vuoi usare; Coolify genera il certificato Let's Encrypt) |

### 3. Variabili d'ambiente

Tab **Environment Variables**. Aggiungi:

| Nome | Build Variable? | Descrizione |
|------|-----------------|-------------|
| `VITE_GOOGLE_CLIENT_ID` | **Sì** | Client ID OAuth Google. Viene inlinato da Vite nel bundle: se non è marcata come build variable il login admin non funziona |
| `DATABASE_URL` | No | Connection string Neon Postgres (con `?sslmode=require`) |
| `JWT_SECRET` | No | Stringa lunga e casuale per firmare i token admin (es. `openssl rand -hex 32`) |
| `ADMIN_EMAILS` | No | Email autorizzate all'area admin, separate da virgola |
| `RESEND_API_KEY` | No | Opzionale, l'invio email non è ancora attivo in `api/contact.ts` |

> **Importante**: `VITE_GOOGLE_CLIENT_ID` deve avere la spunta **Build Variable** (Coolify la passa come `--build-arg`).
> Le altre sono variabili runtime normali.

### 4. Health check (opzionale ma consigliato)

Tab **Health Checks**:

| Campo | Valore |
|-------|--------|
| Enabled | ✓ |
| Method | GET |
| Path | `/healthz` |
| Port | `3000` |
| Return Code | 200 |

Il `Dockerfile` include già un `HEALTHCHECK` equivalente, quindi anche senza configurarlo Coolify vede lo stato del container.

### 5. Deploy

Clicca **Deploy**. Il primo build impiega qualche minuto (install + build Vite).
Nei log devi vedere alla fine:

```
[api] /api/admin/analytics
...
[api] /api/visitor-count
Server in ascolto su http://0.0.0.0:3000
```

### 6. Google OAuth

Nella Google Cloud Console → Credentials → il tuo OAuth Client:

- **Authorized JavaScript origins**: aggiungi il dominio pubblico (es. `https://dsc-italy.app`)
- **Authorized redirect URIs**: idem

Senza questo il popup di login viene rifiutato da Google.

### 7. Deploy automatico da GitHub (opzionale)

- Con **GitHub App**: Coolify registra il webhook da solo, ogni push su `main` fa il deploy.
- Con **Public Repository**: tab **Webhooks** → copia l'URL e aggiungilo su GitHub → Settings → Webhooks (evento `push`).

## Test in locale

```bash
# Build e avvio senza Docker
npm ci
npm run build
DATABASE_URL=... JWT_SECRET=... ADMIN_EMAILS=... npm start
# -> http://localhost:3000

# Build e avvio con Docker (come su Coolify)
docker build --build-arg VITE_GOOGLE_CLIENT_ID=xxx -t dsc-site .
docker run --rm -p 3000:3000 --env-file .env dsc-site
```

`npm start` richiede Node >= 22.18 (esegue TypeScript nativamente senza transpiler).

## Troubleshooting

**Il login admin non funziona / `VITE_GOOGLE_CLIENT_ID is undefined`**
La variabile non era marcata come Build Variable. Correggi e fai **Redeploy** (serve un nuovo build, non basta il restart).

**`Failed to log visit` o errori 500 sulle API**
Controlla `DATABASE_URL` nei log del container. Verifica che le migrazioni in `migrations/` siano state applicate su Neon.

**IP dei visitatori sempre uguale (IP del proxy)**
Il server ha `trust proxy` attivo e legge `X-Forwarded-For`, che Traefik di Coolify imposta. Se hai un altro proxy davanti (Cloudflare), assicurati che inoltri l'header.

**Build fallisce su `npm ci`**
Il `package-lock.json` deve essere committato e allineato a `package.json`. Esegui `npm install` in locale e committa il lock aggiornato.
