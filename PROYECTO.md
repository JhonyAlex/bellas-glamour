# Bellas Glamour - Contexto del Proyecto

## Descripción
Agencia de modelos premium. App web para registro de modelos, gestión de perfiles, portfolios fotográficos y panel de administración.

## Stack Técnico
- **Framework**: Next.js 16.1 (App Router)
- **Runtime**: Node.js 22 (build/runtime), Bun (dependencias)
- **Lenguaje**: TypeScript
- **ORM**: Prisma 6.11 + PostgreSQL
- **UI**: Tailwind CSS 4, shadcn/ui (Radix), Framer Motion
- **State**: Zustand, React Query (TanStack)
- **Auth**: Manual (bcryptjs + sessions en DB)
- **Imágenes**: sharp (optimización), uploads locales en `/public/uploads`

## Estructura del Proyecto
```
src/
├── app/
│   ├── api/          # API Routes
│   │   ├── admin/    # Endpoints de administración
│   │   ├── auth/     # Login, registro, sesiones
│   │   ├── models/   # CRUD de modelos
│   │   ├── photos/   # Gestión de fotos
│   │   ├── profiles/ # Perfiles de modelos
│   │   └── uploads/  # Subida de imágenes
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── bellas/       # Componentes específicos del proyecto
│   └── ui/           # shadcn/ui components
├── hooks/            # Custom React hooks
├── lib/              # Utilidades, Prisma client, helpers
└── store/            # Zustand stores
prisma/
├── schema.prisma     # Schema de la base de datos
└── migrations/       # Migraciones de Prisma
```

## Base de Datos (Prisma Schema)
- **Users**: Roles ADMIN, MODEL, VISITOR. Auth con password hasheado.
- **Profiles**: Info del modelo (medidas, bio, redes sociales). Estados: PENDING → APPROVED/REJECTED.
- **Photos**: Portfolio fotográfico. Estados: PENDING → APPROVED/REJECTED. Ordenables.
- **Sessions**: Tokens de autenticación con expiración.

---

# Infraestructura (Todo Autoalojado)

## Servidor
| Campo | Valor |
|-------|-------|
| IP | `212.227.107.69` |
| SSH | `ssh root@212.227.107.69` |
| OS | Ubuntu |
| Coolify UI | `http://212.227.107.69:8000/` |

## Docker - Redes
| Red | Tipo | Uso |
|-----|------|-----|
| `coolify` | bridge | Red compartida entre servicios Coolify |
| `ws4cwskgkwowo08c00kkoscg` | bridge | Red interna de servicios Supabase |

## Contenedor de la App
| Campo | Valor |
|-------|-------|
| Nombre | `l408sww8sw8s0oc40wwk8wg4-114356204051` |
| Red | `coolify` |
| IP interna | `10.0.1.9` |
| Puerto | `3000` |

## Supabase (Self-Hosted via Coolify)
Todos los contenedores siguen el patrón: `supabase-{servicio}-ws4cwskgkwowo08c00kkoscg`

| Servicio | Contenedor | Redes |
|----------|-----------|-------|
| **DB (PostgreSQL)** | `supabase-db-ws4cwskgkwowo08c00kkoscg` | coolify + interna |
| Supavisor (Pooler) | `supabase-supavisor-ws4cwskgkwowo08c00kkoscg` | interna |
| Storage | `supabase-storage-ws4cwskgkwowo08c00kkoscg` | interna |
| Auth | `supabase-auth-ws4cwskgkwowo08c00kkoscg` | interna |
| Studio | `supabase-studio-ws4cwskgkwowo08c00kkoscg` | interna |
| Kong (API GW) | `supabase-kong-ws4cwskgkwowo08c00kkoscg` | interna |
| REST (PostgREST) | `supabase-rest-ws4cwskgkwowo08c00kkoscg` | interna |
| Edge Functions | `supabase-edge-functions-ws4cwskgkwowo08c00kkoscg` | interna |
| Analytics | `supabase-analytics-ws4cwskgkwowo08c00kkoscg` | interna |
| Vector | `supabase-vector-ws4cwskgkwowo08c00kkoscg` | interna |
| Meta | `supabase-meta-ws4cwskgkwowo08c00kkoscg` | interna |
| Minio | `supabase-minio-ws4cwskgkwowo08c00kkoscg` | interna |

### IPs de la DB
- Red coolify: `10.0.1.7`
- Red interna: `10.0.2.5`

## Conexión a la Base de Datos

### Desde Prisma (app)
```
DATABASE_URL=postgresql://postgres:<password>@supabase-db-ws4cwskgkwowo08c00kkoscg:5432/postgres
DIRECT_URL=postgresql://postgres:<password>@supabase-db-ws4cwskgkwowo08c00kkoscg:5432/postgres
```

### Acceso manual (psql desde el servidor)
```bash
docker exec -it supabase-db-ws4cwskgkwowo08c00kkoscg psql -U postgres
```

## Deploy
- Plataforma: **Coolify** (self-hosted)
- Build: Docker multi-stage (deps → builder → runner)
- Las migraciones de Prisma corren al iniciar el contenedor (non-blocking)
- Uploads se persisten en el volumen Docker `uploads_data`

## Comandos Útiles
```bash
# SSH al servidor
ssh root@212.227.107.69

# Ver logs de la app
docker logs -f l408sww8sw8s0oc40wwk8wg4-114356204051

# Ver logs de Supabase DB
docker logs -f supabase-db-ws4cwskgkwowo08c00kkoscg

# Conectarse a la DB
docker exec -it supabase-db-ws4cwskgkwowo08c00kkoscg psql -U postgres

# Ver estado de todos los contenedores Supabase
docker ps --format "table {{.Names}}\t{{.Status}}" | grep supabase

# Ver redes de un contenedor
docker inspect <nombre> --format '{{json .NetworkSettings.Networks}}' | python3 -m json.tool
```

## Historial de Incidencias Resueltas
1. **DIRECT_URL con hostname incorrecto** — El hostname estaba como `supabase-ws4cwskgkwowo08c00kkoscg-db` (orden invertido) en vez de `supabase-db-ws4cwskgkwowo08c00kkoscg`. Causaba fallo en migraciones al deploy.
2. **RLS deshabilitado** — Las tablas públicas no tenían Row Level Security activado. Se habilitó RLS en todas las tablas via psql.
