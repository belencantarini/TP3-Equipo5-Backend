// src/controllers/apiPacienteMongoController.js
const Paciente = require('../models/pacienteMongoModel');

async function listar(req, res) {
  const pacientes = await Paciente.find();
  res.json(pacientes);
}

async function obtenerPorId(req, res) {
  const paciente = await Paciente.findById(req.params.id);
  if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });
  res.json(paciente);
}

async function crear(req, res) {
  try {
    const nuevo = await Paciente.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear paciente', detalle: error.message });
  }
}

async function actualizar(req, res) {
  try {
    const actualizado = await Paciente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!actualizado) return res.status(404).json({ error: 'Paciente no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar paciente', detalle: error.message });
  }
}

async function eliminar(req, res) {
  const eliminado = await Paciente.findByIdAndDelete(req.params.id);
  if (!eliminado) return res.status(404).json({ error: 'Paciente no encontrado' });
  res.json({ mensaje: 'Paciente eliminado' });
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
