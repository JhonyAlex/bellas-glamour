# ==========================================
# Bellas Glamour - Dockerfile para Coolify
# Node.js para BUILD + Bun para RUNTIME
# ==========================================

# Stage 1: Dependencies (usando Node.js para compatibilidad con Turbopack)
FROM node:22-alpine AS deps
WORKDIR /app

# Instalar bun para usar bun install (más rápido)
RUN npm install -g bun

# Copy package files
COPY package.json bun.lock ./

# Install dependencies con bun
RUN bun install --frozen-lockfile

# Stage 2: Builder (Node.js para el build de Next.js con Turbopack)
FROM node:22-alpine AS builder
WORKDIR /app

# Instalar bun
RUN npm install -g bun

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build Next.js application con Node.js (evita bugs de Bun con worker_threads)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npx next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/

# Stage 3: Runner (Bun para el runtime - más rápido)
FROM oven/bun:1.2-alpine AS runner
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

# Copy Prisma schema and generated client
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application con Bun (más rápido que Node.js en runtime)
CMD ["bun", "server.js"]
