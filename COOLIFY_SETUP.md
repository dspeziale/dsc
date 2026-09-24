# Deploy su Coolify

Il sito è completamente statico: il `Dockerfile` compila il frontend con Vite e lo serve con nginx.

| File | Ruolo |
|------|-------|
| `Dockerfile` | Build multi-stage: Node 24 compila `dist/`, nginx Alpine lo serve |
| `nginx.conf` | Fallback SPA su `index.html`, cache degli asset, endpoint `/healthz` |
| `.dockerignore` | Esclude `node_modules`, `.git`, docs dal contesto di build |

Il container espone la porta **80** e risponde a `GET /healthz`.

## Setup su Coolify

1. **Projects** → progetto → **+ New Resource** → repository GitHub `dspeziale/dsc`, branch `main`
2. **Build Pack**: `Dockerfile`, Dockerfile Location `/Dockerfile`
3. **Ports Exposes**: `80`
4. **Domains**: il dominio da usare (Coolify genera il certificato Let's Encrypt)
5. **Health Checks** (opzionale): path `/healthz`, porta `80`
6. **Deploy**

Non servono variabili d'ambiente: il form contatti usa `mailto:`.

## Test locale

```bash
docker build -t dsc-site .
docker run --rm -p 8080:80 dsc-site
# apri http://localhost:8080
```

## Aggiornamenti

Ogni push su `main` avvia un nuovo deploy se su Coolify è attivo **Auto Deploy** (webhook GitHub).
