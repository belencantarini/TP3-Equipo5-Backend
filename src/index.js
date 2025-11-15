require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 5000;

// =========================
//   Middlewares globales
// =========================
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// =========================
//   Motor de vistas (PUG)
// =========================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// =========================
//   Rutas API (JSON) — (FS)
// =========================
app.use('/api/empleados', require('./routes/apiEmpleadoRoutes'));
app.use('/api/pacientes', require('./routes/apiPacienteRoutes'));
app.use('/api/tareas', require('./routes/apiTareaRoutes'));
app.use('/api/insumos', require('./routes/apiInsumoRoutes'));

// =========================
//   Rutas API (Mongo)
// =========================
app.use('/api/empleadosmongo', require('./routes/apiEmpleadoMongoRoutes'));
app.use('/api/pacientesmongo', require('./routes/apiPacienteMongoRoutes'));
app.use('/api/insumosmongo', require('./routes/apiInsumoMongoRoutes'));
app.use('/api/tareasmongo', require('./routes/apiTareaMongoRoutes'));

// =========================
//   Rutas Vistas (PUG)
// =========================
app.get('/', (req, res) => {
  res.render('portada');
});

// Vistas CRUD
app.use('/empleados', require('./routes/empleadoRoutes'));
app.use('/pacientes', require('./routes/pacienteRoutes'));
app.use('/tareas', require('./routes/tareaRoutes'));
app.use('/insumos', require('./routes/insumoRoutes'));
app.use('/tareasmongo', require('./routes/tareaMongoRoutes'));

// =========================
//   Página 404 (AL FINAL)
// =========================
app.use((req, res) => {
  res.status(404).render('404');
});

// =========================
//   Conexión a Mongo
// =========================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    app.listen(PORT, () =>
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ Error al conectar con MongoDB:', err.message);
  });
