const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  email: { type: String },
  telefono: { type: String },
  direccion: { type: String },
  fechaNacimiento: { type: Date },
  obraSocial: { type: String },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Paciente', pacienteSchema);
