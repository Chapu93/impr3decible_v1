# 🪟 Guía de Setup para Windows

Esta es una guía específica para configurar el proyecto en Windows.

## 📋 Requisitos Previos

### 1. Node.js 18+

Descarga e instala desde: https://nodejs.org/

Verifica la instalación:
```powershell
node --version
# Debe ser v18.0.0 o superior
```

### 2. Docker Desktop

Descarga e instala desde: https://www.docker.com/products/docker-desktop

**IMPORTANTE:** 
- Inicia Docker Desktop
- Asegúrate de que WSL 2 esté habilitado (recomendado)
- Espera a que Docker Desktop esté completamente iniciado (icono verde en la bandeja)

Verifica la instalación:
```powershell
docker --version
docker-compose --version
```

### 3. Git

Descarga desde: https://git-scm.com/download/win

## 🚀 Instalación Rápida

### Método 1: Setup Automático (Recomendado)

```powershell
# 1. Clonar el repositorio
git clone <tu-repositorio>
cd saas-website-builder
git checkout plataforma_v1

# 2. Ejecutar setup automático
npm install
npm run setup
```

El script hará todo automáticamente:
- ✅ Instalar dependencias
- ✅ Levantar Docker services
- ✅ Configurar base de datos
- ✅ Insertar datos de prueba
- ✅ Configurar MinIO

### Método 2: Setup Manual

Si el automático falla, sigue estos pasos:

#### Paso 1: Instalar dependencias
```powershell
npm install
```

#### Paso 2: Copiar variables de entorno
```powershell
Copy-Item .env.example .env.local
```

#### Paso 3: Levantar servicios Docker
```powershell
npm run docker:up
```

Espera 10-15 segundos para que los servicios inicien.

#### Paso 4: Verificar que PostgreSQL está listo
```powershell
docker exec saas-db pg_isready -U admin -d saas_builder
```

Si dice "accepting connections", está listo.

#### Paso 5: Generar Prisma Client
```powershell
npx prisma generate
```

#### Paso 6: Ejecutar migraciones
```powershell
npx prisma migrate dev --name init
```

#### Paso 7: Insertar datos de prueba
```powershell
npx prisma db seed
```

#### Paso 8: Configurar MinIO (opcional)
```powershell
npm run setup:minio
```

## 🌐 Configurar Hosts Locales

Para que los subdominios funcionen, necesitas editar el archivo hosts de Windows.

### Opción A: Automática (Requiere PowerShell como Admin)

```powershell
# Ejecuta PowerShell como ADMINISTRADOR
Add-Content -Path C:\Windows\System32\drivers\etc\hosts -Value "`n127.0.0.1  admin.localhost"
Add-Content -Path C:\Windows\System32\drivers\etc\hosts -Value "127.0.0.1  panel.localhost"
Add-Content -Path C:\Windows\System32\drivers\etc\hosts -Value "127.0.0.1  demo.localhost"
Add-Content -Path C:\Windows\System32\drivers\etc\hosts -Value "127.0.0.1  cliente1.localhost"
Add-Content -Path C:\Windows\System32\drivers\etc\hosts -Value "127.0.0.1  cliente2.localhost"
```

### Opción B: Manual (Más fácil)

1. **Abre el Bloc de notas como ADMINISTRADOR**:
   - Busca "Notepad" en el menú inicio
   - Click derecho → "Ejecutar como administrador"

2. **Abre el archivo hosts**:
   - File → Open
   - Navega a: `C:\Windows\System32\drivers\etc`
   - Cambia el filtro de "Text Documents" a "All Files"
   - Selecciona el archivo `hosts`

3. **Agrega estas líneas al final**:
   ```
   127.0.0.1  admin.localhost
   127.0.0.1  panel.localhost
   127.0.0.1  demo.localhost
   127.0.0.1  cliente1.localhost
   127.0.0.1  cliente2.localhost
   ```

4. **Guarda el archivo** (Ctrl + S)

5. **Limpia el caché DNS**:
   ```powershell
   ipconfig /flushdns
   ```

## 🎯 Iniciar el Proyecto

```powershell
npm run dev
```

El servidor estará disponible en:
- 🏠 **Home**: http://localhost:3000
- 🏢 **Panel Admin**: http://admin.localhost:3000
- 👤 **Panel Cliente**: http://panel.localhost:3000
- 🌐 **Sitio Demo**: http://demo.localhost:3000

## 🔐 Credenciales de Prueba

### Admin Panel
- Email: `admin@demo.com`
- Password: `admin123`
- URL: http://admin.localhost:3000

### Cliente Panel
- Email: `cliente@demo.com`
- Password: `cliente123`
- URL: http://panel.localhost:3000

### Servicios
- **PostgreSQL**: localhost:5432 (admin / admin123)
- **Redis**: localhost:6379
- **MinIO Console**: http://localhost:9001 (minioadmin / minioadmin)
- **MailHog**: http://localhost:8025
- **Prisma Studio**: `npx prisma studio`

## 🛠️ Comandos Útiles

### Desarrollo
```powershell
npm run dev              # Iniciar Next.js
npm run build            # Build para producción
npm run start            # Iniciar producción
npm run lint             # Lint código
```

### Docker
```powershell
npm run docker:up        # Levantar servicios
npm run docker:down      # Detener servicios
npm run docker:logs      # Ver logs
npm run docker:clean     # Limpiar todo
```

### Base de Datos
```powershell
npm run db:studio        # Ver base de datos
npm run db:migrate       # Crear migración
npm run db:seed          # Insertar datos de prueba
npm run db:reset         # Resetear base de datos
```

## 🐛 Problemas Comunes en Windows

### Error: "execution policy"

Si ves un error de política de ejecución:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Luego intenta de nuevo.

### Error: "Docker is not running"

1. Abre Docker Desktop
2. Espera a que el icono sea verde
3. Verifica con: `docker ps`
4. Intenta de nuevo

### Error: "Puerto 3000 en uso"

```powershell
# Encuentra el proceso
netstat -ano | findstr :3000

# Mata el proceso (reemplaza <PID> con el número que encontraste)
taskkill /PID <PID> /F
```

### Error: "PostgreSQL no conecta"

```powershell
# Verifica que el contenedor está corriendo
docker ps

# Reinicia el contenedor
docker restart saas-db

# Verifica los logs
docker logs saas-db
```

### Error: "Cannot find module 'prisma'"

```powershell
# Reinstala dependencias
Remove-Item -Recurse -Force node_modules
npm install
```

### Los subdominios no funcionan

1. Verifica que agregaste las líneas al archivo hosts
2. Limpia el caché DNS:
   ```powershell
   ipconfig /flushdns
   ```
3. Reinicia el navegador
4. Prueba en modo incógnito

### Docker es muy lento

Si usas WSL 2:
1. Asegúrate de que Docker Desktop está usando WSL 2 backend
2. Clona el repositorio DENTRO de WSL, no en C:\
3. Accede desde WSL:
   ```bash
   cd ~/projects
   git clone <repo>
   ```

## 💡 Recomendaciones para Windows

### 1. Usa Windows Terminal
Descarga desde Microsoft Store. Es mucho mejor que CMD.

### 2. Usa PowerShell 7+
```powershell
winget install Microsoft.PowerShell
```

### 3. Considera usar WSL 2
Para mejor rendimiento con Docker:
```powershell
wsl --install
```

Luego trabaja dentro de WSL.

### 4. Editor de Código
- **VS Code** es altamente recomendado
- Instala extensiones:
  - Prisma
  - Tailwind CSS IntelliSense
  - ESLint
  - Docker
  - WSL (si usas WSL)

## 📊 Verificar Instalación

Ejecuta estos comandos para verificar que todo está bien:

```powershell
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Docker
docker --version
docker ps

# Verificar servicios
docker ps --filter "name=saas-"

# Debería mostrar:
# - saas-db (PostgreSQL)
# - saas-redis (Redis)
# - saas-storage (MinIO)
# - saas-mail (MailHog)

# Verificar PostgreSQL
docker exec saas-db pg_isready -U admin

# Verificar que Next.js puede conectar
npm run dev
# Abre http://localhost:3000
```

## 🆘 Soporte

Si tienes problemas:

1. **Revisa los logs**:
   ```powershell
   docker-compose logs
   ```

2. **Limpia todo y empieza de nuevo**:
   ```powershell
   npm run docker:clean
   Remove-Item -Recurse -Force node_modules, .next
   npm install
   npm run setup
   ```

3. **Verifica requisitos del sistema**:
   - Windows 10/11
   - Docker Desktop corriendo
   - Node.js 18+
   - Al menos 4GB RAM libre
   - Al menos 10GB espacio en disco

## 🎉 ¡Listo!

Si todo funcionó, deberías poder:
- ✅ Acceder a http://localhost:3000
- ✅ Acceder a http://admin.localhost:3000
- ✅ Ver la base de datos con `npm run db:studio`
- ✅ Ver emails en http://localhost:8025
- ✅ Ver archivos en http://localhost:9001

**¡Ahora puedes empezar a desarrollar!** 🚀

Lee `PROXIMOS_PASOS.md` para el roadmap completo.
