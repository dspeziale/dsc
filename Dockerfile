# syntax=docker/dockerfile:1

# ---------- Stage 1: build frontend ----------
FROM node:24-alpine AS build
WORKDIR /app

# Le variabili VITE_* vengono inlinate nel bundle: devono arrivare a build time.
# Su Coolify: Environment Variables -> spunta "Build Variable" su VITE_GOOGLE_CLIENT_ID
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts && npm rebuild esbuild

COPY . .
RUN npm run build

# ---------- Stage 2: runtime ----------
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN chown node:node /app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node api ./api
COPY --chown=node:node server ./server

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/healthz || exit 1

CMD ["node", "server/index.ts"]
