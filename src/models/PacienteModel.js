// src/models/PacienteModel.js
const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  dni: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{7,8}$/
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  telefono: {
    type: String,
    trim: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  obraSocial: {
    type: String,
    trim: true
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true, // agrega createdAt y updatedAt
  versionKey: false
});

const Paciente = mongoose.model('Paciente', pacienteSchema);
module.exports = Paciente;
