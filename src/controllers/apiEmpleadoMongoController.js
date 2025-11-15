// src/controllers/apiEmpleadoMongoController.js
const Empleado = require('../models/empleadoMongoModel');

async function listar(req, res) {
  const empleados = await Empleado.find();
  res.json(empleados);
}

async function obtenerPorId(req, res) {
  const empleado = await Empleado.findById(req.params.id);
  if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
  res.json(empleado);
}

async function crear(req, res) {
  try {
    const nuevo = await Empleado.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear empleado', detalle: error.message });
  }
}

async function actualizar(req, res) {
  try {
    const actualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!actualizado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar empleado', detalle: error.message });
  }
}

async function eliminar(req, res) {
  const eliminado = await Empleado.findByIdAndDelete(req.params.id);
  if (!eliminado) return res.status(404).json({ error: 'Empleado no encontrado' });
  res.json({ mensaje: 'Empleado eliminado' });
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };
