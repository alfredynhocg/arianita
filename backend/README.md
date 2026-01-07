# Backend - Invitación Bautizo

Backend para gestionar las confirmaciones de asistencia de forma centralizada.

## 🚀 Instalación

```bash
cd backend
npm install
```

## 💻 Ejecución

### Desarrollo (con auto-reload)
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## 🔑 Configuración

### Cambiar contraseña de administrador

Edita el archivo `server.js` y cambia esta línea:

```javascript
const ADMIN_PASSWORD = 'bautizo2025'; // CAMBIA ESTA CONTRASEÑA
```

## 📡 Endpoints

### Públicos

- `GET /api/invitados/count` - Obtener número de invitados confirmados
- `POST /api/invitados/confirmar` - Confirmar asistencia
  ```json
  {
    "nombre": "Juan Pérez"
  }
  ```

### Administración (requieren contraseña)

- `POST /api/admin/invitados` - Ver lista completa
  ```json
  {
    "password": "bautizo2025"
  }
  ```

- `DELETE /api/admin/invitados/:id` - Eliminar un invitado
  ```json
  {
    "password": "bautizo2025"
  }
  ```

- `DELETE /api/admin/invitados` - Limpiar todos
  ```json
  {
    "password": "bautizo2025"
  }
  ```

## 📁 Almacenamiento

Los datos se guardan en `invitados.json` - haz backup regular de este archivo.

## 🌐 Deployment

Para desplegar en producción, puedes usar:
- Heroku
- Railway
- Render
- DigitalOcean
- Tu propio servidor VPS

Recuerda configurar la variable de entorno `PORT` si es necesario.
