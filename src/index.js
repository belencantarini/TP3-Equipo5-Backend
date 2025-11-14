require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

// Rutas API (JSON y MongoDB)
const apiEmpleadoRoutes = require('./routes/apiEmpleadoRoutes');
const apiPacienteRoutes = require('./routes/apiPacienteRoutes');
const apiTareaRoutes = require('./routes/apiTareaRoutes');
const apiInsumoRoutes = require('./routes/apiInsumoRoutes');
const apiPacienteMongoRoutes = require('./routes/apiPacienteMongoRoutes');
const apiEmpleadoMongoRoutes = require('./routes/apiEmpleadoMongoRoutes');
const apiInsumoMongoRoutes = require('./routes/apiInsumoMongoRoutes');
const apiTareaMongoRoutes = require('./routes/apiTareaMongoRoutes');

// Rutas Vistas (Pug y MongoDB)
const empleadoRoutes = require('./routes/empleadoRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const insumoRoutes = require('./routes/insumoRoutes');
const tareaMongoRoutes = require('./routes/tareaMongoRoutes');

// Configuración general
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, '..', 'public')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Rutas API
app.use('/api/empleados', apiEmpleadoRoutes);
app.use('/api/pacientes', apiPacienteRoutes);
app.use('/api/tareas', apiTareaRoutes);
app.use('/api/insumos', apiInsumoRoutes);
app.use('/api/pacientesmongo', apiPacienteMongoRoutes);
app.use('/api/empleadosmongo', apiEmpleadoMongoRoutes);
app.use('/api/insumosmongo', apiInsumoMongoRoutes);
app.use('/api/tareasmongo', apiTareaMongoRoutes);

// Rutas vistas
app.get('/', (req, res) => res.render('portada'));
app.use('/empleados', empleadoRoutes);
app.use('/tareas', tareaRoutes);
app.use('/pacientes', pacienteRoutes);
app.use('/insumos', insumoRoutes);
app.use('/tareasmongo', tareaMongoRoutes);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado correctamente a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Error al conectar con MongoDB:', err.message);
  });
