# PowerShell Script para Setup Local en Windows

# Colores
$RED = "Red"
$GREEN = "Green"
$YELLOW = "Yellow"
$BLUE = "Cyan"

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor $BLUE
Write-Host "║   🚀 SaaS Website Builder Setup 🚀    ║" -ForegroundColor $BLUE
Write-Host "║        Configuración Local             ║" -ForegroundColor $BLUE
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor $BLUE
Write-Host ""

# Verificar que Docker está instalado
Write-Host "Verificando Docker..." -ForegroundColor $YELLOW
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker no está instalado. Por favor instala Docker Desktop primero." -ForegroundColor $RED
    Write-Host "   Descarga: https://www.docker.com/products/docker-desktop" -ForegroundColor $YELLOW
    exit 1
}

Write-Host "✅ Docker está instalado" -ForegroundColor $GREEN

# Verificar que Docker está corriendo
Write-Host "Verificando que Docker está corriendo..." -ForegroundColor $YELLOW
$dockerRunning = $false
try {
    $null = docker ps 2>&1
    if ($LASTEXITCODE -eq 0) {
        $dockerRunning = $true
        Write-Host "✅ Docker está corriendo" -ForegroundColor $GREEN
    }
} catch {
    # Error capturado
}

if (-not $dockerRunning) {
    Write-Host "❌ Docker no está corriendo. Por favor inicia Docker Desktop." -ForegroundColor $RED
    Write-Host "   1. Abre Docker Desktop" -ForegroundColor $YELLOW
    Write-Host "   2. Espera a que el icono sea verde" -ForegroundColor $YELLOW
    Write-Host "   3. Vuelve a ejecutar: npm run setup" -ForegroundColor $YELLOW
    exit 1
}

# Verificar Node.js
Write-Host "`nVerificando Node.js..." -ForegroundColor $YELLOW
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js 18+ primero." -ForegroundColor $RED
    Write-Host "   Descarga: https://nodejs.org/" -ForegroundColor $YELLOW
    exit 1
}

$nodeVersion = node -v
Write-Host "✅ Node.js $nodeVersion está instalado" -ForegroundColor $GREEN

# 1. Copiar variables de entorno
Write-Host "`n📋 Paso 1: Configurando variables de entorno..." -ForegroundColor $YELLOW
if (!(Test-Path .env.local)) {
    Copy-Item .env.example .env.local
    Write-Host "✅ Archivo .env.local creado" -ForegroundColor $GREEN
} else {
    Write-Host "ℹ️  .env.local ya existe, saltando..." -ForegroundColor $BLUE
}

# 2. Instalar dependencias
Write-Host "`n📦 Paso 2: Instalando dependencias de Node.js..." -ForegroundColor $YELLOW
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando dependencias" -ForegroundColor $RED
    exit 1
}
Write-Host "✅ Dependencias instaladas" -ForegroundColor $GREEN

# 3. Levantar servicios Docker
Write-Host "`n🐳 Paso 3: Iniciando servicios Docker..." -ForegroundColor $YELLOW
docker-compose up -d postgres redis minio mailhog
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error iniciando servicios Docker" -ForegroundColor $RED
    exit 1
}
Write-Host "✅ Servicios Docker iniciados" -ForegroundColor $GREEN

# 4. Esperar a que los servicios estén listos
Write-Host "`n⏳ Paso 4: Esperando a que los servicios estén listos..." -ForegroundColor $YELLOW
Write-Host "   Esperando PostgreSQL..." -ForegroundColor $BLUE

$maxAttempts = 30
$attempt = 0
$ready = $false

while ($attempt -lt $maxAttempts -and !$ready) {
    $attempt++
    try {
        docker exec saas-db pg_isready -U admin -d saas_builder 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            $ready = $true
        } else {
            Write-Host "   Intento $attempt/$maxAttempts..." -ForegroundColor $BLUE
            Start-Sleep -Seconds 2
        }
    } catch {
        Write-Host "   Intento $attempt/$maxAttempts..." -ForegroundColor $BLUE
        Start-Sleep -Seconds 2
    }
}

if (!$ready) {
    Write-Host "❌ PostgreSQL no está listo después de $maxAttempts intentos" -ForegroundColor $RED
    exit 1
}

Write-Host "✅ PostgreSQL está listo" -ForegroundColor $GREEN

# 5. Generar Prisma Client
Write-Host "`n🔧 Paso 5: Generando Prisma Client..." -ForegroundColor $YELLOW
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error generando Prisma Client" -ForegroundColor $RED
    exit 1
}
Write-Host "✅ Prisma Client generado" -ForegroundColor $GREEN

# 6. Ejecutar migraciones
Write-Host "`n🗄️  Paso 6: Ejecutando migraciones de base de datos..." -ForegroundColor $YELLOW
npx prisma migrate dev --name init
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error ejecutando migraciones" -ForegroundColor $RED
    exit 1
}
Write-Host "✅ Migraciones ejecutadas" -ForegroundColor $GREEN

# 7. Seed de datos
if (Test-Path "prisma/seed.js") {
    Write-Host "`n🌱 Paso 7: Seeding base de datos..." -ForegroundColor $YELLOW
    npx prisma db seed
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Advertencia: Error en el seed, pero continuando..." -ForegroundColor $YELLOW
    } else {
        Write-Host "✅ Datos de prueba insertados" -ForegroundColor $GREEN
    }
} else {
    Write-Host "`nℹ️  Paso 7: No hay archivo de seed, saltando..." -ForegroundColor $BLUE
}

# 8. Configurar MinIO
Write-Host "`n📦 Paso 8: Configurando MinIO (S3 local)..." -ForegroundColor $YELLOW
Start-Sleep -Seconds 3

# Usar docker run para configurar MinIO
docker run --rm --network=workspace_saas-network --entrypoint sh minio/mc -c "mc alias set local http://minio:9000 minioadmin minioadmin && mc mb local/saas-uploads --ignore-existing && mc anonymous set download local/saas-uploads && echo 'Bucket creado y configurado'" 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ MinIO configurado" -ForegroundColor $GREEN
} else {
    Write-Host "⚠️  Advertencia: No se pudo configurar MinIO automáticamente" -ForegroundColor $YELLOW
    Write-Host "   Puedes configurarlo manualmente más tarde en http://localhost:9001" -ForegroundColor $BLUE
}

# 9. Configurar hosts locales
Write-Host "`n🌐 Paso 9: Configuración de hosts locales" -ForegroundColor $YELLOW
Write-Host "Para usar subdominios locales, necesitas agregar estas líneas al archivo hosts de Windows:" -ForegroundColor $BLUE
Write-Host ""
Write-Host "127.0.0.1  admin.localhost" -ForegroundColor $GREEN
Write-Host "127.0.0.1  panel.localhost" -ForegroundColor $GREEN
Write-Host "127.0.0.1  demo.localhost" -ForegroundColor $GREEN
Write-Host "127.0.0.1  cliente1.localhost" -ForegroundColor $GREEN
Write-Host "127.0.0.1  cliente2.localhost" -ForegroundColor $GREEN
Write-Host ""
Write-Host "📍 Ubicación del archivo hosts en Windows:" -ForegroundColor $YELLOW
Write-Host "   C:\Windows\System32\drivers\etc\hosts" -ForegroundColor $BLUE
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Necesitas abrir el Bloc de notas como ADMINISTRADOR para editarlo." -ForegroundColor $YELLOW
Write-Host ""
$response = Read-Host "¿Quieres que abra el archivo hosts para ti? (S/N)"
if ($response -eq "S" -or $response -eq "s" -or $response -eq "Y" -or $response -eq "y") {
    Start-Process notepad "C:\Windows\System32\drivers\etc\hosts" -Verb RunAs
    Write-Host "✅ Archivo hosts abierto. Agrega las líneas manualmente." -ForegroundColor $GREEN
} else {
    Write-Host "ℹ️  Recuerda agregar los hosts manualmente más tarde." -ForegroundColor $BLUE
}

# 10. Resumen final
Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor $GREEN
Write-Host "║     ✅ Setup Completado! 🎉            ║" -ForegroundColor $GREEN
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor $GREEN
Write-Host ""

Write-Host "📍 URLs Importantes:" -ForegroundColor $BLUE
Write-Host "  🖥️  Panel Admin:        " -NoNewline; Write-Host "http://admin.localhost:3000" -ForegroundColor $GREEN
Write-Host "  👤 Panel Cliente:       " -NoNewline; Write-Host "http://panel.localhost:3000" -ForegroundColor $GREEN
Write-Host "  🌍 Sitio Demo:          " -NoNewline; Write-Host "http://demo.localhost:3000" -ForegroundColor $GREEN
Write-Host "  🗄️  Base de Datos:      " -NoNewline; Write-Host "localhost:5432" -ForegroundColor $GREEN
Write-Host "  🔴 Redis:               " -NoNewline; Write-Host "localhost:6379" -ForegroundColor $GREEN
Write-Host "  📦 MinIO Console:       " -NoNewline; Write-Host "http://localhost:9001" -ForegroundColor $GREEN
Write-Host "  📧 MailHog (Emails):    " -NoNewline; Write-Host "http://localhost:8025" -ForegroundColor $GREEN
Write-Host "  🔍 Prisma Studio:       " -NoNewline; Write-Host "npx prisma studio" -ForegroundColor $GREEN

Write-Host "`n🚀 Para iniciar el desarrollo:" -ForegroundColor $BLUE
Write-Host "  npm run dev" -ForegroundColor $GREEN

Write-Host "`n📚 Comandos útiles:" -ForegroundColor $BLUE
Write-Host "  npm run dev              " -NoNewline; Write-Host "# Iniciar Next.js en modo desarrollo" -ForegroundColor $GREEN
Write-Host "  npm run docker:up        " -NoNewline; Write-Host "# Levantar todos los servicios Docker" -ForegroundColor $GREEN
Write-Host "  npm run docker:down      " -NoNewline; Write-Host "# Detener servicios Docker" -ForegroundColor $GREEN
Write-Host "  npm run db:studio        " -NoNewline; Write-Host "# Abrir Prisma Studio" -ForegroundColor $GREEN
Write-Host "  npm run db:migrate       " -NoNewline; Write-Host "# Crear nueva migración" -ForegroundColor $GREEN
Write-Host "  npm run db:reset         " -NoNewline; Write-Host "# Resetear base de datos" -ForegroundColor $GREEN

Write-Host "`n⚠️  Credenciales por defecto:" -ForegroundColor $YELLOW
Write-Host "  PostgreSQL: admin / admin123" -ForegroundColor $BLUE
Write-Host "  MinIO: minioadmin / minioadmin" -ForegroundColor $BLUE

Write-Host "`nHappy coding! 🚀`n" -ForegroundColor $GREEN
