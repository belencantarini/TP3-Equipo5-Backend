function validarApiPaciente(req, res, next) {
  try {
    const { nombre, apellido, dni, email, telefono, obraSocial, nroAfiliado, fechaNacimiento } = req.body

    if (!nombre || !apellido || !dni || !email) {
      return res.status(400).json({ 
        error: "Los campos nombre, apellido, DNI y email son obligatorios." 
      })
    }

    // Validación simple del DNI (solo números)
    if (!/^\d+$/.test(dni)) {
      return res.status(400).json({ error: "El DNI debe contener solo números." })
    }

    // Validación de email básico
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ error: "El email no tiene un formato válido." })
    }

    // Teléfono opcional, pero si está que sea numérico
    if (telefono && !/^\d+$/.test(telefono)) {
      return res.status(400).json({ error: "El teléfono debe contener solo números." })
    }

    // Fecha de nacimiento opcional, pero si está que sea una fecha válida
    if (fechaNacimiento && isNaN(Date.parse(fechaNacimiento))) {
      return res.status(400).json({ error: "La fecha de nacimiento no es válida (usa formato YYYY-MM-DD)." })
    }

    next()
  } catch (err) {
    res.status(500).json({ error: "Error en la validación del paciente." })
  }
}

module.exports = { validarApiPaciente }
