#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║   🚀 SaaS Website Builder Setup 🚀    ║"
echo "║        Configuración Local             ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Verificar que Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no está instalado. Por favor instala Docker primero.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose no está instalado. Por favor instala Docker Compose primero.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker está instalado${NC}"

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado. Por favor instala Node.js 18+ primero.${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js versión 18 o superior es requerida. Versión actual: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) está instalado${NC}"

# 1. Copiar variables de entorno
echo -e "\n${YELLOW}📋 Paso 1: Configurando variables de entorno...${NC}"
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✅ Archivo .env.local creado${NC}"
else
    echo -e "${BLUE}ℹ️  .env.local ya existe, saltando...${NC}"
fi

# 2. Instalar dependencias de Node
echo -e "\n${YELLOW}📦 Paso 2: Instalando dependencias de Node.js...${NC}"
npm install
echo -e "${GREEN}✅ Dependencias instaladas${NC}"

# 3. Levantar servicios Docker
echo -e "\n${YELLOW}🐳 Paso 3: Iniciando servicios Docker...${NC}"
docker-compose up -d postgres redis minio mailhog

# 4. Esperar a que los servicios estén listos
echo -e "\n${YELLOW}⏳ Paso 4: Esperando a que los servicios estén listos...${NC}"
echo -e "${BLUE}   Esperando PostgreSQL...${NC}"
sleep 5

# Verificar PostgreSQL
max_attempts=30
attempt=0
while ! docker exec saas-db pg_isready -U admin -d saas_builder > /dev/null 2>&1; do
    attempt=$((attempt+1))
    if [ $attempt -eq $max_attempts ]; then
        echo -e "${RED}❌ PostgreSQL no está listo después de $max_attempts intentos${NC}"
        exit 1
    fi
    echo -e "${BLUE}   Intento $attempt/$max_attempts...${NC}"
    sleep 2
done
echo -e "${GREEN}✅ PostgreSQL está listo${NC}"

# 5. Generar Prisma Client
echo -e "\n${YELLOW}🔧 Paso 5: Generando Prisma Client...${NC}"
npx prisma generate
echo -e "${GREEN}✅ Prisma Client generado${NC}"

# 6. Ejecutar migraciones
echo -e "\n${YELLOW}🗄️  Paso 6: Ejecutando migraciones de base de datos...${NC}"
npx prisma migrate dev --name init
echo -e "${GREEN}✅ Migraciones ejecutadas${NC}"

# 7. Seed de datos (si existe)
if [ -f "prisma/seed.ts" ] || [ -f "prisma/seed.js" ]; then
    echo -e "\n${YELLOW}🌱 Paso 7: Seeding base de datos...${NC}"
    npx prisma db seed
    echo -e "${GREEN}✅ Datos de prueba insertados${NC}"
else
    echo -e "\n${BLUE}ℹ️  Paso 7: No hay archivo de seed, saltando...${NC}"
fi

# 8. Configurar MinIO
echo -e "\n${YELLOW}📦 Paso 8: Configurando MinIO (S3 local)...${NC}"
sleep 3

# Crear bucket usando mc (MinIO Client)
docker run --rm --network=workspace_saas-network \
    --entrypoint sh minio/mc -c "\
    mc alias set local http://minio:9000 minioadmin minioadmin && \
    mc mb local/saas-uploads --ignore-existing && \
    mc anonymous set download local/saas-uploads && \
    echo 'Bucket creado y configurado'"

echo -e "${GREEN}✅ MinIO configurado${NC}"

# 9. Configurar hosts locales
echo -e "\n${YELLOW}🌐 Paso 9: Configuración de hosts locales${NC}"
echo -e "${BLUE}Para usar subdominios locales, agrega estas líneas a tu archivo /etc/hosts:${NC}"
echo -e "${GREEN}"
echo "127.0.0.1  admin.localhost"
echo "127.0.0.1  panel.localhost"
echo "127.0.0.1  cliente1.localhost"
echo "127.0.0.1  cliente2.localhost"
echo "127.0.0.1  demo.localhost"
echo -e "${NC}"
echo -e "${YELLOW}¿Quieres que lo agregue automáticamente? (requiere sudo) [y/N]:${NC} "
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "127.0.0.1  admin.localhost" | sudo tee -a /etc/hosts
    echo "127.0.0.1  panel.localhost" | sudo tee -a /etc/hosts
    echo "127.0.0.1  cliente1.localhost" | sudo tee -a /etc/hosts
    echo "127.0.0.1  cliente2.localhost" | sudo tee -a /etc/hosts
    echo "127.0.0.1  demo.localhost" | sudo tee -a /etc/hosts
    echo -e "${GREEN}✅ Hosts configurados${NC}"
else
    echo -e "${BLUE}ℹ️  Recuerda agregar los hosts manualmente${NC}"
fi

# 10. Resumen final
echo -e "\n${GREEN}"
echo "╔════════════════════════════════════════╗"
echo "║     ✅ Setup Completado! 🎉            ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "${BLUE}📍 URLs Importantes:${NC}"
echo -e "${GREEN}  🖥️  Panel Admin:        ${NC}http://admin.localhost:3000"
echo -e "${GREEN}  👤 Panel Cliente:       ${NC}http://panel.localhost:3000"
echo -e "${GREEN}  🌍 Sitio Demo:          ${NC}http://demo.localhost:3000"
echo -e "${GREEN}  🗄️  Base de Datos:      ${NC}localhost:5432"
echo -e "${GREEN}  🔴 Redis:               ${NC}localhost:6379"
echo -e "${GREEN}  📦 MinIO Console:       ${NC}http://localhost:9001"
echo -e "${GREEN}  📧 MailHog (Emails):    ${NC}http://localhost:8025"
echo -e "${GREEN}  🔍 Prisma Studio:       ${NC}npx prisma studio"

echo -e "\n${BLUE}🚀 Para iniciar el desarrollo:${NC}"
echo -e "${GREEN}  npm run dev${NC}"

echo -e "\n${BLUE}📚 Comandos útiles:${NC}"
echo -e "${GREEN}  npm run dev              ${NC}# Iniciar Next.js en modo desarrollo"
echo -e "${GREEN}  npm run docker:up        ${NC}# Levantar todos los servicios Docker"
echo -e "${GREEN}  npm run docker:down      ${NC}# Detener servicios Docker"
echo -e "${GREEN}  npm run db:studio        ${NC}# Abrir Prisma Studio"
echo -e "${GREEN}  npm run db:migrate       ${NC}# Crear nueva migración"
echo -e "${GREEN}  npm run db:reset         ${NC}# Resetear base de datos"

echo -e "\n${YELLOW}⚠️  Credenciales por defecto:${NC}"
echo -e "${BLUE}  PostgreSQL: admin / admin123"
echo -e "  MinIO: minioadmin / minioadmin${NC}"

echo -e "\n${GREEN}Happy coding! 🚀${NC}\n"
