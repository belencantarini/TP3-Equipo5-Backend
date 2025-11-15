const Empleado = require('../models/empleadoMongoModel');
const { leerData } = require('../lib/fs');

async function cargarDatos() {
  const roles = await leerData('roles');
  const areas = await leerData('areas');
  return { roles, areas };
}

// LISTAR
async function listarEmpleados(req, res) {
  try {
    const empleados = await Empleado.find().lean();
    res.render('empleados/empleados_listado', {
      titulo: 'Listado de empleados',
      empleados
    });
  } catch (error) {
    res.status(500).render('empleados/empleados_listado', {
      titulo: 'Listado de empleados',
      error: 'Error al obtener empleados'
    });
  }
}

// NUEVO GET
async function mostrarFormularioNuevo(req, res) {
  const datos = await cargarDatos();
  res.render('empleados/empleados_nuevo', {
    titulo: 'Nuevo empleado',
    empleado: {},
    ...datos
  });
}

// NUEVO POST
async function crearEmpleado(req, res) {
  const datos = await cargarDatos();
  try {
    const empleado = {
      ...req.body,
      activo: true        // 🔥 obligatorio para que tu tabla funcione
    };

    await Empleado.create(empleado);
    res.redirect('/empleados');
  } catch (error) {
    res.status(400).render('empleados/empleados_nuevo', {
      titulo: 'Nuevo empleado',
      error: 'Error al crear empleado',
      empleado: req.body,
      ...datos
    });
  }
}

// EDITAR GET
async function mostrarFormularioEditar(req, res) {
  try {
    const empleado = await Empleado.findById(req.params.id).lean();
    if (!empleado) return res.redirect('/empleados');

    const datos = await cargarDatos();

    res.render('empleados/empleados_editar', {
      titulo: 'Editar empleado',
      empleado,
      ...datos
    });
  } catch (error) {
    res.redirect('/empleados');
  }
}

// EDITAR POST
async function actualizarEmpleado(req, res) {
  const datos = await cargarDatos();
  try {
    await Empleado.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect('/empleados');
  } catch (error) {
    const empleado = { ...req.body, _id: req.params.id };

    res.status(400).render('empleados/empleados_editar', {
      titulo: 'Editar empleado',
      error: 'Error al actualizar empleado',
      empleado,
      ...datos
    });
  }
}

// ELIMINAR
async function eliminarEmpleado(req, res) {
  try {
    await Empleado.findByIdAndDelete(req.params.id);
    res.redirect('/empleados');
  } catch {
    res.redirect('/empleados');
  }
}

module.exports = {
  listarEmpleados,
  mostrarFormularioNuevo,
  crearEmpleado,
  mostrarFormularioEditar,
  actualizarEmpleado,
  eliminarEmpleado
};
