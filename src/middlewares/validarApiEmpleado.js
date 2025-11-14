const { leerData } = require('../lib/fs')

async function validarApiEmpleado(req, res, next) {
  try {
    const roles = await leerData("roles")
    const areas = await leerData("areas")

    const { rol, area } = req.body

    if (!roles.includes(rol)) {
      return res.status(400).json({ error: `Rol inválido. Opciones: ${roles.join(', ')}` })
    }

    if (!areas.includes(area)) {
      return res.status(400).json({ error: `Área inválida. Opciones: ${areas.join(', ')}` })
    }

    next()
  } catch (err) {
    res.status(500).json({ error: 'Error validando roles/áreas' })
  }
}

module.exports = { validarApiEmpleado }
