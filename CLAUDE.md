# Bellas Glamour - Instrucciones para IA

## Contexto obligatorio
Antes de trabajar en este proyecto, **lee siempre** [PROYECTO.md](PROYECTO.md). Contiene:
- Stack técnico, estructura de carpetas y schema de la DB
- Infraestructura: IP del servidor, SSH, contenedores Docker, redes
- Conexiones a la base de datos (Prisma y psql)
- Comandos útiles y historial de incidencias resueltas

## Reglas del proyecto
- Todo es **autoalojado**: servidor propio, Coolify, Supabase self-hosted
- La app conecta a PostgreSQL vía **Prisma** (no usa la API REST de Supabase)
- Las imágenes se guardan en **volumen Docker local** (`/public/uploads`), no en storage externo
- Build con **Node.js**, dependencias con **Bun**
- El idioma del código es **inglés**, los comentarios y docs en **español**
