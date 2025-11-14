const { leerData } = require('../lib/fs')

function validarEmpleado(vista) {
	const url = `empleados/${vista}`
	const titulo = vista.charAt(0).toUpperCase() + vista.slice(1) + " empleado"

	return async (req, res, next) => {
		let error = ""
		
		// Leer data
		const roles = await leerData('roles')
		const areas = await leerData('areas')
		const empleados = await leerData('empleados')

		const { rol, area } = req.body

		// Generar empleado con id (de existir)
		const empleado = { ...req.body, id: req.params.id }

		// Validar DNI
		if (empleados.some((e) => e.dni === empleado.dni && e.id !== empleado.id)) {
			error = 'DNI registrado previamente'
		}

		// Validar rol
		if (!roles.includes(rol)) {
			error = `Rol inválido. Debe ser uno de: ${roles.join(', ')}`
		}

		// Validar área
		if (!areas.includes(area)) {
			error = `Área inválida. Debe ser una de: ${areas.join(', ')}`
		}

		if (error) {
			return res.render(url, { titulo, error, empleado })
		}

		next()
	}
}

module.exports = { validarEmpleado }
