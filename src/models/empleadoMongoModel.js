const mongoose = require('mongoose');

// Esquema de Empleado
const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  dni: { type: String, required: true, unique: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  rol: { type: String, required: true, enum: ['Médico', 'Administrativo', 'Enfermero', 'Otro'] },
  area: { type: String, required: true, trim: true },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Empleado', empleadoSchema);

