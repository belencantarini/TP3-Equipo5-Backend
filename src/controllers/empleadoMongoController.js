const { leerData } = require('../lib/fs');
const Empleado = require('../models/empleadoMongoModel');

async function mostrarFormularioNuevo(req, res) {
  const roles = await leerData('roles');
  const areas = await leerData('areas');

  res.render('empleados/empleados_nuevo', {
    titulo: 'Nuevo empleado',
    empleado: {},
    roles,
    areas
  });
}
