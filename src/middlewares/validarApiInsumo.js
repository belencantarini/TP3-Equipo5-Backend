const { leerData } = require('../lib/fs')

async function validarApiInsumo(req, res, next) {
  try {
    const { nombre, categoria, stock, unidad, fechaVencimiento, estado } = req.body
    const { categorias, unidades, estados } = await leerData("config")

    // Validación de campos obligatorios (sin estado)
    if (!nombre || !categoria || !unidad || !fechaVencimiento) {
      return res.status(400).json({ error: "Faltan campos obligatorios" })
    }

    if (isNaN(parseInt(stock)) || parseInt(stock) < 0) {
      return res.status(400).json({ error: "Stock inválido" })
    }

    if (new Date(fechaVencimiento) < new Date()) {
      return res.status(400).json({ error: "La fecha de vencimiento no puede ser anterior a hoy" })
    }

    if (!categorias.includes(categoria)) {
      return res.status(400).json({ error: `Categoría inválida. Opciones: ${categorias.join(', ')}` })
    }

    if (!unidades.includes(unidad)) {
      return res.status(400).json({ error: `Unidad inválida. Opciones: ${unidades.join(', ')}` })
    }

    // Validar estado solo si viene en el body
    if (estado && !estados.includes(estado)) {
      return res.status(400).json({ error: `Estado inválido. Opciones: ${estados.join(', ')}` })
    }

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { validarApiInsumo }