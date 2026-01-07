# Deployment Guide - Invitación Bautizo

## 🚀 Deploy Completo (Frontend + Backend)

### Paso 1: Desplegar Backend en Railway (GRATIS)

Railway es la opción más fácil y gratuita para el backend.

#### 1.1 Crear cuenta en Railway

1. Ve a [railway.app](https://railway.app)
2. Haz clic en "Start a New Project"
3. Selecciona "Deploy from GitHub repo" o "Empty Project"

#### 1.2 Desplegar el backend

**Opción A: Desde GitHub (Recomendado)**

```bash
# Crear repositorio en GitHub
git init
git add .
git commit -m "Initial commit - Invitación Bautizo"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/invitacion-bautizo.git
git push -u origin main
```

Luego en Railway:
- New Project > Deploy from GitHub repo
- Selecciona tu repositorio
- Root Directory: `backend`
- Railway detectará automáticamente Node.js
- ¡Deploy automático! 🎉

**Opción B: Railway CLI**

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# En la carpeta backend
cd backend
railway login
railway init
railway up
```

#### 1.3 Obtener la URL del backend

Una vez desplegado, Railway te dará una URL como:
```
https://invitacion-bautizo-production.up.railway.app
```

**⚠️ IMPORTANTE: Copia esta URL, la necesitarás para el frontend**

---

### Paso 2: Configurar Frontend para usar el Backend Desplegado

Edita `src/app/invitados.service.ts` línea 24:

```typescript
// ANTES:
private apiUrl = 'http://localhost:3000/api';

// DESPUÉS (usa tu URL de Railway):
private apiUrl = 'https://TU-APP.up.railway.app/api';
```

---

### Paso 3: Desplegar Frontend en GitHub Pages

#### 3.1 Instalar herramientas necesarias

```bash
npm install -g angular-cli-ghpages
```

#### 3.2 Crear repositorio en GitHub (si no lo has hecho)

1. Ve a [github.com](https://github.com) y crea un nuevo repositorio
2. Nómbralo: `invitacion-bautizo`
3. Hazlo público o privado (tu elección)

#### 3.3 Conectar y subir el código

```bash
# En la raíz del proyecto
git add .
git commit -m "Deploy: Frontend configurado para producción"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/invitacion-bautizo.git
git push -u origin main
```

#### 3.4 Build y Deploy en GitHub Pages

```bash
# Build de producción
ng build --configuration production --base-href /invitacion-bautizo/

# Deploy a GitHub Pages
npx angular-cli-ghpages --dir=dist/invitacion-bautizo
```

Tu sitio estará disponible en:
```
https://TU-USUARIO.github.io/invitacion-bautizo/
```

---

## 🎯 Alternativas para el Backend

### Opción 2: Render.com (GRATIS)

1. Crea cuenta en [render.com](https://render.com)
2. New > Web Service
3. Conecta tu repositorio GitHub
4. Configuración:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Deploy!

URL será: `https://tu-app.onrender.com`

### Opción 3: Vercel (Solo Frontend)

Si prefieres Vercel para el frontend:

```bash
npm install -g vercel
vercel --prod
```

---

## ✅ Checklist de Deployment

- [ ] Backend desplegado en Railway/Render
- [ ] URL del backend copiada
- [ ] Frontend actualizado con la URL del backend
- [ ] Contraseña de admin cambiada (en backend/server.js)
- [ ] Código subido a GitHub
- [ ] Build de producción ejecutado
- [ ] Frontend desplegado en GitHub Pages
- [ ] Probado en navegador

---

## 🔧 Script Rápido de Deploy

Guarda esto como `deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Iniciando deploy..."

# Backend (Railway)
echo "📦 Desplegando backend..."
cd backend
railway up
cd ..

# Frontend
echo "🎨 Building frontend..."
ng build --configuration production --base-href /invitacion-bautizo/

echo "📤 Desplegando a GitHub Pages..."
npx angular-cli-ghpages --dir=dist/invitacion-bautizo

echo "✅ Deploy completo!"
echo "Frontend: https://TU-USUARIO.github.io/invitacion-bautizo/"
echo "Backend: Revisa Railway para la URL"
```

Hazlo ejecutable:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🐛 Solución de Problemas

### Error: "No se puede conectar al backend"
- Verifica que la URL en `invitados.service.ts` sea correcta
- Revisa que el backend esté corriendo en Railway/Render
- Asegúrate de usar HTTPS (no HTTP)

### Error en GitHub Pages: "404 Not Found"
- Verifica que el `base-href` coincida con el nombre del repositorio
- Asegúrate de haber pusheado el branch `gh-pages`

### Error: "CORS policy"
- El backend ya tiene CORS habilitado
- Verifica que la URL del frontend esté permitida

---

## 📝 URLs Finales

Una vez desplegado, tendrás:

```
Frontend: https://TU-USUARIO.github.io/invitacion-bautizo/
Backend API: https://TU-APP.up.railway.app/api

Comparte solo el link del frontend con tus invitados!
```

---

## 💖 ¡Listo!

Ahora tu invitación está online y accesible desde cualquier dispositivo. Los invitados solo necesitan el link del frontend para confirmar su asistencia.

¡Que sea un hermoso bautizo! 🎉✨
