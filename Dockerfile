# ==========================================
# Bellas Glamour - Dockerfile para Coolify
# Multi-stage: deps → build → runner
# ==========================================

# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Instalar bun para instalación rápida
RUN npm install -g bun

COPY package.json bun.lock ./

# Instalar TODAS las dependencias (dev incluidas, necesarias para el build)
RUN NODE_ENV=development bun install --frozen-lockfile

# ==========================================
# Stage 2: Build
# ==========================================
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generar Prisma client
RUN npx prisma generate

# Build Next.js (standalone output)
ENV NEXT_TELEMETRY_DISABLED=1
RUN NODE_ENV=production npx next build

# Copiar estáticos al standalone
RUN cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/

# ==========================================
# Stage 3: Runner (imagen mínima)
# ==========================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Usuario no-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar build standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copiar Prisma runtime (client generado + schema para migraciones)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/prisma ./prisma

# Instalar solo Prisma CLI para migraciones en runtime
RUN npm install -g prisma@6 --ignore-scripts 2>/dev/null

# Directorio de uploads con permisos
RUN mkdir -p /app/public/uploads && chown nextjs:nodejs /app/public/uploads

# Script de entrypoint
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -q --spider http://localhost:3000/ || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]
