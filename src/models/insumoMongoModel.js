const mongoose = require('mongoose');

const insumoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  categoria: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, trim: true },
  unidad: { type: String, required: true, trim: true },
  fechaVencimiento: { type: Date },
  estado: { type: String, required: true, enum: ['vigente', 'vencido', 'agotado'], trim: true },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Insumo', insumoSchema);