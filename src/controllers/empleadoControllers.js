const Empleado = require('../models/Empleado')
const { leerData, escribirData } = require('../lib/fs')

function formularioNuevoEmpleado(req, res) {
	const titulo = "Nuevo empleado"

    try {
        res.render('empleados/nuevo', { titulo })
    } catch (error) {
        return res.render('empleados/nuevo', { titulo, error: error.message })
    }
}

async function formularioEditarEmpleado(req, res) {
	const titulo = "Editar empleado"

    try {
        // Data
        const empleados = await leerData('empleados')
        const empleado = empleados.find((e) => e.id === req.params.id)

		// Comprobar empleado
        if (!empleado) {
            return res.render('empleados/editar', { titulo, error: "ID empleado incorrecto" })
        }

        res.render('empleados/editar', { titulo, empleado })
    } catch (error) {
        return res.render('empleados/editar', { titulo, error: error.message, empleado: req.body })
    }
}

async function crearEmpleado(req, res) {
	try {
		const { nombre, apellido, dni, email, rol, area } = req.body

		// Data
		const empleado = new Empleado(nombre, apellido, dni, email, rol, area)
		const empleados = await leerData('empleados')

		// Guardar
		empleados.push(empleado)
		await escribirData('empleados', empleados)

		res.redirect('/empleados')
	} catch (error) {
		const titulo = "Nuevo empleado"
        return res.render('empleados/nuevo', { titulo, error: error.message, empleado: req.body })
	}
}

async function listarEmpleados(req, res) {
	const titulo = "Empleados"

	try {
        // Data
		const empleados = await leerData('empleados')

		res.render('empleados/listado', { titulo, empleados })
	} catch (error) {
		return res.render('empleados/listado', { titulo, error: error.message })
	}
}

async function actualizarEmpleado(req, res) {
	const titulo = "Editar empleado"

	try {
        const { id } = req.params

		// Data
		const empleados = await leerData('empleados')
		const index = empleados.findIndex((e) => e.id === id)

		// Comprobar empleado
		if (index === -1) {
			return res.render('empleados/editar', { titulo, error: "ID empleado inexistente" })
		}

		// Guardar
		empleados[index] = {...empleados[index], ...req.body}
		await escribirData('empleados', empleados)

		res.redirect('/empleados')
	} catch (error) {
		const empleado = {...req.body, id: req.params.id }
		return res.render('empleados/editar', { titulo, error: error.message, empleado })
	}
}

async function eliminarEmpleado(req, res) {
	const titulo = "Empleados"

	try {
		const { id } = req.params

		// Data
		const empleados = await leerData('empleados')
		const index = empleados.findIndex((e) => e.id === id)

		// Comprobar empleado
		if (index === -1) {
			return res.render('empleados/listado', { titulo, error: "ID empleado inexistente", empleados })
		}

		// Guardar
		empleados.splice(index, 1)
		await escribirData('empleados', empleados)

		res.redirect('/empleados')
	} catch (error) {
        const empleados = await leerData('empleados')
		return res.render('empleados/listado', { titulo, error: error.message, empleados })
	}
}

module.exports = {
	formularioNuevoEmpleado,
	formularioEditarEmpleado,
	listarEmpleados,
	crearEmpleado,
	actualizarEmpleado,
	eliminarEmpleado,
}
