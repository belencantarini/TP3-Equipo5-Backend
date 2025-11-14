const Insumo = require('../models/insumoMongoModel');

//  Listar todos los insumos
exports.listarInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.find();
    res.status(200).json(insumos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener insumos', error: error.message });
  }
};

//  Obtener insumo por ID
exports.obtenerInsumoPorId = async (req, res) => {
  try {
    const insumo = await Insumo.findById(req.params.id);
    if (!insumo) return res.status(404).json({ mensaje: 'Insumo no encontrado' });
    res.status(200).json(insumo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener insumo', error: error.message });
  }
};

//  Crear insumo
exports.crearInsumo = async (req, res) => {
  try {
    const nuevoInsumo = new Insumo(req.body);
    await nuevoInsumo.save();
    res.status(201).json({ mensaje: 'Insumo creado correctamente', insumo: nuevoInsumo });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear insumo', error: error.message });
  }
};

// Actualizar insumo
exports.actualizarInsumo = async (req, res) => {
  try {
    const insumoActualizado = await Insumo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!insumoActualizado) return res.status(404).json({ mensaje: 'Insumo no encontrado' });
    res.status(200).json({ mensaje: 'Insumo actualizado', insumo: insumoActualizado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar insumo', error: error.message });
  }
};

// Eliminar insumo
exports.eliminarInsumo = async (req, res) => {
  try {
    const insumoEliminado = await Insumo.findByIdAndDelete(req.params.id);
    if (!insumoEliminado) return res.status(404).json({ mensaje: 'Insumo no encontrado' });
    res.status(200).json({ mensaje: 'Insumo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar insumo', error: error.message });
  }
};
