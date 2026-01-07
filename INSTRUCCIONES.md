# 🎉 Invitación Bautizo - Arianita
### Sistema Completo con Backend Centralizado

## 📋 Descripción

Sistema de invitación web con backend centralizado para guardar confirmaciones de asistencia de todos los invitados en un solo lugar.

---

## 🚀 Instalación y Configuración

### 1. **Backend (Servidor API)**

```bash
cd backend
npm install
```

#### **Configurar Contraseña Admin**

Edita `backend/server.js` línea 11:

```javascript
const ADMIN_PASSWORD = 'bautizo2025'; // ⚠️ CAMBIA ESTA CONTRASEÑA
```

#### **Ejecutar el Backend**

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

El servidor estará en: `http://localhost:3000`

---

### 2. **Frontend (Aplicación Angular)**

```bash
cd ..  # Volver a la raíz del proyecto
npm install
```

#### **Configurar URL del Backend**

Edita `src/app/invitados.service.ts` línea 24:

```typescript
private apiUrl = 'http://localhost:3000/api';
// Cuando despliegues, cambia a tu URL de producción:
// private apiUrl = 'https://tu-servidor.com/api';
```

#### **Ejecutar el Frontend**

```bash
npm start
```

La aplicación estará en: `http://localhost:4200`

---

## 🎯 Uso

### **Para los Invitados:**

1. Abren el enlace de la invitación
2. Hacen clic en "Confirmar Asistencia"
3. Escriben su nombre y confirman
4. ¡Listo! Su confirmación se guarda en el servidor

### **Para el Administrador (tú):**

1. En la invitación, haz clic en "👀 Ver Lista"
2. Ingresa la contraseña de administrador
3. Verás la lista completa de confirmados
4. Puedes:
   - ✅ Ver todos los invitados con fecha/hora
   - 📥 Descargar la lista en archivo .txt
   - 🔄 Actualizar para ver nuevos confirmados
   - ❌ Eliminar invitados individuales
   - 🗑️ Limpiar toda la lista

---

## 📡 API Endpoints

### Públicos:
- `GET /api/invitados/count` - Contador de invitados
- `POST /api/invitados/confirmar` - Confirmar asistencia

### Admin (requieren contraseña):
- `POST /api/admin/invitados` - Ver lista completa
- `DELETE /api/admin/invitados/:id` - Eliminar uno
- `DELETE /api/admin/invitados` - Limpiar todos

---

## 🌐 Desplegar en Producción

### **Backend:**

Opciones recomendadas (GRATIS):

1. **Railway.app** (Recomendado)
   ```bash
   # Instala Railway CLI
   npm install -g railway
   
   # En la carpeta backend
   cd backend
   railway login
   railway init
   railway up
   ```

2. **Render.com**
   - Crea cuenta en render.com
   - New > Web Service
   - Conecta tu repositorio
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Heroku**
   ```bash
   heroku create mi-bautizo-api
   git subtree push --prefix backend heroku main
   ```

### **Frontend:**

Opciones recomendadas (GRATIS):

1. **Vercel** (Recomendado)
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Netlify**
   ```bash
   npm run build
   # Sube la carpeta dist/ a netlify.com
   ```

3. **GitHub Pages**
   ```bash
   npm install -g angular-cli-ghpages
   ng build --prod --base-href /invitacion/
   npx angular-cli-ghpages --dir=dist/invitacion-bautizo
   ```

**⚠️ IMPORTANTE:** Después de desplegar el backend, actualiza la URL en `invitados.service.ts`

---

## 🔐 Seguridad

- ✅ Contraseña protege panel de administración
- ✅ Solo tú puedes ver/editar la lista completa
- ✅ Los invitados solo pueden confirmar su asistencia
- ✅ Datos guardados en archivo JSON en el servidor

### Recomendaciones:

1. **Cambia la contraseña** en `backend/server.js`
2. **Haz backup** del archivo `backend/invitados.json` regularmente
3. **Usa HTTPS** en producción (automático en Railway/Render/Vercel)

---

## 📁 Estructura del Proyecto

```
invitacion/
├── backend/                    # Servidor API
│   ├── server.js              # Servidor Express
│   ├── invitados.json         # Base de datos (backup esto!)
│   ├── package.json
│   └── README.md
│
├── src/                       # Frontend Angular
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── invitados.service.ts  # Servicio API
│   ├── index.html
│   └── styles.css
│
└── README.md                  # Este archivo
```

---

## 💡 Características

### ✨ Frontend:
- Diseño elegante y responsivo
- Animaciones suaves
- Corazones flotantes
- Formulario de confirmación
- Panel de administración con contraseña
- Compatible con móviles/tablets

### 🔧 Backend:
- API REST con Express
- Almacenamiento en archivo JSON
- Autenticación simple
- CORS habilitado
- Fácil de desplegar

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to backend"
- Verifica que el backend esté corriendo en `http://localhost:3000`
- Revisa la URL en `invitados.service.ts`

### Error: "CORS policy"
- El backend ya tiene CORS habilitado
- Si persiste, verifica que ambos servidores estén corriendo

### La lista no se actualiza
- Haz clic en el botón "🔄 Actualizar"
- Verifica que el backend esté guardando en `invitados.json`

### Contraseña incorrecta
- Verifica la contraseña en `backend/server.js`
- Por defecto es: `bautizo2025`

---

## 📞 Datos del Evento

Para personalizar los datos del bautizo, edita `src/app/app.component.ts`:

```typescript
nombreNina = 'Arianita';
nombreMadre = 'María Elena Choque Núñez';
fechaBautizo = '27 de septiembre de 2025';
```

---

## 🎊 Tecnologías Utilizadas

- **Frontend:** Angular 17, TypeScript, CSS3
- **Backend:** Node.js, Express
- **Storage:** JSON File
- **HTTP Client:** Angular HttpClient

---

## 📝 Notas Importantes

1. **Backup Regular:** Descarga o copia `backend/invitados.json` regularmente
2. **Contraseña Segura:** Usa una contraseña fuerte para producción
3. **HTTPS:** Usa HTTPS en producción para mayor seguridad
4. **Compartir:** Envía el link del frontend a tus invitados

---

## 💖 ¡Listo para Celebrar!

Ahora tienes un sistema completo para gestionar las confirmaciones del bautizo de Arianita. Todos los invitados confirmarán desde sus dispositivos y tú verás la lista centralizada.

¡Que sea un hermoso evento! 🎉✨
