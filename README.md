# BellasGlamour.com

Una plataforma exclusiva de conexión entre modelos de élite y empresas del mundo de la moda y la publicidad. Diseñada con una estética de lujo y elegancia nocturna.

## 🌟 Características

### Diseño High Fashion
- **Paleta de colores**: Jet Black (#050505), Deep Magenta (#8B0046), Platinum, Gold
- **Tipografías**: Playfair Display (títulos) y Montserrat (cuerpo)
- **Animaciones elegantes**: Framer Motion con transiciones suaves
- **Layout responsive**: Grid masonry adaptativo

### Funcionalidades Core
- **Hero Section**: Video background optimizado con lazy loading
- **Buscador Avanzado**: Filtros por edad, estatura, nacionalidad, características físicas
- **Perfiles de Modelos**: Galería de fotos, medidas, biografía
- **Sistema de Autenticación**: Roles (Modelo, Cliente, Admin)
- **Panel de Administración**: Moderación de perfiles y fotos
- **Contacto Directo**: Sistema de mensajería con rate limiting

### Optimizaciones Enterprise
- **Supabase Image Transformations**: CDN automático para imágenes
- **Búsqueda Full-Text**: PostgreSQL tsvector para búsquedas semánticas
- **Rate Limiting**: Anti-spam con límite de 5 mensajes/hora
- **WebM Video**: Ultra-comprimido con overlay de grano
- **Lazy Loading**: Optimización de rendimiento

## 🚀 Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (Backend-as-a-Service)
- **Estilos**: Tailwind CSS con componentes personalizados
- **Animaciones**: Framer Motion
- **Estado**: Zustand con persistencia
- **Despliegue**: Vercel

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/bellas-glamour.git

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Desarrollo local
npm run dev

# Construir para producción
npm run build
```

## 🔧 Variables de Entorno

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_NAME=BellasGlamour
VITE_APP_ENV=production
VITE_APP_URL=https://your-domain.vercel.app
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes UI reutilizables
│   ├── layout/         # Header, navegación
│   ├── home/           # Hero, modelos destacados
│   └── auth/           # Login, registro
├── pages/              # Vistas principales
├── store/              # Estado global (Zustand)
├── lib/                # Supabase y utilidades
└── styles/             # CSS personalizado
```

## 🎯 Demo en Vivo

La aplicación está desplegada en: **https://traebellas-glamourvkr0.vercel.app**

## 🔒 Seguridad

- Row Level Security (RLS) en Supabase
- Rate limiting para prevenir spam
- Validación de formularios
- Autenticación segura con JWT

## 📋 Próximas Mejoras

- [ ] Integración con pasarela de pago
- [ ] Sistema de notificaciones por email
- [ ] Chat en tiempo real
- [ ] Panel de analytics para modelos
- [ ] App móvil

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Equipo

Desarrollado por el equipo SOLO Builder - Trae IDE

---

**BellasGlamour** - Donde el lujo encuentra la perfección ✨