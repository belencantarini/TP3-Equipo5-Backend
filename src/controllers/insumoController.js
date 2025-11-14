const Insumo = require('../models/Insumo')
const { leerData, escribirData } = require('../lib/fs')

// Calcular estado según stock y vencimiento
function calcularEstado(insumo) {
	const hoy = new Date()
	const vencido = new Date(insumo.fechaVencimiento) < hoy
	const agotado = parseInt(insumo.stock) === 0
	if (agotado) return "agotado"
	if (vencido) return "vencido"
	return "vigente"
}

async function formularioNuevoInsumo(req, res) {
	const titulo = "Nuevo insumo"
	try {
		const { categorias, unidades } = await leerData("config");

		res.render('insumos/nuevo', { titulo, insumo: {}, categorias, unidades })
	} catch (error) {
		res.render('insumos/nuevo', { titulo, error: error.message, categorias, unidades })
	}
}

async function formularioEditarInsumo(req, res) {
	const titulo = "Editar insumo"
	try {
		const insumos = await leerData('insumos')
		const { categorias, unidades, estados } = await leerData("config")
        const insumo = insumos.find(i => i.id === req.params.id)

		if (!insumo) {
			return res.render('insumos/editar', { titulo, error: "ID insumo incorrecto", categorias, unidades, estados })
		}

		res.render('insumos/editar', { titulo, insumo, categorias, unidades, estados })
	} catch (error) {
		res.render('insumos/editar', { titulo, error: error.message, insumo: req.body, categorias, unidades, estados })
	}
}

async function crearInsumo(req, res) {
	const titulo = "Nuevo insumo"
	try {
		const insumos = await leerData('insumos')
		const nuevoId = String(Date.now()) // Alternativa simple para generar ID

		const insumo = new Insumo({
			id: nuevoId,
			...req.body,
			estado: calcularEstado(req.body)
		})

		insumos.push(insumo)
		await escribirData('insumos', insumos)

		res.redirect('/insumos')
	} catch (error) {
		res.render('insumos/nuevo', { titulo, error: error.message, insumo: req.body })
	}
}

async function listarInsumos(req, res) {
	const titulo = "Insumos"
	try {
		const insumos = await leerData('insumos')
		res.render('insumos/listado', { titulo, insumos })
	} catch (error) {
		res.render('insumos/listado', { titulo, error: error.message })
	}
}

async function actualizarInsumo(req, res) {
	const titulo = "Editar insumo"
	try {
		const { id } = req.params
		const insumos = await leerData('insumos')
		const index = insumos.findIndex(i => i.id === id)

		if (index === -1) {
			return res.render('insumos/editar', { titulo, error: "ID insumo inexistente" })
		}

		const actualizado = new Insumo({
			id,
			...req.body,
			estado: req.body.estado
		})

		insumos[index] = actualizado
		await escribirData('insumos', insumos)

		res.redirect('/insumos')
	} catch (error) {
		const insumo = { ...req.body, id: req.params.id }
		res.render('insumos/editar', { titulo, error: error.message, insumo })
	}
}

async function eliminarInsumo(req, res) {
	const titulo = "Insumos"
	try {
		const { id } = req.params
		const insumos = await leerData('insumos')
		const index = insumos.findIndex(i => i.id === id)

		if (index === -1) {
			return res.render('insumos/listado', { titulo, error: "ID insumo inexistente", insumos })
		}

		insumos.splice(index, 1)
		await escribirData('insumos', insumos)

		res.redirect('/insumos')
	} catch (error) {
		const insumos = await leerData('insumos')
		res.render('insumos/listado', { titulo, error: error.message, insumos })
	}
}

module.exports = {
	formularioNuevoInsumo,
	formularioEditarInsumo,
	listarInsumos,
	crearInsumo,
	actualizarInsumo,
	eliminarInsumo,
}
