require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

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
//   Sesiones (LOGIN)
// =========================
app.use(session({
  secret: process.env.SESSION_SECRET || 'claveSecreta123',
  resave: false,
  saveUninitialized: false
}));

// 🔥 Pasar usuario automáticamente a TODAS las vistas
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

// =========================
//   Motor de vistas (PUG)
// =========================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// =========================
//   Rutas de LOGIN
// =========================
// /login, /logout
app.use('/', require('./routes/authRoutes'));

// =========================
//   Dashboard (Pantalla principal)
// =========================
// requiere login, lo maneja el router
app.use('/', require('./routes/dashboardRoutes'));

// =========================
//   CRUD API (Mongo)
// =========================
app.use('/api/tareasmongo', require('./routes/apiTareaMongoRoutes'));

// =========================
//   CRUD VISTAS (PUG + Mongo)
// =========================
app.use('/empleados', require('./routes/empleadoRoutes'));
app.use('/pacientes', require('./routes/pacienteRoutes'));
app.use('/tareas', require('./routes/tareaRoutes'));
app.use('/insumos', require('./routes/insumoRoutes'));

// =========================
//   Página 404 (AL FINAL)
// =========================
app.use((req, res) => {
  res.status(404).render('404');
});

// =========================
//   Conexión a MongoDB Atlas
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
