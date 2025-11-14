const Empleado = require('../models/EmpleadoMongo');

// ✅ Listar todos
const listarEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Crear
const crearEmpleado = async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    const nuevoEmpleado = await empleado.save();
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Buscar por ID
const obtenerEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(200).json(empleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Actualizar
const actualizarEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(200).json(empleado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Eliminar
const eliminarEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(200).json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  listarEmpleados,
  crearEmpleado,
  obtenerEmpleado,
  actualizarEmpleado,
  eliminarEmpleado
};
