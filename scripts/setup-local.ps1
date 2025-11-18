# PowerShell Script para Setup Local en Windows

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  SaaS Website Builder Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar Docker
Write-Host "Verificando Docker..." -ForegroundColor Yellow
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Docker no esta instalado." -ForegroundColor Red
    Write-Host "Descarga: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}
Write-Host "OK: Docker esta instalado" -ForegroundColor Green

# Verificar que Docker esta corriendo
Write-Host "Verificando que Docker esta corriendo..." -ForegroundColor Yellow
$dockerTest = docker ps 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker no esta corriendo." -ForegroundColor Red
    Write-Host "1. Abre Docker Desktop" -ForegroundColor Yellow
    Write-Host "2. Espera a que el icono sea verde" -ForegroundColor Yellow
    Write-Host "3. Vuelve a ejecutar: npm run setup" -ForegroundColor Yellow
    exit 1
}
Write-Host "OK: Docker esta corriendo" -ForegroundColor Green

# Verificar Node.js
Write-Host ""
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js no esta instalado." -ForegroundColor Red
    Write-Host "Descarga: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
$nodeVersion = node -v
Write-Host "OK: Node.js $nodeVersion esta instalado" -ForegroundColor Green

# Paso 1: Variables de entorno
Write-Host ""
Write-Host "Paso 1: Configurando variables de entorno..." -ForegroundColor Yellow
if (-not (Test-Path .env.local)) {
    Copy-Item .env.example .env.local
    Write-Host "OK: Archivo .env.local creado" -ForegroundColor Green
}
else {
    Write-Host "INFO: .env.local ya existe" -ForegroundColor Cyan
}

# Paso 2: Instalar dependencias
Write-Host ""
Write-Host "Paso 2: Instalando dependencias..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo la instalacion de dependencias" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Dependencias instaladas" -ForegroundColor Green

# Paso 3: Levantar servicios Docker
Write-Host ""
Write-Host "Paso 3: Iniciando servicios Docker..." -ForegroundColor Yellow
docker-compose up -d postgres redis minio mailhog
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo iniciar servicios Docker" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Servicios Docker iniciados" -ForegroundColor Green

# Paso 4: Esperar PostgreSQL
Write-Host ""
Write-Host "Paso 4: Esperando PostgreSQL..." -ForegroundColor Yellow
$maxAttempts = 30
$attempt = 0
$ready = $false

while (($attempt -lt $maxAttempts) -and (-not $ready)) {
    $attempt++
    $testResult = docker exec saas-db pg_isready -U admin -d saas_builder 2>&1
    if ($LASTEXITCODE -eq 0) {
        $ready = $true
    }
    else {
        Write-Host "Intento $attempt/$maxAttempts..." -ForegroundColor Cyan
        Start-Sleep -Seconds 2
    }
}

if (-not $ready) {
    Write-Host "ERROR: PostgreSQL no esta listo" -ForegroundColor Red
    exit 1
}
Write-Host "OK: PostgreSQL esta listo" -ForegroundColor Green

# Paso 5: Generar Prisma Client
Write-Host ""
Write-Host "Paso 5: Generando Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo generar Prisma Client" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Prisma Client generado" -ForegroundColor Green

# Paso 6: Ejecutar migraciones
Write-Host ""
Write-Host "Paso 6: Ejecutando migraciones..." -ForegroundColor Yellow
npx prisma migrate dev --name init
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo ejecutar migraciones" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Migraciones ejecutadas" -ForegroundColor Green

# Paso 7: Seed
Write-Host ""
Write-Host "Paso 7: Insertando datos de prueba..." -ForegroundColor Yellow
if (Test-Path "prisma/seed.js") {
    npx prisma db seed
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ADVERTENCIA: Error en seed" -ForegroundColor Yellow
    }
    else {
        Write-Host "OK: Datos insertados" -ForegroundColor Green
    }
}
else {
    Write-Host "INFO: No hay archivo seed" -ForegroundColor Cyan
}

# Paso 8: MinIO
Write-Host ""
Write-Host "Paso 8: Configurando MinIO..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
$minioResult = docker run --rm --network=workspace_saas-network --entrypoint sh minio/mc -c "mc alias set local http://minio:9000 minioadmin minioadmin && mc mb local/saas-uploads --ignore-existing && mc anonymous set download local/saas-uploads" 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "OK: MinIO configurado" -ForegroundColor Green
}
else {
    Write-Host "ADVERTENCIA: MinIO no configurado automaticamente" -ForegroundColor Yellow
    Write-Host "Puedes hacerlo manualmente en http://localhost:9001" -ForegroundColor Cyan
}

# Paso 9: Hosts
Write-Host ""
Write-Host "Paso 9: Configuracion de hosts locales" -ForegroundColor Yellow
Write-Host ""
Write-Host "Necesitas agregar estas lineas a tu archivo hosts:" -ForegroundColor Cyan
Write-Host ""
Write-Host "127.0.0.1  admin.localhost" -ForegroundColor White
Write-Host "127.0.0.1  panel.localhost" -ForegroundColor White
Write-Host "127.0.0.1  demo.localhost" -ForegroundColor White
Write-Host "127.0.0.1  cliente1.localhost" -ForegroundColor White
Write-Host "127.0.0.1  cliente2.localhost" -ForegroundColor White
Write-Host ""
Write-Host "Ubicacion: C:\Windows\System32\drivers\etc\hosts" -ForegroundColor Cyan
Write-Host "IMPORTANTE: Abre Notepad como ADMINISTRADOR" -ForegroundColor Yellow
Write-Host ""
$response = Read-Host "Quieres que abra el archivo hosts? (S/N)"
if (($response -eq "S") -or ($response -eq "s")) {
    Start-Process notepad "C:\Windows\System32\drivers\etc\hosts" -Verb RunAs
    Write-Host "OK: Archivo hosts abierto" -ForegroundColor Green
}
else {
    Write-Host "INFO: Recuerda agregar los hosts manualmente" -ForegroundColor Cyan
}

# Resumen
Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "  Setup Completado!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "URLs Importantes:" -ForegroundColor Cyan
Write-Host "  Panel Admin:    http://admin.localhost:3000" -ForegroundColor White
Write-Host "  Panel Cliente:  http://panel.localhost:3000" -ForegroundColor White
Write-Host "  Sitio Demo:     http://demo.localhost:3000" -ForegroundColor White
Write-Host "  MinIO Console:  http://localhost:9001" -ForegroundColor White
Write-Host "  MailHog:        http://localhost:8025" -ForegroundColor White
Write-Host ""
Write-Host "Para iniciar:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor Green
Write-Host ""
Write-Host "Credenciales:" -ForegroundColor Cyan
Write-Host "  Admin: admin@demo.com / admin123" -ForegroundColor White
Write-Host "  Cliente: cliente@demo.com / cliente123" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding!" -ForegroundColor Green
Write-Host ""
