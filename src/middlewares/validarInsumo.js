const { leerData } = require('../lib/fs')

function validarInsumo(vista) {
  const url = `insumos/${vista}`
  const titulo = vista.charAt(0).toUpperCase() + vista.slice(1) + " insumo"

  return async (req, res, next) => {
    let error = ""
    const { nombre, categoria, stock, unidad, fechaVencimiento, estado } = req.body
    const insumo = { ...req.body, id: req.params.id }

    const { categorias, unidades, estados } = await leerData("config")
    const insumos = await leerData("insumos")

    if (insumos.some(i => i.nombre?.trim().toLowerCase() === nombre?.trim().toLowerCase() && i.id !== insumo.id)) {
      error = `Ya existe un insumo llamado "${nombre}"`;
    }

    if (!categorias.includes(categoria)) error = "Categoría inválida"
    if (!unidades.includes(unidad)) error = "Unidad inválida"
    if (isNaN(parseInt(stock)) || parseInt(stock) < 0) error = "Stock inválido"
    if (!fechaVencimiento) error = "La fecha de vencimiento es obligatoria"

    // Solo validar estado si viene en el body
    if (estado && !estados.includes(estado)) {
      error = "Estado inválido"
    }

    
    if (error) {
  const insumoConId = { ...req.body, id: req.params.id };
  const { categorias, unidades, estados } = await leerData("config");
  return res.render(url, { titulo, error, insumo: insumoConId, categorias, unidades, estados });
}
    next()
  }
}

module.exports = { validarInsumo }