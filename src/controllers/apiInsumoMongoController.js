const Insumo = require('../models/InsumoMongo');

// Listar 
const listarInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.find();
    res.status(200).json(insumos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear
const crearInsumo = async (req, res) => {
  try {
    const insumo = new Insumo(req.body);
    const nuevoInsumo = await insumo.save();
    res.status(201).json(nuevoInsumo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buscar por ID
const obtenerInsumo = async (req, res) => {
  try {
    const insumo = await Insumo.findById(req.params.id);
    if (!insumo) return res.status(404).json({ error: 'Insumo no encontrado' });
    res.status(200).json(insumo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar
const actualizarInsumo = async (req, res) => {
  try {
    const insumo = await Insumo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!insumo) return res.status(404).json({ error: 'Insumo no encontrado' });
    res.status(200).json(insumo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar
const eliminarInsumo = async (req, res) => {
  try {
    const insumo = await Insumo.findByIdAndDelete(req.params.id);
    if (!insumo) return res.status(404).json({ error: 'Insumo no encontrado' });
    res.status(200).json({ mensaje: 'Insumo eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  listarInsumos,
  crearInsumo,
  obtenerInsumo,
  actualizarInsumo,
  eliminarInsumo
};
