# API de Administración de Modelos — Documentación Técnica

## Autenticación

Todos los endpoints requieren autenticación de admin. La cookie `auth-token` debe contener un token válido de un usuario con role `ADMIN`.

**Respuesta de error (403)**:
```json
{ "error": "No autorizado" }
```

---

## Endpoints

### 1. Listar Modelos

**`GET /api/admin/models`**

Lista todos los perfiles con paginación, búsqueda y filtros dinámicos.

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `page` | number | 1 | Página actual (mín: 1) |
| `limit` | number | 20 | Resultados por página (1–100) |
| `search` | string | — | Busca en nombre artístico, nombre real, email, ubicación |
| `status` | enum | ALL | `PENDING`, `APPROVED`, `REJECTED`, `ALL` |
| `featured` | enum | all | `true`, `false`, `all` |
| `sortBy` | enum | createdAt | `createdAt`, `artisticName`, `views`, `status`, `updatedAt` |
| `sortOrder` | enum | desc | `asc`, `desc` |

**Respuesta (200)**:
```json
{
  "data": [
    {
      "id": "cuid...",
      "artisticName": "María García",
      "status": "APPROVED",
      "featured": true,
      "views": 1524,
      "createdAt": "2026-01-15T10:00:00.000Z",
      "user": {
        "id": "cuid...",
        "name": "María",
        "email": "maria@email.com",
        "image": "/uploads/...",
        "createdAt": "2026-01-15T10:00:00.000Z"
      },
      "_count": { "photos": 12 }
    }
  ],
  "total": 45,
  "page": 1,
  "limit": 20,
  "totalPages": 3
}
```

---

### 2. Detalle de Modelo

**`GET /api/admin/models/[id]`**

| Parámetro | Ubicación | Descripción |
|-----------|-----------|-------------|
| `id` | Path | ID del perfil (cuid) |

**Respuesta (200)**: Perfil completo con `user` y array de `photos` (todas, sin filtrar por estado).

**Error (404)**:
```json
{ "error": "Perfil no encontrado" }
```

---

### 3. Editar Perfil

**`PUT /api/admin/models/[id]`**

| Parámetro | Ubicación | Descripción |
|-----------|-----------|-------------|
| `id` | Path | ID del perfil (cuid) |

**Body** (todos los campos son opcionales/nullish):
```json
{
  "artisticName": "string",
  "bio": "string (máx 2000 chars)",
  "birthDate": "YYYY-MM-DD",
  "nationality": "string",
  "location": "string",
  "height": 170,
  "weight": 55,
  "eyeColor": "string",
  "hairColor": "string",
  "skinTone": "string",
  "measurements": "90-60-90",
  "shoeSize": 38,
  "hobbies": "string",
  "languages": "string",
  "skills": "string",
  "experience": "string",
  "specialties": "string",
  "availability": "string",
  "instagram": "https://...",
  "twitter": "https://...",
  "tiktok": "https://..."
}
```

**Validaciones**:
- `height`: 100–250 cm
- `weight`: 30–200 kg
- `measurements`: formato `XX-XX-XX`
- `shoeSize`: 20–55
- URLs de redes sociales deben ser válidas

**Error (400)**:
```json
{
  "error": "Altura mínima: 100 cm",
  "details": [{ "path": ["height"], "message": "..." }]
}
```

---

### 4. Cambiar Estado

**`PATCH /api/admin/models/[id]/status`**

```json
{ "status": "APPROVED" }
```

Valores: `PENDING`, `APPROVED`, `REJECTED`

- Al aprobar → se registra `approvedAt`
- Al rechazar o poner pendiente → se limpia `approvedAt`

---

### 5. Toggle Destacado

**`PATCH /api/admin/models/[id]/featured`**

```json
{ "featured": true }
```

---

### 6. Gestión de Fotos

**`PATCH /api/admin/models/[id]/photos/[photoId]`** — Cambiar estado de foto
```json
{ "status": "APPROVED" }
```

**`DELETE /api/admin/models/[id]/photos/[photoId]`** — Eliminar foto

Elimina el registro de la DB y el archivo físico en `/public/uploads/`.

---

### 7. Exportar Modelos

**`GET /api/admin/models/export`**

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `format` | enum | csv | `csv`, `json` |
| `status` | enum | ALL | Filtrar por estado |
| `featured` | enum | all | Filtrar por destacados |

**CSV**: Descarga con BOM UTF-8 (compatible con Excel). Columnas en español.
**JSON**: Array de objetos con campos en español.

Header `Content-Disposition: attachment; filename="modelos_YYYY-MM-DD.csv"`.

---

## Códigos de Error

| Código | Significado |
|--------|-------------|
| 400 | Datos inválidos (validación Zod) |
| 403 | No autorizado (no es admin) |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |
