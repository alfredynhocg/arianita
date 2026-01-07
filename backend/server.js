const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Archivo donde se guardarán los invitados
const DATA_FILE = path.join(__dirname, 'invitados.json');

// Contraseña para acceder al panel de administración
const ADMIN_PASSWORD = 'bautizo2025'; // CAMBIA ESTA CONTRASEÑA

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Función para leer invitados del archivo
function leerInvitados() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error al leer invitados:', error);
  }
  return [];
}

// Función para guardar invitados en el archivo
function guardarInvitados(invitados) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(invitados, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error al guardar invitados:', error);
    return false;
  }
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Invitación de Bautizo funcionando correctamente',
    version: '1.0.0'
  });
});

// Obtener número de invitados confirmados (público)
app.get('/api/invitados/count', (req, res) => {
  const invitados = leerInvitados();
  res.json({ count: invitados.length });
});

// Confirmar asistencia (público)
app.post('/api/invitados/confirmar', (req, res) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ 
      success: false, 
      message: 'El nombre es requerido' 
    });
  }

  const invitados = leerInvitados();
  
  const nuevoInvitado = {
    id: Date.now(),
    nombre: nombre.trim(),
    fecha: new Date().toISOString(),
    fechaLegible: new Date().toLocaleString('es-ES', {
      timeZone: 'America/La_Paz'
    })
  };

  invitados.push(nuevoInvitado);

  if (guardarInvitados(invitados)) {
    res.json({ 
      success: true, 
      message: 'Confirmación registrada exitosamente',
      invitado: nuevoInvitado
    });
  } else {
    res.status(500).json({ 
      success: false, 
      message: 'Error al guardar la confirmación' 
    });
  }
});

// Obtener lista completa de invitados (requiere autenticación)
app.post('/api/admin/invitados', (req, res) => {
  const { password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ 
      success: false, 
      message: 'Contraseña incorrecta' 
    });
  }

  const invitados = leerInvitados();
  res.json({ 
    success: true, 
    invitados: invitados,
    total: invitados.length
  });
});

// Eliminar un invitado (requiere autenticación)
app.delete('/api/admin/invitados/:id', (req, res) => {
  const { password } = req.body;
  const id = parseInt(req.params.id);

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ 
      success: false, 
      message: 'Contraseña incorrecta' 
    });
  }

  let invitados = leerInvitados();
  const invitadosOriginales = invitados.length;
  invitados = invitados.filter(inv => inv.id !== id);

  if (invitados.length < invitadosOriginales) {
    if (guardarInvitados(invitados)) {
      res.json({ 
        success: true, 
        message: 'Invitado eliminado exitosamente' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Error al eliminar el invitado' 
      });
    }
  } else {
    res.status(404).json({ 
      success: false, 
      message: 'Invitado no encontrado' 
    });
  }
});

// Limpiar todos los invitados (requiere autenticación)
app.delete('/api/admin/invitados', (req, res) => {
  const { password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ 
      success: false, 
      message: 'Contraseña incorrecta' 
    });
  }

  if (guardarInvitados([])) {
    res.json({ 
      success: true, 
      message: 'Todos los invitados eliminados exitosamente' 
    });
  } else {
    res.status(500).json({ 
      success: false, 
      message: 'Error al limpiar la lista' 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 Archivo de datos: ${DATA_FILE}`);
  console.log(`🔑 Contraseña admin: ${ADMIN_PASSWORD}`);
  console.log('\nEndpoints disponibles:');
  console.log('  GET  / - Info del API');
  console.log('  GET  /api/invitados/count - Contador público');
  console.log('  POST /api/invitados/confirmar - Confirmar asistencia');
  console.log('  POST /api/admin/invitados - Ver lista (requiere password)');
  console.log('  DELETE /api/admin/invitados/:id - Eliminar uno (requiere password)');
  console.log('  DELETE /api/admin/invitados - Limpiar todo (requiere password)');
});
