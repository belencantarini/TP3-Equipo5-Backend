require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 5000;

// Archivos estáticos y configuración básica
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuración de sesión para el login
app.use(session({
    secret: process.env.SESSION_SECRET || 'ClaveSecreta123',
    resave: false,
    saveUninitialized: false
}));

// Dejo el usuario disponible en todas las vistas
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});

// Motor de vistas con Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Rutas de autenticación (login y logout)
app.use('/', require('./routes/authRoutes'));

// Dashboard principal (requiere login dentro del router)
app.use('/', require('./routes/dashboardRoutes'));

// =========================
//   CRUD API (Mongo)
// =========================
app.use('/api/tareasmongo', require('./routes/apiTareaMongoRoutes'));
app.use('/api/pacientes', require('./routes/apiPacienteMongoRoutes'));
app.use('/api/empleados', require('./routes/apiEmpleadoMongoRoutes'));
app.use('/api/insumos', require('./routes/apiInsumoMongoRoutes'));

// =========================
//   CRUD VISTAS (PUG + Mongo)
// =========================
app.use('/empleados', require('./routes/empleadoRoutes'));
app.use('/pacientes', require('./routes/pacienteRoutes'));
app.use('/tareas', require('./routes/tareaRoutes'));
app.use('/insumos', require('./routes/insumoRoutes'));

// Página 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.log('Error con la base de datos:', err.message);
    });
