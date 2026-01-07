# 🚀 GUÍA RÁPIDA DE DEPLOY

## ⚡ Deploy en 3 Pasos

### PASO 1: Desplegar Backend en Railway (5 minutos)

#### Opción A: Con Railway CLI (Más Rápido)

```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login en Railway
cd backend
railway login

# 3. Crear proyecto y deployar
railway init
railway up

# 4. Copiar la URL que te da Railway
# Será algo como: https://invitacion-backend-production.up.railway.app
```

#### Opción B: Desde la Web de Railway

1. Ve a [railway.app](https://railway.app) y crea cuenta (usa GitHub)
2. Click en "New Project"
3. Selecciona "Empty Project"
4. Click en "Add Service" > "GitHub Repo"
5. Conecta este repositorio
6. En Settings > Service:
   - Root Directory: `backend`
   - Start Command: `npm start`
7. En Settings > Networking > Generate Domain
8. ¡Copia la URL generada!

---

### PASO 2: Actualizar Frontend con URL del Backend

Edita: `src/app/invitados.service.ts`

```typescript
// Línea 24 - Cambia localhost por tu URL de Railway:
private apiUrl = 'https://TU-URL-DE-RAILWAY.up.railway.app/api';
```

**Ejemplo:**
```typescript
private apiUrl = 'https://invitacion-backend-production.up.railway.app/api';
```

---

### PASO 3: Desplegar Frontend en GitHub Pages

```bash
# 1. Crear repositorio en GitHub
# Ve a github.com y crea un repo llamado: invitacion-bautizo

# 2. Conectar repositorio local
git add .
git commit -m "Deploy: Invitación Bautizo"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/invitacion-bautizo.git
git push -u origin main

# 3. Instalar angular-cli-ghpages
npm install -g angular-cli-ghpages

# 4. Desplegar (usa el script)
npm run deploy:gh

# O manualmente:
ng build --configuration production --base-href /invitacion-bautizo/
npx angular-cli-ghpages --dir=dist/invitacion-bautizo
```

---

## 🎯 URLs Finales

Después del deploy tendrás:

```
🌐 Frontend (comparte este link):
https://TU-USUARIO.github.io/invitacion-bautizo/

🔧 Backend API:
https://TU-APP.up.railway.app/api

🔐 Panel Admin:
En el frontend, click en "Ver Lista" y usa la contraseña: bautizo2025
```

---

## ✅ Verificación

Prueba que todo funcione:

1. **Backend**: Abre `https://TU-APP.up.railway.app/` en el navegador
   - Deberías ver: `{"message": "API de Invitación de Bautizo funcionando correctamente"}`

2. **Frontend**: Abre `https://TU-USUARIO.github.io/invitacion-bautizo/`
   - Prueba confirmar una asistencia
   - Verifica el panel admin con la contraseña

---

## 🔄 Actualizar después

Cuando hagas cambios:

```bash
# Backend
cd backend
railway up

# Frontend  
git add .
git commit -m "Actualización"
git push
npm run deploy:gh
```

---

## 💡 Tips

1. **Cambia la contraseña** en `backend/server.js` antes de deployar
2. **Guarda el backup** de `backend/invitados.json` regularmente
3. **Usa HTTPS** - Railway y GitHub Pages lo incluyen automáticamente
4. **Dominio personalizado**: Puedes agregar uno en Railway y GitHub Pages

---

## 🆘 Ayuda Rápida

**Backend no responde:**
- Revisa los logs en Railway Dashboard
- Verifica que el archivo `invitados.json` tenga permisos

**Frontend no carga datos:**
- Verifica la URL del backend en `invitados.service.ts`
- Abre DevTools del navegador para ver errores

**Error 404 en GitHub Pages:**
- Espera 5-10 minutos después del deploy
- Verifica que el branch `gh-pages` exista en GitHub

---

## 📞 Comandos Útiles

```bash
# Ver logs del backend en Railway
cd backend
railway logs

# Re-deploy del frontend
npm run deploy:gh

# Ver el sitio localmente antes de deployar
npm start  # Frontend en localhost:4200
cd backend && npm start  # Backend en localhost:3000
```

---

¡Listo! Tu invitación estará online en menos de 10 minutos 🎉
