2026-Feb-28 01:43:42.369919
Starting deployment of JhonyAlex/bellas-glamour:main to localhost.
2026-Feb-28 01:43:42.588181
Preparing container with helper image: ghcr.io/coollabsio/coolify-helper:1.0.12
2026-Feb-28 01:43:43.946378
----------------------------------------
2026-Feb-28 01:43:43.953563
Importing JhonyAlex/bellas-glamour:main (commit sha b6829f5d4217964b3a64ce82fddc3e6c16cedb5b) to /artifacts/f0k48ssgwgo88sws880ckok4.
2026-Feb-28 01:43:45.629418
Image not found (l408sww8sw8s0oc40wwk8wg4:b6829f5d4217964b3a64ce82fddc3e6c16cedb5b). Building new image.
2026-Feb-28 01:43:46.680650
----------------------------------------
2026-Feb-28 01:43:46.686309
⚠️ Build-time environment variable warning: NODE_ENV=production
2026-Feb-28 01:43:46.691698
Affects: Node.js/npm/yarn/bun/pnpm
2026-Feb-28 01:43:46.697034
Issue: Skips devDependencies installation which are often required for building (webpack, typescript, etc.)
2026-Feb-28 01:43:46.702777
Recommendation: Uncheck "Available at Buildtime" or use "development" during build
2026-Feb-28 01:43:46.708909
2026-Feb-28 01:43:46.714384
💡 Tips to resolve build issues:
2026-Feb-28 01:43:46.719817
1. Set these variables as "Runtime only" in the environment variables settings
2026-Feb-28 01:43:46.725017
2. Use different values for build-time (e.g., NODE_ENV=development for build)
2026-Feb-28 01:43:46.730178
3. Consider using multi-stage Docker builds to separate build and runtime environments
2026-Feb-28 01:43:47.276093
----------------------------------------
2026-Feb-28 01:43:47.282226
Building docker image started.
2026-Feb-28 01:43:47.288473
To check the current progress, click on Show Debug Logs.
2026-Feb-28 01:44:00.785766
========================================
2026-Feb-28 01:44:00.796284
Deployment failed: Command execution failed (exit code 1): docker exec f0k48ssgwgo88sws880ckok4 bash -c 'bash /artifacts/build.sh'
2026-Feb-28 01:44:00.796284
Error: #0 building with "default" instance using docker driver
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#1 [internal] load build definition from Dockerfile
2026-Feb-28 01:44:00.796284
#1 transferring dockerfile: 3.76kB done
2026-Feb-28 01:44:00.796284
#1 DONE 0.0s
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#2 [internal] load metadata for docker.io/library/node:22-alpine
2026-Feb-28 01:44:00.796284
#2 DONE 0.6s
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#3 [internal] load .dockerignore
2026-Feb-28 01:44:00.796284
#3 transferring context: 177B done
2026-Feb-28 01:44:00.796284
#3 DONE 0.0s
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#4 [deps 1/5] FROM docker.io/library/node:22-alpine@sha256:e4bf2a82ad0a4037d28035ae71529873c069b13eb0455466ae0bc13363826e34
2026-Feb-28 01:44:00.796284
#4 DONE 0.0s
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#5 [runner  3/10] RUN addgroup --system --gid 1001 nodejs
2026-Feb-28 01:44:00.796284
#5 CACHED
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#6 [deps 2/5] WORKDIR /app
2026-Feb-28 01:44:00.796284
#6 CACHED
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#7 [runner  4/10] RUN adduser --system --uid 1001 nextjs
2026-Feb-28 01:44:00.796284
#7 CACHED
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#8 [internal] load build context
2026-Feb-28 01:44:00.796284
#8 transferring context: 840.60kB 0.0s done
2026-Feb-28 01:44:00.796284
#8 DONE 0.0s
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#9 [deps 3/5] RUN npm install -g bun
2026-Feb-28 01:44:00.796284
#9 CACHED
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#10 [deps 4/5] COPY package.json bun.lock ./
2026-Feb-28 01:44:00.796284
#10 CACHED
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#11 [deps 5/5] RUN NODE_ENV=development bun install --frozen-lockfile
2026-Feb-28 01:44:00.796284
#11 CACHED
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#12 [builder 4/8] COPY --from=deps /app/node_modules ./node_modules
2026-Feb-28 01:44:00.796284
#12 CACHED
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#13 [builder 5/8] COPY . .
2026-Feb-28 01:44:00.796284
#13 DONE 0.0s
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#14 [builder 6/8] RUN bunx prisma generate
2026-Feb-28 01:44:00.796284
#14 1.242 Prisma schema loaded from prisma/schema.prisma
2026-Feb-28 01:44:00.796284
#14 2.038
2026-Feb-28 01:44:00.796284
#14 2.038 ✔ Generated Prisma Client (v6.19.2) to ./node_modules/@prisma/client in 147ms
2026-Feb-28 01:44:00.796284
#14 2.038
2026-Feb-28 01:44:00.796284
#14 2.038 Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
2026-Feb-28 01:44:00.796284
#14 2.038
2026-Feb-28 01:44:00.796284
#14 2.038 Tip: Interested in query caching in just a few lines of code? Try Accelerate today! https://pris.ly/tip-3-accelerate
2026-Feb-28 01:44:00.796284
#14 2.038
2026-Feb-28 01:44:00.796284
#14 DONE 2.1s
2026-Feb-28 01:44:00.796284
2026-Feb-28 01:44:00.796284
#15 [builder 7/8] RUN NODE_ENV=production npx next build
2026-Feb-28 01:44:00.796284
#15 1.475 ⚠ `eslint` configuration in next.config.ts is no longer supported. See more info here: https://nextjs.org/docs/app/api-reference/cli/next#next-lint-options
2026-Feb-28 01:44:00.796284
#15 1.482 ⚠ Invalid next.config.ts options detected:
2026-Feb-28 01:44:00.796284
#15 1.482 ⚠     Unrecognized key(s) in object: 'eslint'
2026-Feb-28 01:44:00.796284
#15 1.482 ⚠ See more info here: https://nextjs.org/docs/messages/invalid-next-config
2026-Feb-28 01:44:00.796284
#15 1.494 ▲ Next.js 16.1.3 (Turbopack)
2026-Feb-28 01:44:00.796284
#15 1.494
2026-Feb-28 01:44:00.796284
#15 1.528   Creating an optimized production build ...
2026-Feb-28 01:44:00.796284
#15 9.810
2026-Feb-28 01:44:00.796284
#15 9.810 > Build error occurred
2026-Feb-28 01:44:00.796284
#15 9.818 Error: Turbopack build failed with 11 errors:
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/AdminDashboard.tsx:9:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:44:00.796284
#15 9.818    7 |   Loader2, AlertCircle, ChevronDown, ChevronUp
2026-Feb-28 01:44:00.796284
#15 9.818    8 | } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818 >  9 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818   10 | import { useToast } from "@/hooks/use-toast";
2026-Feb-28 01:44:00.796284
#15 9.818   11 |
2026-Feb-28 01:44:00.796284
#15 9.818   12 | interface PendingModel {
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/AdminDashboard.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/AdminDashboard.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/AgeGate.tsx:6:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:44:00.796284
#15 9.818   4 | import { motion, AnimatePresence } from "framer-motion";
2026-Feb-28 01:44:00.796284
#15 9.818   5 | import { Shield, AlertTriangle, Wine } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818 > 6 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818   7 |
2026-Feb-28 01:44:00.796284
#15 9.818   8 | interface AgeGateProps {
2026-Feb-28 01:44:00.796284
#15 9.818   9 |   onVerified: () => void;
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/AgeGate.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/AgeGate.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/AuthModal.tsx:6:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:44:00.796284
#15 9.818   4 | import { motion, AnimatePresence } from "framer-motion";
2026-Feb-28 01:44:00.796284
#15 9.818   5 | import { X, Mail, Lock, User, Camera, Loader2, Shield, Check } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818 > 6 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818   7 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:44:00.796284
#15 9.818   8 | import { Label } from "@/components/ui/label";
2026-Feb-28 01:44:00.796284
#15 9.818   9 | import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/AuthModal.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/AuthModal.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/HeroSection.tsx:5:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:44:00.796284
#15 9.818   3 | import { motion } from "framer-motion";
2026-Feb-28 01:44:00.796284
#15 9.818   4 | import { ChevronDown, Sparkles, Crown, Shield } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818 > 5 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818   6 | import { useEffect, useState } from "react";
2026-Feb-28 01:44:00.796284
#15 9.818   7 |
2026-Feb-28 01:44:00.796284
#15 9.818   8 | interface HeroSectionProps {
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/HeroSection.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/HeroSection.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/ModelDashboard.tsx:9:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:44:00.796284
#15 9.818    7 |   MapPin, Instagram, Twitter, Trash2, AlertCircle, CheckCircle
2026-Feb-28 01:44:00.796284
#15 9.818    8 | } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818 >  9 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818   10 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:44:00.796284
#15 9.818   11 | import { Label } from "@/components/ui/label";
2026-Feb-28 01:44:00.796284
#15 9.818   12 | import { Textarea } from "@/components/ui/textarea";
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelDashboard.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelDashboard.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/ModelGrid.tsx:7:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:44:00.796284
#15 9.818    5 | import { Search, SlidersHorizontal, X } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818    6 | import { ModelCard } from "./ModelCard";
2026-Feb-28 01:44:00.796284
#15 9.818 >  7 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818    8 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:44:00.796284
#15 9.818    9 | import {
2026-Feb-28 01:44:00.796284
#15 9.818   10 |   Select,
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelGrid.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelGrid.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/ModelProfile.tsx:5:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:44:00.796284
#15 9.818   3 | import { motion, AnimatePresence } from "framer-motion";
2026-Feb-28 01:44:00.796284
#15 9.818   4 | import { X, MapPin, Ruler, Eye, Heart, Instagram, Twitter, ChevronLeft, ChevronRight } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818 > 5 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818     | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818   6 | import { useState } from "react";
2026-Feb-28 01:44:00.796284
#15 9.818   7 |
2026-Feb-28 01:44:00.796284
#15 9.818   8 | interface Photo {
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelProfile.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelProfile.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/Navbar.tsx:7:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/button'
2026-Feb-28 01:44:00.796284
#15 9.818    5 | import { motion, AnimatePresence } from "framer-motion";
2026-Feb-28 01:44:00.796284
#15 9.818    6 | import { Menu, X, User, LogOut, Crown, Camera, Shield } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818 >  7 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818    8 | import { useAuthStore } from "@/store/authStore";
2026-Feb-28 01:44:00.796284
#15 9.818    9 |
2026-Feb-28 01:44:00.796284
#15 9.818   10 | interface NavbarProps {
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/button' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/Navbar.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/Navbar.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/AuthModal.tsx:7:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/input'
2026-Feb-28 01:44:00.796284
#15 9.818    5 | import { X, Mail, Lock, User, Camera, Loader2, Shield, Check } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818    6 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818 >  7 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:44:00.796284
#15 9.818      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818    8 | import { Label } from "@/components/ui/label";
2026-Feb-28 01:44:00.796284
#15 9.818    9 | import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
2026-Feb-28 01:44:00.796284
#15 9.818   10 | import { useAuthStore } from "@/store/authStore";
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/input' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/AuthModal.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/AuthModal.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/ModelDashboard.tsx:10:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/input'
2026-Feb-28 01:44:00.796284
#15 9.818    8 | } from "lucide-react";
2026-Feb-28 01:44:00.796284
#15 9.818    9 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818 > 10 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:44:00.796284
#15 9.818      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818   11 | import { Label } from "@/components/ui/label";
2026-Feb-28 01:44:00.796284
#15 9.818   12 | import { Textarea } from "@/components/ui/textarea";
2026-Feb-28 01:44:00.796284
#15 9.818   13 | import { useAuthStore } from "@/store/authStore";
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/input' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelDashboard.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelDashboard.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 ./src/components/bellas/ModelGrid.tsx:8:1
2026-Feb-28 01:44:00.796284
#15 9.818 Module not found: Can't resolve '@/components/ui/input'
2026-Feb-28 01:44:00.796284
#15 9.818    6 | import { ModelCard } from "./ModelCard";
2026-Feb-28 01:44:00.796284
#15 9.818    7 | import { Button } from "@/components/ui/button";
2026-Feb-28 01:44:00.796284
#15 9.818 >  8 | import { Input } from "@/components/ui/input";
2026-Feb-28 01:44:00.796284
#15 9.818      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
2026-Feb-28 01:44:00.796284
#15 9.818    9 | import {
2026-Feb-28 01:44:00.796284
#15 9.818   10 |   Select,
2026-Feb-28 01:44:00.796284
#15 9.818   11 |   SelectContent,
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import map: aliased to relative './src/components/ui/input' inside of [project]/
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 Import traces:
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component Browser:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelGrid.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component Browser]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818   Client Component SSR:
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/components/bellas/ModelGrid.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Client Component SSR]
2026-Feb-28 01:44:00.796284
#15 9.818     ./src/app/page.tsx [Server Component]
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818 https://nextjs.org/docs/messages/module-not-found
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/AdminDashboard.tsx:9:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/AgeGate.tsx:6:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/AuthModal.tsx:6:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/HeroSection.tsx:5:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/ModelDashboard.tsx:9:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/ModelGrid.tsx:7:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/ModelProfile.tsx:5:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/Navbar.tsx:7:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/AuthModal.tsx:7:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/ModelDashboard.tsx:10:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (./src/components/bellas/ModelGrid.tsx:8:1)
2026-Feb-28 01:44:00.796284
#15 9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
#15 ERROR: process "/bin/sh -c NODE_ENV=production npx next build" did not complete successfully: exit code: 1
2026-Feb-28 01:44:00.796284
------
2026-Feb-28 01:44:00.796284
> [builder 7/8] RUN NODE_ENV=production npx next build:
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (./src/components/bellas/ModelProfile.tsx:5:1)
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (./src/components/bellas/Navbar.tsx:7:1)
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (./src/components/bellas/AuthModal.tsx:7:1)
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (./src/components/bellas/ModelDashboard.tsx:10:1)
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (./src/components/bellas/ModelGrid.tsx:8:1)
2026-Feb-28 01:44:00.796284
9.818     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
2026-Feb-28 01:44:00.796284
------
2026-Feb-28 01:44:00.796284
Dockerfile:56
2026-Feb-28 01:44:00.796284
--------------------
2026-Feb-28 01:44:00.796284
54 |     ENV NEXT_TELEMETRY_DISABLED=1
2026-Feb-28 01:44:00.796284
55 |
2026-Feb-28 01:44:00.796284
56 | >>> RUN NODE_ENV=production npx next build
2026-Feb-28 01:44:00.796284
57 |
2026-Feb-28 01:44:00.796284
58 |     # Copiar archivos estáticos al standalone (requerido por Next.js standalone)
2026-Feb-28 01:44:00.796284
--------------------
2026-Feb-28 01:44:00.796284
ERROR: failed to build: failed to solve: process "/bin/sh -c NODE_ENV=production npx next build" did not complete successfully: exit code: 1
2026-Feb-28 01:44:00.796284
exit status 1
2026-Feb-28 01:44:00.872159
========================================
2026-Feb-28 01:44:00.879717
Deployment failed. Removing the new version of your application.
2026-Feb-28 01:44:01.387553
Gracefully shutting down build container: f0k48ssgwgo88sws880ckok4