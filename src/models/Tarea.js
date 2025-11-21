const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    area: {type: String, required: true, trim: true},
    tipo: {type: String, trim: true, default: null},
    estado: {type: String, required: true, trim: true},
    prioridad: {type: String, required: true, trim: true},
    fechaInicio: {type: Date, default: Date.now},
    fechaFin: {type: Date, default: null},
    empleadoId: { type: String, default: null },
    pacienteId: { type: String, default: null },
    proveedor: { type: String, default: null },
    observaciones: { type: String, default: null },
    activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Tarea', tareaSchema);