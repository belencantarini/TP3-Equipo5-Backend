const mongoose = require('mongoose');

const insumoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  stock: { type: Number, required: true },
  unidad: { type: String, required: true },
  fechaVencimiento: { type: Date },
  estado: { type: String, required: true },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('InsumoMongo', insumoSchema, 'Insumos');