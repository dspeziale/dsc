/**
 * Server Node/Express per il deploy su Coolify (o qualsiasi host Docker).
 *
 * - Serve la build statica di Vite da `dist/` con fallback SPA su index.html
 * - Monta automaticamente ogni file in `api/**` su `/api/<percorso>`, con la
 *   stessa firma `(req, res)` usata dalle Serverless Functions di Vercel
 * - Replica gli header definiti in vercel.json (COOP/COEP per il popup Google)
 *
 * Viene eseguito direttamente da Node >= 22.18 grazie al type stripping nativo:
 *   node server/index.ts
 */
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

type Handler = (req: Request, res: Response) => unknown | Promise<unknown>;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const API_DIR = join(ROOT, 'api');
const DIST_DIR = join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 3000;

function listApiFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...listApiFiles(full));
    } else if (/\.(ts|js|mjs)$/.test(entry) && !entry.startsWith('_')) {
      out.push(full);
    }
  }
  return out;
}

async function loadRoutes() {
  const routes = new Map<string, Handler>();
  if (!existsSync(API_DIR)) return routes;

  for (const file of listApiFiles(API_DIR)) {
    const rel = relative(API_DIR, file).split('\\').join('/').replace(/\.(ts|js|mjs)$/, '');
    const routePath = rel.endsWith('/index') ? rel.slice(0, -'/index'.length) : rel;
    const mod = await import(pathToFileURL(file).href);
    const handler: Handler | undefined = mod.default;
    if (typeof handler !== 'function') {
      console.warn(`[api] ${rel}: nessun export default, ignorato`);
      continue;
    }
    routes.set('/api/' + routePath, handler);
  }
  return routes;
}

async function main() {
  const app = express();

  // Coolify/Traefik sta davanti al container: fidati di X-Forwarded-* per IP e proto
  app.set('trust proxy', true);
  app.disable('x-powered-by');

  // Header globali (equivalenti a vercel.json)
  app.use((_req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
  });

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.get('/healthz', (_req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  });

  // API routes (stile Vercel: api/foo/bar.ts -> /api/foo/bar)
  const routes = await loadRoutes();
  for (const [path, handler] of routes) {
    app.all(path, async (req, res, next) => {
      try {
        await handler(req, res);
      } catch (err) {
        next(err);
      }
    });
    console.log(`[api] ${path}`);
  }
  app.all('/api/{*rest}', (_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  // Static build + fallback SPA
  if (!existsSync(DIST_DIR)) {
    console.warn(`[static] cartella ${DIST_DIR} non trovata: esegui "npm run build"`);
  }
  app.use(
    express.static(DIST_DIR, {
      index: false,
      maxAge: '1y',
      setHeaders(res, filePath) {
        // index.html e file non hashati non devono essere cacheati a lungo
        if (filePath.endsWith('.html') || !/\/assets\//.test(filePath.split('\\').join('/'))) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    }),
  );
  app.get('/{*rest}', (_req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'));
  });

  // Error handler (Express richiede 4 parametri per riconoscerlo come tale)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[server] errore non gestito:', err);
    if (!res.headersSent) res.status(500).json({ error: 'Internal server error' });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server in ascolto su http://0.0.0.0:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Avvio fallito:', err);
  process.exit(1);
});
