Antes de trabajar en este proyecto, lee siempre `PROYECTO.md` en la raíz del repositorio. Contiene el contexto completo: stack técnico, estructura, infraestructura (servidor, Docker, Supabase self-hosted), conexiones a la DB, y comandos útiles.

Reglas clave:
- Todo es autoalojado (Coolify + Supabase self-hosted)
- La app usa Prisma para conectar a PostgreSQL (no la API REST de Supabase)
- Imágenes en volumen Docker local (/public/uploads)
- Build con Node.js, dependencias con Bun
- Código en inglés, comentarios y docs en español
