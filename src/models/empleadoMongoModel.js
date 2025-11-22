const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  direccion: { type: String },
  rol: { type: String, required: true },
  area: { type: String, required: true },
  password: { type: String, required: true },   // NECESARIO PARA LOGIN
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Empleado', empleadoSchema);

