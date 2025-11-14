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

// Listar todos los insumos
async function listarInsumos(req, res) {
	try {
		const insumos = await leerData('insumos')
		res.json(insumos)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Obtener insumo por ID
async function obtenerInsumo(req, res) {
	try {
		const insumos = await leerData('insumos')
		const insumo = insumos.find(i => i.id === req.params.id)

		if (!insumo) {
			return res.status(404).json({ error: "Insumo no encontrado" })
		}

		res.json(insumo)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Crear nuevo insumo
async function crearInsumo(req, res) {
	try {
		const insumos = await leerData('insumos')
		const nuevoId = String(Date.now())

		const insumo = new Insumo({
			id: nuevoId,
			...req.body,
			estado: calcularEstado(req.body)
		})

		insumos.push(insumo)
		await escribirData('insumos', insumos)

		res.status(201).json(insumo)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Actualizar insumo por ID
async function actualizarInsumo(req, res) {
	try {
		const insumos = await leerData('insumos')
		const index = insumos.findIndex(i => i.id === req.params.id)

		if (index === -1) {
			return res.status(404).json({ error: "Insumo no encontrado" })
		}

		const actualizado = new Insumo({
			id: req.params.id,
			...req.body,
			estado: req.body.estado
		})

		insumos[index] = actualizado
		await escribirData('insumos', insumos)

		res.json(actualizado)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Eliminar insumo por ID
async function eliminarInsumo(req, res) {
	try {
		const insumos = await leerData('insumos')
		const filtrados = insumos.filter(i => i.id !== req.params.id)

		await escribirData('insumos', filtrados)
		res.json({ mensaje: "Insumo eliminado" })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	listarInsumos,
	obtenerInsumo,
	crearInsumo,
	actualizarInsumo,
	eliminarInsumo
}