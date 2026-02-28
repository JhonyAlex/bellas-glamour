# ==========================================
# Bellas Glamour - Dockerfile para Coolify
# Multi-stage: deps → build → runner
# ==========================================

# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lock ./

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

# Copiar Prisma runtime (client generado)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copiar Prisma schema para migraciones
COPY --from=builder /app/prisma ./prisma

# Instalar Prisma CLI COMO ROOT (antes de cambiar de usuario)
# y dar permisos de escritura al directorio de engines
RUN npm install -g prisma@6 --ignore-scripts 2>/dev/null && \
    mkdir -p /usr/local/lib/node_modules/prisma/node_modules/@prisma/engines && \
    chmod -R 777 /usr/local/lib/node_modules/prisma/node_modules/@prisma/engines

# Directorio de uploads
RUN mkdir -p /app/public/uploads && chown nextjs:nodejs /app/public/uploads

# Crear entrypoint inline (evita problemas CRLF de Windows)
RUN printf '#!/bin/sh\n\
set -e\n\
echo "=== Bellas Glamour - Startup ==="\n\
echo "Environment: $NODE_ENV"\n\
echo "Running Prisma migrations..."\n\
if prisma migrate deploy --schema=./prisma/schema.prisma 2>&1; then\n\
  echo "Migrations applied successfully"\n\
else\n\
  echo "Migration failed, trying db push..."\n\
  if prisma db push --schema=./prisma/schema.prisma --accept-data-loss 2>&1; then\n\
    echo "Schema pushed successfully (fallback)"\n\
  else\n\
    echo "Both migration and push failed. Starting app anyway..."\n\
  fi\n\
fi\n\
echo "Starting Next.js server on port ${PORT:-3000}..."\n\
exec node server.js\n' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=5 \
  CMD wget -q --spider http://localhost:3000/ || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]
