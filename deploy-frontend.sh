#!/bin/bash

# Colores para la terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Script de Deploy - Invitación Bautizo${NC}"
echo ""

# Verificar si estamos en la raíz del proyecto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Ejecuta este script desde la raíz del proyecto${NC}"
    exit 1
fi

# Paso 1: Build del frontend
echo -e "${YELLOW}📦 Paso 1: Building frontend...${NC}"
ng build --configuration production --base-href /invitacion-bautizo/ 2>&1

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en el build del frontend${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completado${NC}"
echo ""

# Paso 2: Deploy a GitHub Pages
echo -e "${YELLOW}📤 Paso 2: Desplegando a GitHub Pages...${NC}"
npx angular-cli-ghpages --dir=dist/invitacion-bautizo

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al desplegar en GitHub Pages${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend desplegado exitosamente!${NC}"
echo ""

# Paso 3: Recordatorio del backend
echo -e "${YELLOW}⚠️  RECORDATORIO:${NC}"
echo "No olvides desplegar el backend en Railway o Render"
echo ""
echo -e "${BLUE}Para Railway:${NC}"
echo "  cd backend"
echo "  railway login"
echo "  railway up"
echo ""
echo -e "${BLUE}Para Render:${NC}"
echo "  - Ve a render.com"
echo "  - New > Web Service"
echo "  - Conecta tu repositorio"
echo "  - Root Directory: backend"
echo ""

echo -e "${GREEN}✨ Deploy del frontend completado!${NC}"
echo -e "Tu sitio estará disponible en unos minutos en:"
echo -e "${BLUE}https://TU-USUARIO.github.io/invitacion-bautizo/${NC}"
