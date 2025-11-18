# 📖 Guía de Setup Detallada

Esta guía te llevará paso a paso por el proceso de configuración del proyecto.

## 📋 Tabla de Contenidos

1. [Requisitos del Sistema](#requisitos-del-sistema)
2. [Instalación de Dependencias](#instalación-de-dependencias)
3. [Configuración de Docker](#configuración-de-docker)
4. [Configuración de Base de Datos](#configuración-de-base-de-datos)
5. [Configuración de Hosts](#configuración-de-hosts)
6. [Primer Inicio](#primer-inicio)
7. [Verificación](#verificación)

## 1. Requisitos del Sistema

### Node.js 18+

Verifica tu versión:
```bash
node --version
# Debe ser v18.0.0 o superior
```

Si no lo tienes instalado:
- **Linux/Mac**: Usa [nvm](https://github.com/nvm-sh/nvm)
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
  nvm install 18
  nvm use 18
  ```
- **Windows**: Descarga de [nodejs.org](https://nodejs.org/)

### Docker & Docker Compose

Verifica tu instalación:
```bash
docker --version
docker-compose --version
```

Si no lo tienes instalado:
- **Linux**: 
  ```bash
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker $USER
  ```
- **Mac**: Descarga [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Windows**: Descarga [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Git

```bash
git --version
```

## 2. Instalación de Dependencias

### Clonar el repositorio

```bash
git clone <tu-repositorio>
cd saas-website-builder
git checkout plataforma_v1
```

### Instalar dependencias de Node

```bash
npm install
```

Esto instalará:
- Next.js 14
- React 18
- Prisma
- TypeScript
- Tailwind CSS
- Y todas las demás dependencias

## 3. Configuración de Docker

### Levantar servicios

```bash
npm run docker:up
```

Esto iniciará:
- ✅ PostgreSQL (puerto 5432)
- ✅ Redis (puerto 6379)
- ✅ MinIO (puertos 9000, 9001)
- ✅ MailHog (puertos 1025, 8025)

### Verificar que los servicios están corriendo

```bash
docker ps
```

Deberías ver 4 contenedores:
- saas-db
- saas-redis
- saas-storage
- saas-mail

### Verificar logs (si algo falla)

```bash
# Ver todos los logs
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs postgres
docker-compose logs redis
```

## 4. Configuración de Base de Datos

### Generar Prisma Client

```bash
npm run db:generate
```

### Ejecutar migraciones

```bash
npm run db:migrate
```

Esto creará todas las tablas en PostgreSQL.

### Insertar datos de prueba

```bash
npm run db:seed
```

Esto creará:
- 1 empresa demo
- 1 admin (admin@demo.com)
- 1 cliente (cliente@demo.com)
- 1 plantilla e-commerce
- 1 sitio demo
- 3 productos de ejemplo

## 5. Configuración de Hosts

Para que los subdominios funcionen localmente, necesitas editar tu archivo hosts.

### Linux / Mac

```bash
sudo nano /etc/hosts
```

Agrega estas líneas al final:
```
127.0.0.1  admin.localhost
127.0.0.1  panel.localhost
127.0.0.1  demo.localhost
127.0.0.1  cliente1.localhost
127.0.0.1  cliente2.localhost
```

Guarda con `Ctrl + O`, luego `Enter`, y sal con `Ctrl + X`.

### Windows

1. Abre el Bloc de notas como Administrador
2. Abre el archivo: `C:\Windows\System32\drivers\etc\hosts`
3. Agrega las mismas líneas al final
4. Guarda el archivo

## 6. Primer Inicio

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

Verás:
```
✓ Ready in XXXms
○ Local:    http://localhost:3000
○ Network:  http://xxx.xxx.xxx.xxx:3000
```

## 7. Verificación

### Verificar que todo funciona

Abre tu navegador y visita:

#### Home Principal
http://localhost:3000

Deberías ver una página con 3 cards (Admin, Cliente, Demo).

#### Panel Admin
http://admin.localhost:3000

- Email: admin@demo.com
- Password: admin123

#### Panel Cliente
http://panel.localhost:3000

- Email: cliente@demo.com
- Password: cliente123

#### Sitio Demo
http://demo.localhost:3000

Deberías ver el e-commerce demo.

### Verificar servicios auxiliares

#### Prisma Studio (Base de datos)
```bash
npm run db:studio
```
Abre: http://localhost:5555

#### MinIO Console (Archivos)
Abre: http://localhost:9001
- Usuario: minioadmin
- Password: minioadmin

#### MailHog (Emails)
Abre: http://localhost:8025

Aquí verás todos los emails que envíe la aplicación.

## 🎉 ¡Listo!

Si llegaste hasta aquí y todo funciona, ¡felicidades! Tu entorno está completamente configurado.

## 🐛 Problemas Comunes

### Puerto 3000 en uso

```bash
# Encuentra el proceso
lsof -i :3000

# Mata el proceso
kill -9 <PID>
```

### Docker no inicia servicios

```bash
# Detener todo
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Limpiar imágenes huérfanas
docker system prune

# Reiniciar
docker-compose up -d
```

### PostgreSQL no acepta conexiones

```bash
# Ver logs
docker logs saas-db

# Reiniciar contenedor
docker restart saas-db

# Verificar que está listo
docker exec saas-db pg_isready -U admin -d saas_builder
```

### Prisma Client desactualizado

```bash
npm run db:generate
```

### Migraciones fallan

```bash
# Resetear base de datos (¡CUIDADO! Borra todo)
npm run db:reset

# O manualmente
docker-compose down -v
docker-compose up -d postgres
npm run db:migrate
npm run db:seed
```

### Subdominios no funcionan

1. Verifica `/etc/hosts`:
   ```bash
   cat /etc/hosts | grep localhost
   ```

2. Limpia caché DNS:
   - **Mac**: `sudo dscacheutil -flushcache`
   - **Windows**: `ipconfig /flushdns`
   - **Linux**: `sudo systemd-resolve --flush-caches`

3. Prueba con `curl`:
   ```bash
   curl -H "Host: admin.localhost" http://localhost:3000
   ```

### MailHog no recibe emails

1. Verifica que MailHog está corriendo:
   ```bash
   docker logs saas-mail
   ```

2. Verifica variables en `.env.local`:
   ```
   SMTP_HOST=localhost
   SMTP_PORT=1025
   ```

## 📚 Siguientes Pasos

1. **Explora el código**: Revisa `src/app/` para ver la estructura
2. **Modifica datos**: Edita `prisma/seed.js` y ejecuta `npm run db:seed`
3. **Crea tu primera plantilla**: En `src/templates/`
4. **Lee la documentación**: `README.md` tiene más detalles

## 🆘 ¿Aún tienes problemas?

Crea un issue en el repositorio con:
- Sistema operativo
- Versión de Node.js
- Versión de Docker
- Error completo
- Logs relevantes

---

**¡Happy Coding! 🚀**
