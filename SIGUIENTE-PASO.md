# ✅ FRONTEND DEPLOYADO - Próximos Pasos

## 🎉 ¡Tu frontend YA está online!

**URL de tu invitación:**
```
https://alfredynhocg.github.io/arianita/
```

Espera 2-3 minutos y abre ese link en tu navegador.

---

## ⚠️ IMPORTANTE: Ahora necesitas deployar el BACKEND

El frontend está online pero **no funcionará completamente** hasta que despliegues el backend para guardar las confirmaciones.

---

## 🚀 PASO SIGUIENTE: Deployar Backend en Railway (GRATIS)

### Opción 1: Railway CLI (5 minutos)

```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Ir a la carpeta backend
cd backend

# 3. Login en Railway (abrirá el navegador)
railway login

# 4. Crear proyecto
railway init

# 5. Deployar
railway up

# 6. Generar dominio público
railway domain

# 7. COPIAR LA URL que te da (algo como: https://xxx.up.railway.app)
```

### Opción 2: Railway Web (5 minutos)

1. Ve a https://railway.app y crea cuenta con GitHub
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Elige el repo: `alfredynhocg/arianita`
5. En configuración del servicio:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click en "Deploy"
7. En Settings > Networking > "Generate Domain"
8. **COPIA LA URL** generada (ejemplo: https://arianita-backend.up.railway.app)

---

## 📝 DESPUÉS del deployment del backend:

### 1. Actualizar URL en el frontend

Edita: `src/app/invitados.service.ts` línea 24

**CAMBIA:**
```typescript
private apiUrl = 'http://localhost:3000/api';
```

**POR:**
```typescript
private apiUrl = 'https://TU-URL-DE-RAILWAY.up.railway.app/api';
```

**Ejemplo real:**
```typescript
private apiUrl = 'https://arianita-backend.up.railway.app/api';
```

### 2. Re-deployar el frontend

```bash
# Guardar cambios
git add .
git commit -m "Backend: URL de producción configurada"
git push

# Re-deployar
npm run deploy:gh
```

---

## 🧪 Verificar que todo funcione:

1. **Backend**: Abre `https://TU-URL.up.railway.app` en el navegador
   - Deberías ver: `{"message": "API de Invitación de Bautizo funcionando correctamente"}`

2. **Frontend**: Abre `https://alfredynhocg.github.io/arianita/`
   - Prueba confirmar una asistencia con tu nombre
   - Ve al botón "Ver Lista"
   - Ingresa la contraseña: `bautizo2025`
   - Deberías ver tu confirmación en la lista

---

## 📱 Compartir con los invitados:

Una vez que todo funcione, comparte solo este link:

```
https://alfredynhocg.github.io/arianita/
```

---

## 🔐 Acceso Administrador:

- **URL**: https://alfredynhocg.github.io/arianita/
- **Contraseña**: `bautizo2025` (cámbiala en `backend/server.js`)
- Click en "👀 Ver Lista" e ingresa la contraseña

---

## 🆘 Si tienes problemas:

### El frontend carga pero no guarda confirmaciones:
- Verifica que el backend esté corriendo en Railway
- Revisa que la URL en `invitados.service.ts` sea correcta
- Abre DevTools del navegador (F12) y busca errores en Console

### Error "CORS":
- El backend ya tiene CORS habilitado
- Asegúrate de usar la URL completa con https://

### Frontend muestra página en blanco:
- Espera 5 minutos (GitHub Pages tarda en actualizar)
- Verifica en GitHub: Settings > Pages que esté habilitado

---

## 📋 Checklist Final:

- [x] Frontend deployado en GitHub Pages ✅
- [ ] Backend deployado en Railway
- [ ] URL del backend actualizada en el frontend
- [ ] Frontend re-deployado con nueva URL
- [ ] Probado: confirmar asistencia funciona
- [ ] Probado: panel admin funciona
- [ ] Contraseña cambiada (opcional pero recomendado)

---

## 🎊 ¡Ya casi está listo!

Solo falta deployar el backend y actualizar la URL. ¡Son 5 minutos más!

---

💡 **TIP**: Guarda esta información porque la necesitarás cuando actualices la invitación.
