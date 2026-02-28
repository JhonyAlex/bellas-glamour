2026-Feb-28 01:27:47.665421
Starting deployment of JhonyAlex/bellas-glamour:main to localhost.
2026-Feb-28 01:27:47.875617
Preparing container with helper image: ghcr.io/coollabsio/coolify-helper:1.0.12
2026-Feb-28 01:27:49.418919
----------------------------------------
2026-Feb-28 01:27:49.424417
Importing JhonyAlex/bellas-glamour:main (commit sha 75691c2a2bd2cf2dc34d0a6d8e984fc9d183ee2c) to /artifacts/gc4g4s8cwc4owwgww8o88gog.
2026-Feb-28 01:27:51.117306
Image not found (l408sww8sw8s0oc40wwk8wg4:75691c2a2bd2cf2dc34d0a6d8e984fc9d183ee2c). Building new image.
2026-Feb-28 01:27:52.145779
----------------------------------------
2026-Feb-28 01:27:52.151716
⚠️ Build-time environment variable warning: NODE_ENV=production
2026-Feb-28 01:27:52.157199
Affects: Node.js/npm/yarn/bun/pnpm
2026-Feb-28 01:27:52.162479
Issue: Skips devDependencies installation which are often required for building (webpack, typescript, etc.)
2026-Feb-28 01:27:52.167700
Recommendation: Uncheck "Available at Buildtime" or use "development" during build
2026-Feb-28 01:27:52.172663
2026-Feb-28 01:27:52.177536
💡 Tips to resolve build issues:
2026-Feb-28 01:27:52.182403
1. Set these variables as "Runtime only" in the environment variables settings
2026-Feb-28 01:27:52.187499
2. Use different values for build-time (e.g., NODE_ENV=development for build)
2026-Feb-28 01:27:52.192618
3. Consider using multi-stage Docker builds to separate build and runtime environments
2026-Feb-28 01:27:52.756525
----------------------------------------
2026-Feb-28 01:27:52.761957
Building docker image started.
2026-Feb-28 01:27:52.766825
To check the current progress, click on Show Debug Logs.
2026-Feb-28 01:28:25.782230
========================================
2026-Feb-28 01:28:25.792055
Deployment failed: Command execution failed (exit code 1): docker exec gc4g4s8cwc4owwgww8o88gog bash -c 'bash /artifacts/build.sh'
2026-Feb-28 01:28:25.792055
Error: #0 building with "default" instance using docker driver
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#1 [internal] load build definition from Dockerfile
2026-Feb-28 01:28:25.792055
#1 transferring dockerfile: 3.14kB done
2026-Feb-28 01:28:25.792055
#1 DONE 0.0s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#2 [internal] load metadata for docker.io/oven/bun:1.2-alpine
2026-Feb-28 01:28:25.792055
#2 DONE 0.8s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#3 [internal] load .dockerignore
2026-Feb-28 01:28:25.792055
#3 transferring context: 177B done
2026-Feb-28 01:28:25.792055
#3 DONE 0.0s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#4 [deps 1/4] FROM docker.io/oven/bun:1.2-alpine@sha256:0841c588f6304300baf1d395ae339ce09a6e18c4b6a7cdd4fddcbdb87a2f096a
2026-Feb-28 01:28:25.792055
#4 DONE 0.0s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#5 [deps 2/4] WORKDIR /app
2026-Feb-28 01:28:25.792055
#5 CACHED
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#6 [internal] load build context
2026-Feb-28 01:28:25.792055
#6 transferring context: 802.10kB 0.0s done
2026-Feb-28 01:28:25.792055
#6 DONE 0.0s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#7 [deps 3/4] COPY package.json bun.lock ./
2026-Feb-28 01:28:25.792055
#7 CACHED
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#8 [runner  3/10] RUN addgroup --system --gid 1001 nodejs
2026-Feb-28 01:28:25.792055
#8 DONE 0.1s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#9 [runner  4/10] RUN adduser --system --uid 1001 nextjs
2026-Feb-28 01:28:25.792055
#9 DONE 0.1s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#10 [deps 4/4] RUN bun install --frozen-lockfile
2026-Feb-28 01:28:25.792055
#10 0.068 bun install v1.2.23 (cf136713)
2026-Feb-28 01:28:25.792055
#10 7.269
2026-Feb-28 01:28:25.792055
#10 7.269 + @tailwindcss/postcss@4.1.18
2026-Feb-28 01:28:25.792055
#10 7.269 + @types/bcryptjs@3.0.0
2026-Feb-28 01:28:25.792055
#10 7.269 + @types/react@19.2.8
2026-Feb-28 01:28:25.792055
#10 7.269 + @types/react-dom@19.2.3
2026-Feb-28 01:28:25.792055
#10 7.269 + bun-types@1.3.6
2026-Feb-28 01:28:25.792055
#10 7.269 + eslint@9.39.2
2026-Feb-28 01:28:25.792055
#10 7.269 + eslint-config-next@16.1.3
2026-Feb-28 01:28:25.792055
#10 7.269 + tailwindcss@4.1.18
2026-Feb-28 01:28:25.792055
#10 7.269 + tw-animate-css@1.4.0
2026-Feb-28 01:28:25.792055
#10 7.269 + typescript@5.9.3
2026-Feb-28 01:28:25.792055
#10 7.269 + @dnd-kit/core@6.3.1
2026-Feb-28 01:28:25.792055
#10 7.269 + @dnd-kit/sortable@10.0.0
2026-Feb-28 01:28:25.792055
#10 7.269 + @dnd-kit/utilities@3.2.2
2026-Feb-28 01:28:25.792055
#10 7.269 + @hookform/resolvers@5.2.2
2026-Feb-28 01:28:25.792055
#10 7.269 + @mdxeditor/editor@3.52.3
2026-Feb-28 01:28:25.792055
#10 7.269 + @prisma/client@6.19.2
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-accordion@1.2.12
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-alert-dialog@1.1.15
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-aspect-ratio@1.1.8
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-avatar@1.1.11
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-checkbox@1.3.3
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-collapsible@1.1.12
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-context-menu@2.2.16
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-dialog@1.1.15
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-dropdown-menu@2.1.16
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-hover-card@1.1.15
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-label@2.1.8
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-menubar@1.1.16
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-navigation-menu@1.2.14
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-popover@1.1.15
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-progress@1.1.8
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-radio-group@1.3.8
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-scroll-area@1.2.10
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-select@2.2.6
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-separator@1.1.8
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-slider@1.3.6
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-slot@1.2.4
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-switch@1.2.6
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-tabs@1.1.13
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-toast@1.2.15
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-toggle@1.1.10
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-toggle-group@1.1.11
2026-Feb-28 01:28:25.792055
#10 7.269 + @radix-ui/react-tooltip@1.2.8
2026-Feb-28 01:28:25.792055
#10 7.269 + @reactuses/core@6.1.9
2026-Feb-28 01:28:25.792055
#10 7.269 + @tanstack/react-query@5.90.19
2026-Feb-28 01:28:25.792055
#10 7.269 + @tanstack/react-table@8.21.3
2026-Feb-28 01:28:25.792055
#10 7.269 + bcryptjs@3.0.3
2026-Feb-28 01:28:25.792055
#10 7.269 + class-variance-authority@0.7.1
2026-Feb-28 01:28:25.792055
#10 7.269 + clsx@2.1.1
2026-Feb-28 01:28:25.792055
#10 7.269 + cmdk@1.1.1
2026-Feb-28 01:28:25.792055
#10 7.269 + date-fns@4.1.0
2026-Feb-28 01:28:25.792055
#10 7.269 + embla-carousel-react@8.6.0
2026-Feb-28 01:28:25.792055
#10 7.269 + framer-motion@12.26.2
2026-Feb-28 01:28:25.792055
#10 7.269 + input-otp@1.4.2
2026-Feb-28 01:28:25.792055
#10 7.269 + lucide-react@0.525.0
2026-Feb-28 01:28:25.792055
#10 7.269 + next@16.1.3
2026-Feb-28 01:28:25.792055
#10 7.269 + next-auth@4.24.13
2026-Feb-28 01:28:25.792055
#10 7.269 + next-intl@4.7.0
2026-Feb-28 01:28:25.792055
#10 7.269 + next-themes@0.4.6
2026-Feb-28 01:28:25.792055
#10 7.269 + prisma@6.19.2
2026-Feb-28 01:28:25.792055
#10 7.269 + react@19.2.3
2026-Feb-28 01:28:25.792055
#10 7.269 + react-day-picker@9.13.0
2026-Feb-28 01:28:25.792055
#10 7.269 + react-dom@19.2.3
2026-Feb-28 01:28:25.792055
#10 7.269 + react-hook-form@7.71.1
2026-Feb-28 01:28:25.792055
#10 7.269 + react-markdown@10.1.0
2026-Feb-28 01:28:25.792055
#10 7.269 + react-resizable-panels@3.0.6
2026-Feb-28 01:28:25.792055
#10 7.269 + react-syntax-highlighter@15.6.6
2026-Feb-28 01:28:25.792055
#10 7.269 + recharts@2.15.4
2026-Feb-28 01:28:25.792055
#10 7.269 + sharp@0.34.5
2026-Feb-28 01:28:25.792055
#10 7.269 + sonner@2.0.7
2026-Feb-28 01:28:25.792055
#10 7.269 + tailwind-merge@3.4.0
2026-Feb-28 01:28:25.792055
#10 7.269 + tailwindcss-animate@1.0.7
2026-Feb-28 01:28:25.792055
#10 7.269 + uuid@11.1.0
2026-Feb-28 01:28:25.792055
#10 7.269 + vaul@1.1.2
2026-Feb-28 01:28:25.792055
#10 7.269 + z-ai-web-dev-sdk@0.0.16
2026-Feb-28 01:28:25.792055
#10 7.269 + zod@4.3.5
2026-Feb-28 01:28:25.792055
#10 7.269 + zustand@5.0.10
2026-Feb-28 01:28:25.792055
#10 7.269
2026-Feb-28 01:28:25.792055
#10 7.269 829 packages installed [7.20s]
2026-Feb-28 01:28:25.792055
#10 DONE 8.6s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#11 [builder 3/6] COPY --from=deps /app/node_modules ./node_modules
2026-Feb-28 01:28:25.792055
#11 CACHED
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#12 [builder 4/6] COPY . .
2026-Feb-28 01:28:25.792055
#12 DONE 0.0s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#13 [builder 5/6] RUN bunx prisma generate
2026-Feb-28 01:28:25.792055
#13 1.548 Prisma schema loaded from prisma/schema.prisma
2026-Feb-28 01:28:25.792055
#13 1.901 [2K[1G[2K[1G[2K[1G[2K[1G
2026-Feb-28 01:28:25.792055
#13 2.129 ✔ Generated Prisma Client (v6.19.2) to ./node_modules/@prisma/client in 121ms
2026-Feb-28 01:28:25.792055
#13 2.129
2026-Feb-28 01:28:25.792055
#13 2.129 Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
2026-Feb-28 01:28:25.792055
#13 2.129
2026-Feb-28 01:28:25.792055
#13 2.129 Tip: Interested in query caching in just a few lines of code? Try Accelerate today! https://pris.ly/tip-3-accelerate
2026-Feb-28 01:28:25.792055
#13 2.129
2026-Feb-28 01:28:25.792055
#13 DONE 2.2s
2026-Feb-28 01:28:25.792055
2026-Feb-28 01:28:25.792055
#14 [builder 6/6] RUN bun run build
2026-Feb-28 01:28:25.792055
#14 0.070 $ next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/
2026-Feb-28 01:28:25.792055
#14 2.728 ▲ Next.js 16.1.3 (Turbopack)
2026-Feb-28 01:28:25.792055
#14 2.728
2026-Feb-28 01:28:25.792055
#14 2.751   Creating an optimized production build ...
2026-Feb-28 01:28:25.792055
#14 2.777 Error [NotImplementedError]: worker_threads.Worker option "stdout" is not yet implemented in Bun.
2026-Feb-28 01:28:25.792055
#14 2.777     at warnNotImplementedOnce (internal:shared:26:37)
2026-Feb-28 01:28:25.792055
#14 2.777     at new WorkerPool (unknown:1:23) {
2026-Feb-28 01:28:25.792055
#14 2.777   code: 'ERR_NOT_IMPLEMENTED'
2026-Feb-28 01:28:25.792055
#14 2.777 }
2026-Feb-28 01:28:25.792055
#14 2.777 Error [NotImplementedError]: worker_threads.Worker option "stderr" is not yet implemented in Bun.
2026-Feb-28 01:28:25.792055
#14 2.777     at warnNotImplementedOnce (internal:shared:26:37)
2026-Feb-28 01:28:25.792055
#14 2.777     at new WorkerPool (unknown:1:23) {
2026-Feb-28 01:28:25.792055
#14 2.777   code: 'ERR_NOT_IMPLEMENTED'
2026-Feb-28 01:28:25.792055
#14 2.777 }
2026-Feb-28 01:28:25.792055
#14 2.777 Error [NotImplementedError]: worker_threads.Worker option "resourceLimits" is not yet implemented in Bun.
2026-Feb-28 01:28:25.792055
#14 2.777     at warnNotImplementedOnce (internal:shared:26:37)
2026-Feb-28 01:28:25.792055
#14 2.777     at new WorkerPool (unknown:1:23) {
2026-Feb-28 01:28:25.792055
#14 2.777   code: 'ERR_NOT_IMPLEMENTED'
2026-Feb-28 01:28:25.792055
#14 2.777 }
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 > Build error occurred
2026-Feb-28 01:28:25.792055
#14 13.23 Error: Turbopack build failed with 11 errors:
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/AdminDashboard.tsx:9:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:28:25.792055
#14 13.23    7 |   Loader2, AlertCircle, ChevronDown, ChevronUp
2026-Feb-28 01:28:25.792055
#14 13.23    8 | } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23 >  9 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23   10 | import { useToast } from "@/hooks/use-toast";
2026-Feb-28 01:28:25.792055
#14 13.23   11 |
2026-Feb-28 01:28:25.792055
#14 13.23   12 | interface PendingModel {
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/AdminDashboard.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/AdminDashboard.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/AgeGate.tsx:6:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:28:25.792055
#14 13.23   4 | import { motion, AnimatePresence } from "framer-motion";
2026-Feb-28 01:28:25.792055
#14 13.23   5 | import { Shield, AlertTriangle, Wine } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23 > 6 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23   7 |
2026-Feb-28 01:28:25.792055
#14 13.23   8 | interface AgeGateProps {
2026-Feb-28 01:28:25.792055
#14 13.23   9 |   onVerified: () => void;
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/AgeGate.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/AgeGate.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/AuthModal.tsx:6:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:28:25.792055
#14 13.23   4 | import { motion, AnimatePresence } from "framer-motion";
2026-Feb-28 01:28:25.792055
#14 13.23   5 | import { X, Mail, Lock, User, Camera, Loader2, Shield, Check } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23 > 6 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23   7 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:28:25.792055
#14 13.23   8 | import { Label } from "@/components/ui/label";
2026-Feb-28 01:28:25.792055
#14 13.23   9 | import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/AuthModal.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/AuthModal.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/HeroSection.tsx:5:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:28:25.792055
#14 13.23   3 | import { motion } from "framer-motion";
2026-Feb-28 01:28:25.792055
#14 13.23   4 | import { ChevronDown, Sparkles, Crown, Shield } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23 > 5 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23   6 | import { useEffect, useState } from "react";
2026-Feb-28 01:28:25.792055
#14 13.23   7 |
2026-Feb-28 01:28:25.792055
#14 13.23   8 | interface HeroSectionProps {
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/HeroSection.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/HeroSection.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/ModelDashboard.tsx:9:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:28:25.792055
#14 13.23    7 |   MapPin, Instagram, Twitter, Trash2, AlertCircle, CheckCircle
2026-Feb-28 01:28:25.792055
#14 13.23    8 | } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23 >  9 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23   10 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:28:25.792055
#14 13.23   11 | import { Label } from "@/components/ui/label";
2026-Feb-28 01:28:25.792055
#14 13.23   12 | import { Textarea } from "@/components/ui/textarea";
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelDashboard.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelDashboard.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/ModelGrid.tsx:7:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:28:25.792055
#14 13.23    5 | import { Search, SlidersHorizontal, X } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23    6 | import { ModelCard } from "./ModelCard";
2026-Feb-28 01:28:25.792055
#14 13.23 >  7 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23    8 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:28:25.792055
#14 13.23    9 | import {
2026-Feb-28 01:28:25.792055
#14 13.23   10 |   Select,
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelGrid.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelGrid.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/ModelProfile.tsx:5:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:28:25.792055
#14 13.23   3 | import { motion, AnimatePresence } from "framer-motion";
2026-Feb-28 01:28:25.792055
#14 13.23   4 | import { X, MapPin, Ruler, Eye, Heart, Instagram, Twitter, ChevronLeft, ChevronRight } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23 > 5 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23   6 | import { useState } from "react";
2026-Feb-28 01:28:25.792055
#14 13.23   7 |
2026-Feb-28 01:28:25.792055
#14 13.23   8 | interface Photo {
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelProfile.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelProfile.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/Navbar.tsx:7:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:28:25.792055
#14 13.23    5 | import { motion, AnimatePresence } from "framer-motion";
2026-Feb-28 01:28:25.792055
#14 13.23    6 | import { Menu, X, User, LogOut, Crown, Camera, Shield } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23 >  7 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23    8 | import { useAuthStore } from "@/store/authStore";
2026-Feb-28 01:28:25.792055
#14 13.23    9 |
2026-Feb-28 01:28:25.792055
#14 13.23   10 | interface NavbarProps {
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/Navbar.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/Navbar.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/AuthModal.tsx:7:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/input'
2026-Feb-28 01:28:25.792055
#14 13.23    5 | import { X, Mail, Lock, User, Camera, Loader2, Shield, Check } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23    6 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23 >  7 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:28:25.792055
#14 13.23      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23    8 | import { Label } from "@/components/ui/label";
2026-Feb-28 01:28:25.792055
#14 13.23    9 | import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
2026-Feb-28 01:28:25.792055
#14 13.23   10 | import { useAuthStore } from "@/store/authStore";
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/input' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/AuthModal.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/AuthModal.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/ModelDashboard.tsx:10:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/input'
2026-Feb-28 01:28:25.792055
#14 13.23    8 | } from "lucide-react";
2026-Feb-28 01:28:25.792055
#14 13.23    9 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23 > 10 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:28:25.792055
#14 13.23      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23   11 | import { Label } from "@/components/ui/label";
2026-Feb-28 01:28:25.792055
#14 13.23   12 | import { Textarea } from "@/components/ui/textarea";
2026-Feb-28 01:28:25.792055
#14 13.23   13 | import { useAuthStore } from "@/store/authStore";
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/input' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelDashboard.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelDashboard.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 ./src/components/bellas/ModelGrid.tsx:8:1
2026-Feb-28 01:28:25.792055
#14 13.23 Module not found: Can't resolve '@/components/ui/input'
2026-Feb-28 01:28:25.792055
#14 13.23    6 | import { ModelCard } from "./ModelCard";
2026-Feb-28 01:28:25.792055
#14 13.23    7 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:28:25.792055
#14 13.23 >  8 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:28:25.792055
#14 13.23      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:28:25.792055
#14 13.23    9 | import {
2026-Feb-28 01:28:25.792055
#14 13.23   10 |   Select,
2026-Feb-28 01:28:25.792055
#14 13.23   11 |   SelectContent,
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import map: aliased to relative './src/components/ui/input' inside of [project]/
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 Import traces:
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component Browser:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelGrid.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23   Client Component SSR:
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/components/bellas/ModelGrid.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:28:25.792055
#14 13.23     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/AdminDashboard.tsx:9:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/AgeGate.tsx:6:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/AuthModal.tsx:6:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/HeroSection.tsx:5:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/ModelDashboard.tsx:9:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/ModelGrid.tsx:7:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/ModelProfile.tsx:5:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/Navbar.tsx:7:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/AuthModal.tsx:7:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/ModelDashboard.tsx:10:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (./src/components/bellas/ModelGrid.tsx:8:1)
2026-Feb-28 01:28:25.792055
#14 13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
#14 13.23     at workerMain (null)
2026-Feb-28 01:28:25.792055
#14 13.23     at processTicksAndRejections (null)
2026-Feb-28 01:28:25.792055
#14 13.38 error: script "build" exited with code 1
2026-Feb-28 01:28:25.792055
#14 ERROR: process "/bin/sh -c bun run build" did not complete successfully: exit code: 1
2026-Feb-28 01:28:25.792055
------
2026-Feb-28 01:28:25.792055
> [builder 6/6] RUN bun run build:
2026-Feb-28 01:28:25.792055
13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
13.23     at <unknown> (./src/components/bellas/AuthModal.tsx:7:1)
2026-Feb-28 01:28:25.792055
13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
13.23     at <unknown> (./src/components/bellas/ModelDashboard.tsx:10:1)
2026-Feb-28 01:28:25.792055
13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
13.23     at <unknown> (./src/components/bellas/ModelGrid.tsx:8:1)
2026-Feb-28 01:28:25.792055
13.23     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:28:25.792055
13.23     at workerMain (null)
2026-Feb-28 01:28:25.792055
13.23     at processTicksAndRejections (null)
2026-Feb-28 01:28:25.792055
13.38 error: script "build" exited with code 1
2026-Feb-28 01:28:25.792055
------
2026-Feb-28 01:28:25.792055
Dockerfile:49
2026-Feb-28 01:28:25.792055
--------------------
2026-Feb-28 01:28:25.792055
47 |     ENV NODE_ENV=production
2026-Feb-28 01:28:25.792055
48 |
2026-Feb-28 01:28:25.792055
49 | >>> RUN bun run build
2026-Feb-28 01:28:25.792055
50 |
2026-Feb-28 01:28:25.792055
51 |     # Stage 3: Runner (Production)
2026-Feb-28 01:28:25.792055
--------------------
2026-Feb-28 01:28:25.792055
ERROR: failed to build: failed to solve: process "/bin/sh -c bun run build" did not complete successfully: exit code: 1
2026-Feb-28 01:28:25.792055
exit status 1
2026-Feb-28 01:28:25.870245
========================================
2026-Feb-28 01:28:25.878960
Deployment failed. Removing the new version of your application.
2026-Feb-28 01:28:26.354291
Gracefully shutting down build container: gc4g4s8cwc4owwgww8o88gog