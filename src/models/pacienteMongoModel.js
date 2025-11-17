const mongoose = require('mongoose');

const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;

const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, match: soloLetras },
  apellido: { type: String, required: true, match: soloLetras },
  dni: { type: String, required: true, unique: true, match: /^\d{7,8}$/ },
  email: { type: String },
  telefono: { type: String, match: /^\d+$/ },
  direccion: { type: String },
  fechaNacimiento: { type: Date },
  obraSocial: { type: String },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Paciente', pacienteSchema);
