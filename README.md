# Vidriera - Catálogo de Costura Artesanal

Sitio web público (vidriera/catálogo) para un emprendimiento de costura y confección. Los visitantes pueden explorar el catálogo de productos y realizar consultas a través de un formulario de contacto.

## Stack Tecnológico

- **Framework**: Astro (modo hybrid)
- **Estilos**: Tailwind CSS v4
- **Base de datos**: Supabase (PostgreSQL)
- **Imágenes**: Cloudflare R2
- **Deploy**: Cloudflare Pages / Vercel

## Características

- Catálogo de productos con imágenes
- Detalle de cada producto con galería
- Formulario de contacto/consulta
- Diseño responsive
- SSG para páginas estáticas, SSR para endpoints API
- Integración con Supabase para datos y consultas

## 🚀 Estructura del Proyecto

```
vidriera/
├── src/
│   ├── layouts/
│   │   └── Base.astro          # Layout principal
│   ├── components/
│   │   ├── Navbar.astro        # Barra de navegación
│   │   ├── Footer.astro        # Pie de página
│   │   ├── Hero.astro          # Sección hero
│   │   ├── ProductCard.astro   # Card de producto
│   │   ├── ProductGallery.astro # Galería de imágenes
│   │   └── ContactForm.astro   # Formulario de contacto
│   ├── lib/
│   │   └── supabase.ts         # Cliente Supabase
│   ├── pages/
│   │   ├── index.astro         # Página principal
│   │   ├── productos/
│   │   │   ├── index.astro     # Catálogo
│   │   │   └── [id].astro      # Detalle de producto
│   │   ├── contacto.astro      # Página de contacto
│   │   └── api/
│   │       └── consulta.ts     # Endpoint para consultas
│   └── styles/
│       └── global.css          # Estilos globales
├── .env                        # Variables de entorno
├── astro.config.mjs
└── package.json
```

## Configuración

### 1. Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 2. Base de Datos

El proyecto utiliza las siguientes tablas en Supabase:

- `productos`: Información de productos
- `producto_imagenes`: Imágenes de productos (URLs de R2)
- `consultas`: Consultas enviadas por visitantes

Las migraciones ya están aplicadas e incluyen:
- Tabla `consultas` con RLS
- Vistas públicas para productos e imágenes
- Políticas de seguridad

### 3. Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build

# Vista previa de la build
pnpm preview
```

## Diseño

El diseño sigue el sistema de diseño definido en Stitch:

- **Color primario**: #8B4557 (rosa viejo)
- **Color secundario**: #D4A0B0 (nude pink)
- **Color terciario**: #C9A96E (dorado suave)
- **Tipografía**: 
  - Headings: Libre Caslon Text (serif)
  - Body: Inter (sans-serif)
- **Border radius**: 8px

## Páginas

### Home (`/`)
- Hero con imagen de fondo
- Productos destacados (últimos 6 con stock)
- Sección "Sobre nosotros"
- CTA para contacto

### Catálogo (`/productos`)
- Grilla de productos con stock disponible
- Ordenados por fecha de creación (más recientes primero)
- Cards con imagen, nombre, precio y badge de disponibilidad

### Detalle de Producto (`/productos/[id]`)
- Galería de imágenes
- Información del producto (nombre, precio, stock)
- Formulario de consulta inline

### Contacto (`/contacto`)
- Formulario general de contacto
- Información de contacto (email, teléfono, redes sociales)
- Horarios de atención

## API

### POST `/api/consulta`

Endpoint para enviar consultas.

**Request Body:**
```json
{
  "nombre": "string (required)",
  "email": "string (required)",
  "telefono": "string (optional)",
  "mensaje": "string (required)",
  "producto_id": "number (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Consulta enviada correctamente"
}
```

## Seguridad

- RLS (Row Level Security) activo en Supabase
- Validación server-side de formularios
- Solo lectura pública de productos con stock
- Solo inserción pública en consultas
- Variables de entorno protegidas (server-side only)

## Deploy

### Cloudflare Pages

1. Conectar repositorio en Cloudflare Pages
2. Configurar variables de entorno
3. Build command: `pnpm build`
4. Output directory: `dist`

### Vercel

1. Conectar repositorio en Vercel
2. Configurar variables de entorno
3. Deploy automático en cada push

## Próximos Pasos

- [ ] Configurar rebuild automático cuando se actualicen productos
- [ ] Agregar SEO (sitemap, meta tags dinámicos)
- [ ] Implementar optimización de imágenes
- [ ] Agregar analytics
- [ ] Implementar rate limiting en formulario

## Licencia

Privado - Proyecto para emprendimiento de costura artesanal
