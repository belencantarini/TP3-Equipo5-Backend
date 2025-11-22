const { leerData } = require('../lib/fs');

function validarEmpleado(vista) {
  const url = `empleados/empleados_${vista}`;
  const titulo = vista === 'nuevo' ? 'Nuevo empleado' : 'Editar empleado';

  return async (req, res, next) => {
    let error = "";

    // Cargar listas desde JSON (roles y áreas)
    const roles = await leerData('roles');
    const areas = await leerData('areas');

    // Solo leer empleados.json si estás editando
    const empleados = vista === "editar" ? await leerData('empleados') : [];

    const {
      nombre,
      apellido,
      dni,
      telefono,
      email,
      rol,
      area
    } = req.body;

    const formData = req.body;

    /*
        VALIDACIONES BÁSICAS
       */

    // NOMBRE
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(nombre)) {
      error = "El nombre solo puede contener letras.";
    }

    // APELLIDO
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(apellido)) {
      error = "El apellido solo puede contener letras.";
    }

    // DNI
    else if (!/^\d{7,8}$/.test(String(dni))) {
      error = "El DNI debe tener 7 u 8 dígitos numéricos.";
    }

    // TELÉFONO (si se ingresó)
    else if (telefono && !/^\d+$/.test(String(telefono))) {
      error = "El teléfono solo puede contener números.";
    }

    // EMAIL
    else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      error = "El email ingresado no es válido.";
    }

    // ROL válido
    else if (!roles.includes(rol)) {
      error = `Rol inválido. Debe ser uno de: ${roles.join(', ')}`;
    }

    // ÁREA válida
    else if (!areas.includes(area)) {
      error = `Área inválida. Debe ser una de: ${areas.join(', ')}`;
    }

    /*
        VALIDACIÓN ÁREA ↔ ROL
        */

    const reglas = {
      "Administración de Turnos": ["administrador", "recepcionista"],
      "Atención Médica": ["administrador", "médico"],
      "Stock de Insumos": ["administrador", "encargado de stock"],
      "Facturación": ["administrador"]
    };

    if (!reglas[area].includes(rol)) {
      error = `El rol "${rol}" no está permitido para el área "${area}".`;
    }

    /* 
        DNI DUPLICADO (solo editar)
      */

    if (!error && vista === "editar") {
      const repetido = empleados.some(
        e => e.dni === dni && String(e.id) !== String(req.params.id)
      );
      if (repetido) error = "DNI registrado previamente.";
    }

    /* 
        SI HAY ERROR → VOLVER A FORM
       */
    if (error) {
      return res.render(url, {
        titulo,
        error,
        formData,
        roles,
        areas,
        usuario: req.session.usuario
      });
    }

    next();
  };
}

module.exports = { validarEmpleado };








