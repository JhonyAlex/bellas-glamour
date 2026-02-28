2026-Feb-28 10:32:33.685886
Starting deployment of JhonyAlex/bellas-glamour:main to localhost.
2026-Feb-28 10:32:33.896149
Preparing container with helper image: ghcr.io/coollabsio/coolify-helper:1.0.12
2026-Feb-28 10:32:35.352401
----------------------------------------
2026-Feb-28 10:32:35.359413
Importing JhonyAlex/bellas-glamour:main (commit sha db3a91d7668d0eb751ec3c69493b4a165bbd6d8a) to /artifacts/yg40wwgwo888ow0k4cc4s848.
2026-Feb-28 10:32:37.155094
Image not found (l408sww8sw8s0oc40wwk8wg4:db3a91d7668d0eb751ec3c69493b4a165bbd6d8a). Building new image.
2026-Feb-28 10:32:38.261472
----------------------------------------
2026-Feb-28 10:32:38.266508
⚠️ Build-time environment variable warning: NODE_ENV=production
2026-Feb-28 10:32:38.271373
Affects: Node.js/npm/yarn/bun/pnpm
2026-Feb-28 10:32:38.276308
Issue: Skips devDependencies installation which are often required for building (webpack, typescript, etc.)
2026-Feb-28 10:32:38.281265
Recommendation: Uncheck "Available at Buildtime" or use "development" during build
2026-Feb-28 10:32:38.286356
2026-Feb-28 10:32:38.291295
💡 Tips to resolve build issues:
2026-Feb-28 10:32:38.296363
1. Set these variables as "Runtime only" in the environment variables settings
2026-Feb-28 10:32:38.302726
2. Use different values for build-time (e.g., NODE_ENV=development for build)
2026-Feb-28 10:32:38.308987
3. Consider using multi-stage Docker builds to separate build and runtime environments
2026-Feb-28 10:32:38.905930
----------------------------------------
2026-Feb-28 10:32:38.913072
Building docker image started.
2026-Feb-28 10:32:38.918859
To check the current progress, click on Show Debug Logs.
2026-Feb-28 10:32:57.652320
========================================
2026-Feb-28 10:32:57.660345
Deployment failed: Command execution failed (exit code 1): docker exec yg40wwgwo888ow0k4cc4s848 bash -c 'bash /artifacts/build.sh'
2026-Feb-28 10:32:57.660345
Error: #0 building with "default" instance using docker driver
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#1 [internal] load build definition from Dockerfile
2026-Feb-28 10:32:57.660345
#1 transferring dockerfile: 5.05kB done
2026-Feb-28 10:32:57.660345
#1 WARN: JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 115)
2026-Feb-28 10:32:57.660345
#1 DONE 0.0s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#2 [internal] load metadata for docker.io/library/node:22-alpine
2026-Feb-28 10:32:57.660345
#2 DONE 0.0s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#3 [internal] load .dockerignore
2026-Feb-28 10:32:57.660345
#3 transferring context: 177B done
2026-Feb-28 10:32:57.660345
#3 DONE 0.0s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#4 [deps 1/5] FROM docker.io/library/node:22-alpine
2026-Feb-28 10:32:57.660345
#4 DONE 0.0s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#5 [runner  3/15] RUN addgroup --system --gid 1001 nodejs
2026-Feb-28 10:32:57.660345
#5 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#6 [deps 2/5] WORKDIR /app
2026-Feb-28 10:32:57.660345
#6 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#7 [runner  4/15] RUN adduser --system --uid 1001 nextjs
2026-Feb-28 10:32:57.660345
#7 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#8 [internal] load build context
2026-Feb-28 10:32:57.660345
#8 transferring context: 841.19kB 0.0s done
2026-Feb-28 10:32:57.660345
#8 DONE 0.0s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#9 [deps 3/5] RUN npm install -g bun
2026-Feb-28 10:32:57.660345
#9 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#10 [deps 5/5] RUN NODE_ENV=development bun install --frozen-lockfile
2026-Feb-28 10:32:57.660345
#10 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#11 [deps 4/5] COPY package.json bun.lock ./
2026-Feb-28 10:32:57.660345
#11 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#12 [builder 4/8] COPY --from=deps /app/node_modules ./node_modules
2026-Feb-28 10:32:57.660345
#12 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#13 [builder 5/8] COPY . .
2026-Feb-28 10:32:57.660345
#13 DONE 0.1s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#14 [builder 6/8] RUN bunx prisma generate
2026-Feb-28 10:32:57.660345
#14 1.367 Prisma schema loaded from prisma/schema.prisma
2026-Feb-28 10:32:57.660345
#14 2.196
2026-Feb-28 10:32:57.660345
#14 2.196 ✔ Generated Prisma Client (v6.19.2) to ./node_modules/@prisma/client in 145ms
2026-Feb-28 10:32:57.660345
#14 2.196
2026-Feb-28 10:32:57.660345
#14 2.196 Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
2026-Feb-28 10:32:57.660345
#14 2.196
2026-Feb-28 10:32:57.660345
#14 2.196 Tip: Interested in query caching in just a few lines of code? Try Accelerate today! https://pris.ly/tip-3-accelerate
2026-Feb-28 10:32:57.660345
#14 2.196
2026-Feb-28 10:32:57.660345
#14 DONE 2.2s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#15 [builder 7/8] RUN NODE_ENV=production npx next build
2026-Feb-28 10:32:57.660345
#15 1.727 ▲ Next.js 16.1.3 (Turbopack)
2026-Feb-28 10:32:57.660345
#15 1.727
2026-Feb-28 10:32:57.660345
#15 1.762   Creating an optimized production build ...
2026-Feb-28 10:32:57.660345
#15 11.10 ✓ Compiled successfully in 8.6s
2026-Feb-28 10:32:57.660345
#15 11.11   Skipping validation of types
2026-Feb-28 10:32:57.660345
#15 11.35   Collecting page data using 5 workers ...
2026-Feb-28 10:32:57.660345
#15 12.34   Generating static pages using 5 workers (0/13) ...
2026-Feb-28 10:32:57.660345
#15 12.46   Generating static pages using 5 workers (3/13)
2026-Feb-28 10:32:57.660345
#15 12.48   Generating static pages using 5 workers (6/13)
2026-Feb-28 10:32:57.660345
#15 12.65   Generating static pages using 5 workers (9/13)
2026-Feb-28 10:32:57.660345
#15 12.78 ✓ Generating static pages using 5 workers (13/13) in 440.6ms
2026-Feb-28 10:32:57.660345
#15 12.78   Finalizing page optimization ...
2026-Feb-28 10:32:57.660345
#15 13.18
2026-Feb-28 10:32:57.660345
#15 13.18 Route (app)
2026-Feb-28 10:32:57.660345
#15 13.18 ┌ ○ /
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ○ /_not-found
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/admin/approve/[id]
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/admin/pending-models
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/admin/pending-photos
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/admin/reject/[id]
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/auth/login
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/auth/logout
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/auth/me
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/auth/register
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/models
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/models/[id]
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/photos/upload
2026-Feb-28 10:32:57.660345
#15 13.18 ├ ƒ /api/profiles
2026-Feb-28 10:32:57.660345
#15 13.18 └ ƒ /api/uploads/[...path]
2026-Feb-28 10:32:57.660345
#15 13.18
2026-Feb-28 10:32:57.660345
#15 13.18
2026-Feb-28 10:32:57.660345
#15 13.18 ○  (Static)   prerendered as static content
2026-Feb-28 10:32:57.660345
#15 13.18 ƒ  (Dynamic)  server-rendered on demand
2026-Feb-28 10:32:57.660345
#15 13.18
2026-Feb-28 10:32:57.660345
#15 DONE 13.4s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#16 [builder 8/8] RUN cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/
2026-Feb-28 10:32:57.660345
#16 DONE 0.1s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#17 [runner  5/15] COPY --from=builder --chown=nextjs:nodejs /app/public ./public
2026-Feb-28 10:32:57.660345
#17 DONE 0.2s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#18 [runner  6/15] RUN mkdir -p /app/public/uploads && chown nextjs:nodejs /app/public/uploads
2026-Feb-28 10:32:57.660345
#18 DONE 0.1s
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#19 [runner  7/15] COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
2026-Feb-28 10:32:57.660345
#19 ...
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#20 [runner  9/15] COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
2026-Feb-28 10:32:57.660345
#20 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#21 [runner 10/15] COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
2026-Feb-28 10:32:57.660345
#21 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#22 [runner 11/15] COPY --from=builder /app/node_modules/@prisma/engines ./node_modules/@prisma/engines
2026-Feb-28 10:32:57.660345
#22 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#23 [runner 12/15] COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
2026-Feb-28 10:32:57.660345
#23 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#24 [runner  8/15] COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
2026-Feb-28 10:32:57.660345
#24 CACHED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#25 [runner 13/15] COPY --from=builder /app/node_modules/@prisma/migrate ./node_modules/@prisma/migrate
2026-Feb-28 10:32:57.660345
#25 ERROR: failed to calculate checksum of ref 24187df1-2369-425a-95a9-f2f27bf37d7d::494uzds4u5jggqmog4mvh2nmz: "/app/node_modules/@prisma/migrate": not found
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#19 [runner  7/15] COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
2026-Feb-28 10:32:57.660345
#19 CANCELED
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
#26 [runner 14/15] COPY --from=builder /app/node_modules/@prisma/schema-files-loader ./node_modules/@prisma/schema-files-loader
2026-Feb-28 10:32:57.660345
#26 ERROR: failed to calculate checksum of ref 24187df1-2369-425a-95a9-f2f27bf37d7d::494uzds4u5jggqmog4mvh2nmz: "/app/node_modules/@prisma/schema-files-loader": not found
2026-Feb-28 10:32:57.660345
------
2026-Feb-28 10:32:57.660345
> [runner 13/15] COPY --from=builder /app/node_modules/@prisma/migrate ./node_modules/@prisma/migrate:
2026-Feb-28 10:32:57.660345
------
2026-Feb-28 10:32:57.660345
------
2026-Feb-28 10:32:57.660345
> [runner 14/15] COPY --from=builder /app/node_modules/@prisma/schema-files-loader ./node_modules/@prisma/schema-files-loader:
2026-Feb-28 10:32:57.660345
------
2026-Feb-28 10:32:57.660345
2026-Feb-28 10:32:57.660345
1 warning found (use docker --debug to expand):
2026-Feb-28 10:32:57.660345
- JSONArgsRecommended: JSON arguments recommended for CMD to prevent unintended behavior related to OS signals (line 115)
2026-Feb-28 10:32:57.660345
Dockerfile:102
2026-Feb-28 10:32:57.660345
--------------------
2026-Feb-28 10:32:57.660345
100 |     COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
2026-Feb-28 10:32:57.660345
101 |     COPY --from=builder /app/node_modules/@prisma/migrate ./node_modules/@prisma/migrate
2026-Feb-28 10:32:57.660345
102 | >>> COPY --from=builder /app/node_modules/@prisma/schema-files-loader ./node_modules/@prisma/schema-files-loader
2026-Feb-28 10:32:57.660345
103 |
2026-Feb-28 10:32:57.660345
104 |     # Copy Prisma schema and migrations
2026-Feb-28 10:32:57.660345
--------------------
2026-Feb-28 10:32:57.660345
ERROR: failed to build: failed to solve: failed to compute cache key: failed to calculate checksum of ref 24187df1-2369-425a-95a9-f2f27bf37d7d::494uzds4u5jggqmog4mvh2nmz: "/app/node_modules/@prisma/schema-files-loader": not found
2026-Feb-28 10:32:57.660345
exit status 1
2026-Feb-28 10:32:57.750289
========================================
2026-Feb-28 10:32:57.757599
Deployment failed. Removing the new version of your application.
2026-Feb-28 10:32:58.245217
Gracefully shutting down build container: yg40wwgwo888ow0k4cc4s848