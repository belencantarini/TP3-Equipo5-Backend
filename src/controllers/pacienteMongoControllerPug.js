const Paciente = require('../models/pacienteMongoModel');
const { leerData } = require('../lib/fs');

// cargar obras sociales desde JSON
async function cargarObrasSociales() {
  return await leerData('obras_sociales');
}

// LISTAR
async function listarPacientes(req, res) {
  const pacientes = await Paciente.find().lean();
  res.render('pacientes/pacientes_listado', {
    titulo: 'Listado de Pacientes',
    pacientes
  });
}

// NUEVO (GET)
async function mostrarFormularioNuevo(req, res) {
  const obras_sociales = await cargarObrasSociales();
  res.render('pacientes/pacientes_nuevo', {
    titulo: 'Nuevo Paciente',
    paciente: {},
    obras_sociales
  });
}

// CREAR (POST)
async function crearPaciente(req, res) {
  const obras_sociales = await cargarObrasSociales();
  try {
    await Paciente.create(req.body);
    res.redirect('/pacientes');
  } catch (error) {
    res.render('pacientes/pacientes_nuevo', {
      titulo: 'Nuevo Paciente',
      error: 'Error al crear paciente',
      paciente: req.body,
      obras_sociales
    });
  }
}

// EDITAR (GET)
async function mostrarFormularioEditar(req, res) {
  const paciente = await Paciente.findById(req.params.id).lean();
  const obras_sociales = await cargarObrasSociales();

  res.render('pacientes/pacientes_editar', {
    titulo: 'Editar Paciente',
    paciente,
    obras_sociales
  });
}

// ACTUALIZAR (POST)
async function actualizarPaciente(req, res) {
  const obras_sociales = await cargarObrasSociales();
  try {
    await Paciente.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect('/pacientes');
  } catch (error) {
    res.render('pacientes/pacientes_editar', {
      titulo: 'Editar Paciente',
      error: 'Error al actualizar paciente',
      paciente: { ...req.body, _id: req.params.id },
      obras_sociales
    });
  }
}

// ELIMINAR
async function eliminarPaciente(req, res) {
  await Paciente.findByIdAndDelete(req.params.id);
  res.redirect('/pacientes');
}

module.exports = {
  listarPacientes,
  mostrarFormularioNuevo,
  crearPaciente,
  mostrarFormularioEditar,
  actualizarPaciente,
  eliminarPaciente
};
