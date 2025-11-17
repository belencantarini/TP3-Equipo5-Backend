// controllers/empleadoMongoControllerPug.js
const Empleado = require('../models/empleadoMongoModel');
const bcrypt = require('bcrypt');
const { leerData } = require('../lib/fs');

async function cargarDatos() {
  return {
    roles: await leerData('roles'),
    areas: await leerData('areas')
  };
}

/* LISTAR */
async function listarEmpleados(req, res) {
  try {
    const empleados = await Empleado.find().lean();
    res.render('empleados/empleados_listado', {
      titulo: "Listado de empleados",
      empleados,
      usuario: req.session.usuario
    });
  } catch (err) {
    res.render('empleados/empleados_listado', {
      titulo: "Listado de empleados",
      error: "Error al cargar empleados"
    });
  }
}

/* FORM NUEVO */
async function mostrarFormularioNuevo(req, res) {
  const datos = await cargarDatos();
  res.render('empleados/empleados_nuevo', {
    titulo: "Nuevo empleado",
    formData: {},       // 👈 VACÍO = formulario en blanco
    ...datos
  });
}

/* CREAR */
async function crearEmpleado(req, res) {
  const datos = await cargarDatos();
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    await Empleado.create({
      ...req.body,
      password: hashed,
      activo: true
    });

    res.redirect('/empleados');

  } catch (error) {
    res.render('empleados/empleados_nuevo', {
      titulo: "Nuevo empleado",
      error: error.message,
      formData: req.body,  // 👈 Devuelve lo que el usuario había escrito
      ...datos
    });
  }
}

/* FORM EDITAR */
async function mostrarFormularioEditar(req, res) {
  try {
    const empleado = await Empleado.findById(req.params.id).lean();
    if (!empleado) return res.redirect('/empleados');

    const datos = await cargarDatos();

    res.render('empleados/empleados_editar', {
      titulo: "Editar empleado",
      formData: empleado,
      ...datos
    });

  } catch {
    res.redirect('/empleados');
  }
}

/* ACTUALIZAR */
async function actualizarEmpleado(req, res) {
  const datos = await cargarDatos();

  try {
    let updateData = { ...req.body };

    if (req.body.password && req.body.password.trim() !== "") {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    } else {
      delete updateData.password;
    }

    await Empleado.findByIdAndUpdate(req.params.id, updateData);

    res.redirect('/empleados');

  } catch (error) {
    res.render('empleados/empleados_editar', {
      titulo: "Editar empleado",
      error: error.message,
      formData: { ...req.body, _id: req.params.id },
      ...datos
    });
  }
}

/* ELIMINAR */
async function eliminarEmpleado(req, res) {
  await Empleado.findByIdAndDelete(req.params.id);
  res.redirect('/empleados');
}

module.exports = {
  listarEmpleados,
  mostrarFormularioNuevo,
  crearEmpleado,
  mostrarFormularioEditar,
  actualizarEmpleado,
  eliminarEmpleado
};


