// src/middlewares/validarEmpleado.js
const { leerData } = require('../lib/fs');

function validarEmpleado(vista) {
  // empleados/empleados_nuevo  | empleados/empleados_editar
  const url = `empleados/empleados_${vista}`;
  const titulo =
    vista === 'nuevo' ? 'Nuevo empleado' : 'Editar empleado';

  return async (req, res, next) => {
    let error = '';

    // Datos auxiliares desde JSON (roles, áreas y empleados para DNI)
    const roles = await leerData('roles');
    const areas = await leerData('areas');
    const empleados = await leerData('empleados');

    const { rol, area, dni } = req.body;
    const empleado = { ...req.body, id: req.params.id };

    // DNI duplicado (solo usando el JSON)
    if (
      empleados.some(
        (e) => e.dni === dni && String(e.id) !== String(empleado.id || '')
      )
    ) {
      error = 'DNI registrado previamente';
    }

    // Validar rol
    if (!roles.includes(rol)) {
      error = `Rol inválido. Debe ser uno de: ${roles.join(', ')}`;
    }

    // Validar área
    if (!areas.includes(area)) {
      error = `Área inválida. Debe ser una de: ${areas.join(', ')}`;
    }

    if (error) {
      // Importante: enviar también roles y areas para que el PUG no falle
      return res.render(url, {
        titulo,
        error,
        empleado,
        roles,
        areas,
      });
    }

    next();
  };
}

module.exports = { validarEmpleado };



