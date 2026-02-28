# ==========================================
# Bellas Glamour - Dockerfile para Coolify
# Node.js para BUILD + Node.js para RUNTIME
# ==========================================

# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Instalar bun para instalación rápida de dependencias
RUN npm install -g bun

# Copy package files
COPY package.json bun.lock ./

# Install ALL dependencies (incluyendo devDependencies para el build)
# Forzamos NODE_ENV=development para que bun instale devDependencies
RUN NODE_ENV=development bun install --frozen-lockfile

# Stage 2: Builder (Node.js para el build de Next.js con Turbopack)
FROM node:22-alpine AS builder
WORKDIR /app

# Instalar bun para prisma generate
RUN npm install -g bun

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build Next.js application con Node.js (evita bugs de Bun con worker_threads)
# Usamos npx next build para asegurar que corre con Node.js, no Bun
ENV NEXT_TELEMETRY_DISABLED=1

RUN NODE_ENV=production npx next build

# Copiar archivos estáticos al standalone (requerido por Next.js standalone)
RUN cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/

# Stage 3: Runner (Node.js para el runtime)
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma generated client (runtime only - no CLI needed)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/@prisma/engines ./node_modules/@prisma/engines

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application (run migrations via Coolify pre-deploy or manually)
CMD node server.js
