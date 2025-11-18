# 🚀 SaaS Website Builder

Plataforma SaaS completa para venta y personalización de sitios web (Landing Pages y E-commerce).

## 🌟 Características

- ✅ **Panel de Administración**: Gestión completa de clientes, sitios y plantillas
- ✅ **Panel de Cliente**: Interfaz intuitiva para personalización de sitios
- ✅ **Sistema de Plantillas**: Múltiples plantillas reutilizables
- ✅ **Multi-tenancy**: Subdominios y dominios personalizados
- ✅ **E-commerce Completo**: Gestión de productos, carrito, checkout
- ✅ **Base de Datos**: PostgreSQL con Prisma ORM
- ✅ **Caché**: Redis para alto rendimiento
- ✅ **Almacenamiento**: MinIO (S3-compatible) para archivos
- ✅ **Emails**: Sistema de notificaciones con Nodemailer
- ✅ **Docker**: Entorno completamente containerizado
- ✅ **TypeScript**: 100% type-safe

## 🛠️ Stack Tecnológico

### Frontend & Backend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Radix UI** - Componentes UI accesibles

### Base de Datos & Caché
- **PostgreSQL 16** - Base de datos relacional
- **Prisma** - ORM type-safe
- **Redis 7** - Caché en memoria

### Almacenamiento & Email
- **MinIO** - Object storage S3-compatible
- **Nodemailer** - Envío de emails
- **MailHog** - Testing de emails (desarrollo)

### Autenticación
- **NextAuth.js** - Autenticación completa
- **bcryptjs** - Hashing de contraseñas

### DevOps
- **Docker & Docker Compose** - Containerización
- **Nginx** - Reverse proxy para subdominios

## 📋 Requisitos Previos

- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **Docker** & **Docker Compose** ([Descargar](https://www.docker.com/))
- **Git** ([Descargar](https://git-scm.com/))

## 🚀 Instalación Rápida

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd saas-website-builder
git checkout plataforma_v1
```

### 2. Setup automático

```bash
npm run setup
```

Este script:
- ✅ Instala dependencias
- ✅ Configura Docker (PostgreSQL, Redis, MinIO, MailHog)
- ✅ Ejecuta migraciones de base de datos
- ✅ Inserta datos de prueba
- ✅ Configura MinIO buckets

### 3. Iniciar desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:
- 🏠 **Home**: http://localhost:3000
- 🏢 **Panel Admin**: http://admin.localhost:3000
- 👤 **Panel Cliente**: http://panel.localhost:3000
- 🌐 **Sitio Demo**: http://demo.localhost:3000

### 4. Configurar hosts locales

Agrega estas líneas a tu archivo `/etc/hosts` (Linux/Mac) o `C:\Windows\System32\drivers\etc\hosts` (Windows):

```
127.0.0.1  admin.localhost
127.0.0.1  panel.localhost
127.0.0.1  demo.localhost
127.0.0.1  cliente1.localhost
127.0.0.1  cliente2.localhost
```

## 🔐 Credenciales de Prueba

### Admin Panel
- **Email**: admin@demo.com
- **Password**: admin123
- **URL**: http://admin.localhost:3000

### Cliente Panel
- **Email**: cliente@demo.com
- **Password**: cliente123
- **URL**: http://panel.localhost:3000

### Servicios

| Servicio | URL | Usuario | Password |
|----------|-----|---------|----------|
| PostgreSQL | localhost:5432 | admin | admin123 |
| Redis | localhost:6379 | - | - |
| MinIO Console | http://localhost:9001 | minioadmin | minioadmin |
| MailHog | http://localhost:8025 | - | - |
| Prisma Studio | http://localhost:5555 | - | - |

## 📚 Comandos Disponibles

### Desarrollo
```bash
npm run dev              # Iniciar Next.js
npm run build            # Build para producción
npm run start            # Iniciar producción
npm run lint             # Lint código
npm run type-check       # Verificar tipos TypeScript
```

### Docker
```bash
npm run docker:up        # Levantar servicios
npm run docker:down      # Detener servicios
npm run docker:logs      # Ver logs
npm run docker:restart   # Reiniciar app
npm run docker:clean     # Limpiar todo (incluyendo volúmenes)
```

### Base de Datos
```bash
npm run db:migrate       # Crear migración
npm run db:migrate:deploy # Aplicar migraciones (producción)
npm run db:seed          # Insertar datos de prueba
npm run db:studio        # Abrir Prisma Studio
npm run db:reset         # Resetear base de datos
npm run db:generate      # Generar Prisma Client
npm run db:push          # Push schema (desarrollo rápido)
```

### Setup
```bash
npm run setup            # Setup completo automático
npm run setup:minio      # Solo configurar MinIO
```

## 📁 Estructura del Proyecto

```
saas-website-builder/
├── docker-compose.yml          # Configuración Docker
├── Dockerfile.dev              # Dockerfile desarrollo
├── Dockerfile.prod             # Dockerfile producción
├── next.config.js              # Configuración Next.js
├── tsconfig.json               # Configuración TypeScript
├── tailwind.config.js          # Configuración Tailwind
│
├── prisma/
│   ├── schema.prisma           # Schema de base de datos
│   ├── seed.js                 # Datos de prueba
│   └── migrations/             # Migraciones
│
├── nginx/
│   └── nginx.conf              # Configuración Nginx (subdominios)
│
├── scripts/
│   ├── setup-local.sh          # Script de setup
│   └── setup-minio.js          # Setup MinIO
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (admin)/           # Rutas panel admin
│   │   ├── (client)/          # Rutas panel cliente
│   │   ├── (public)/          # Sitios públicos
│   │   ├── api/               # API Routes
│   │   ├── layout.tsx         # Layout raíz
│   │   ├── page.tsx           # Página home
│   │   └── globals.css        # Estilos globales
│   │
│   ├── components/            # Componentes React
│   │   ├── admin/
│   │   ├── client/
│   │   ├── editor/
│   │   └── ui/
│   │
│   ├── lib/                   # Utilidades y configuración
│   │   ├── db.ts             # Prisma client
│   │   ├── redis.ts          # Redis client
│   │   ├── storage.ts        # MinIO client
│   │   └── email.ts          # Email service
│   │
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Funciones auxiliares
│   ├── types/                # TypeScript types
│   │
│   └── templates/            # Plantillas de sitios
│       └── ecommerce/        # Plantilla e-commerce
│
└── docs/                     # Documentación
```

## 🗄️ Modelo de Datos

### Entidades Principales

- **Company**: Empresa que usa la plataforma
- **Admin**: Usuarios administradores
- **Client**: Clientes finales
- **Template**: Plantillas de sitios
- **Site**: Sitios web de clientes
- **Product**: Productos (e-commerce)
- **Page**: Páginas personalizadas
- **Media**: Archivos multimedia

Ver schema completo en `prisma/schema.prisma`

## 🔄 Flujo de Trabajo

### 1. Admin crea cliente
```
Admin Panel → Crear Cliente → Email con credenciales
```

### 2. Cliente personaliza sitio
```
Cliente Panel → Elegir Plantilla → Personalizar → Publicar
```

### 3. Sitio publicado
```
Subdominio asignado → Sitio en vivo → Analytics
```

## 🌐 Subdominios

El sistema soporta tres tipos de subdominios:

1. **admin.localhost** - Panel de administración
2. **panel.localhost** - Panel de clientes
3. **[cliente].localhost** - Sitios públicos de clientes

En producción:
- admin.tudominio.com
- panel.tudominio.com
- cliente1.tudominio.com

## 🚀 Deployment

### Opción 1: Vercel + Supabase (Recomendado para MVP)

1. **Base de datos**: Supabase (PostgreSQL)
2. **Frontend/Backend**: Vercel
3. **Storage**: Vercel Blob o S3
4. **Cache**: Upstash Redis
5. **Email**: Resend

```bash
# Cambiar variables en .env.production
vercel deploy
```

### Opción 2: AWS (Full Stack)

1. **Base de datos**: RDS (PostgreSQL)
2. **App**: ECS/Fargate o EC2
3. **Storage**: S3
4. **Cache**: ElastiCache (Redis)
5. **Email**: SES

### Opción 3: DigitalOcean (Balance costo/rendimiento)

1. **Base de datos**: Managed Database
2. **App**: App Platform o Droplet
3. **Storage**: Spaces (S3-compatible)
4. **Cache**: Managed Redis
5. **Email**: SendGrid

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📊 Monitoreo

En desarrollo:
- **Prisma Studio**: Ver base de datos en tiempo real
- **MailHog**: Ver emails enviados
- **MinIO Console**: Ver archivos subidos
- **Docker logs**: Ver logs de servicios

## 🔧 Troubleshooting

### Docker no inicia
```bash
docker-compose down -v
docker-compose up -d
```

### Base de datos no conecta
```bash
docker exec saas-db pg_isready -U admin
```

### Prisma Client desactualizado
```bash
npm run db:generate
```

### Limpiar todo y empezar de nuevo
```bash
npm run docker:clean
rm -rf node_modules .next
npm install
npm run setup
```

## 📝 Variables de Entorno

Ver `.env.example` para todas las variables disponibles.

**Importantes**:
- `DATABASE_URL` - Conexión PostgreSQL
- `REDIS_URL` - Conexión Redis
- `NEXTAUTH_SECRET` - Secret para NextAuth
- `MINIO_*` - Configuración storage
- `SMTP_*` - Configuración emails

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es privado y propietario.

## 🆘 Soporte

Para soporte, contactar al equipo de desarrollo.

---

**¡Happy Coding! 🚀**
