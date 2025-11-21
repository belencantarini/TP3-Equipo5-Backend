const Insumo = require('../models/InsumoMongo');
const { leerData } = require('../lib/fs'); // solo lo dejamos para leer config

// Calcular estado según stock y vencimiento
function calcularEstado(insumo) {
  const hoy = new Date();
  const vencido = new Date(insumo.fechaVencimiento) < hoy;
  const agotado = parseInt(insumo.stock) === 0;
  if (agotado) return "agotado";
  if (vencido) return "vencido";
  return "vigente";
}

// Formulario nuevo insumo
async function formularioNuevoInsumo(req, res) {
  const titulo = "Nuevo insumo";
  try {
    const { categorias, unidades } = await leerData("config");
    res.render('insumos/nuevo', { titulo, insumo: {}, categorias, unidades });
  } catch (error) {
    res.render('insumos/nuevo', { titulo, error: error.message, categorias: [], unidades: [] });
  }
}

// Formulario editar insumo
async function formularioEditarInsumo(req, res) {
  const titulo = "Editar insumo";
  try {
    const insumo = await Insumo.findById(req.params.id);
    const { categorias, unidades, estados } = await leerData("config");

    if (!insumo) {
      return res.render('insumos/editar', { titulo, error: "ID insumo incorrecto", categorias, unidades, estados });
    }

    res.render('insumos/editar', { titulo, insumo, categorias, unidades, estados });
  } catch (error) {
    res.render('insumos/editar', { titulo, error: error.message, insumo: req.body });
  }
}

// Crear insumo
async function crearInsumo(req, res) {
  const titulo = "Nuevo insumo";
  try {
    req.body.fechaVencimiento = new Date(req.body.fechaVencimiento);
    const insumo = new Insumo({
      ...req.body,
      estado: calcularEstado(req.body)
    });
    await insumo.save();
    res.redirect('/insumos');
  } catch (error) {
    res.render('insumos/nuevo', { titulo, error: error.message, insumo: req.body });
  }
}

// Listar insumos
async function listarInsumos(req, res) {
  const titulo = "Insumos";
  try {
    const insumos = await Insumo.find();
    res.render('insumos/listado', { titulo, insumos });
  } catch (error) {
    res.render('insumos/listado', { titulo, error: error.message });
  }
}

// Actualizar insumo
async function actualizarInsumo(req, res) {
  const titulo = "Editar insumo";
  try {
    req.body.fechaVencimiento = new Date(req.body.fechaVencimiento);
    const insumoActualizado = await Insumo.findByIdAndUpdate(
      req.params.id,
      { ...req.body, estado: calcularEstado(req.body) },
      { new: true }
    );

    if (!insumoActualizado) {
      return res.render('insumos/editar', { titulo, error: "ID insumo inexistente" });
    }

    res.redirect('/insumos');
  } catch (error) {
    res.render('insumos/editar', { titulo, error: error.message, insumo: req.body });
  }
}

// Eliminar insumo
async function eliminarInsumo(req, res) {
  const titulo = "Insumos";
  try {
    const insumoEliminado = await Insumo.findByIdAndDelete(req.params.id);
    if (!insumoEliminado) {
      return res.render('insumos/listado', { titulo, error: "ID insumo inexistente" });
    }
    res.redirect('/insumos');
  } catch (error) {
    res.render('insumos/listado', { titulo, error: error.message });
  }
}

module.exports = {
  formularioNuevoInsumo,
  formularioEditarInsumo,
  listarInsumos,
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo,
};
