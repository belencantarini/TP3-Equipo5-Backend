const {
    leerData
} = require('../lib/fs')


function validarTarea(vista) {
    const url = `tareas/${vista}`

    return async (req, res, next) => {
        try {
            const areas = await leerData('areas')
            const empleados = await leerData('empleados')
            const pacientes = await leerData('pacientes')
            const {estadosValidos, prioridadesValidas, tiposValidosPorArea} = await leerData("config")
            const {
                area,
                tipo,
                estado,
                prioridad,
                fechaFin,
                empleadoId,
                pacienteId,
                proveedor,
                observaciones
            } = req.body
            const { id } = req.params

            let tarea = {
                id,
                area,
                tipo,
                estado,
                prioridad,
                fechaFin,
                empleadoId,
                pacienteId,
                proveedor,
                observaciones
            }

            const renderError = (msg) => res.render(url, {
                error: msg,
                tarea,
                areas,
                empleados,
                pacientes,
                estados: estadosValidos,
                prioridades: prioridadesValidas,
                tiposValidosPorArea
            })

            // Validar área
            if (!areas.includes(area)) {
                return renderError(`Área inválida. Opciones: ${areas.join(", ")}`)
            }


            // Validar estado
            if (!estadosValidos.includes(estado)) {
                return renderError(`Estado inválido. Debe ser uno de: ${estadosValidos.join(", ")}`)
            }

            // Si está completada y no hay fechaFin, la genera
            if (estado === "completada" && !fechaFin) {
                const fechaActual = new Date()
                tarea.fechaFin = fechaActual.toLocaleString('es-AR')
                req.body.fechaFin = tarea.fechaFin
            }

            // Validar prioridad
            if (!prioridadesValidas.includes(prioridad)) {
                return renderError(`Prioridad inválida. Debe ser una de: ${prioridadesValidas.join(", ")}`)
            }

            // Validar paciente
            if (pacienteId) {
                const pacienteExiste = pacientes.find(p => p.id === pacienteId)
                if (!pacienteExiste) {
                    return renderError("El paciente seleccionado no existe")
                }
            }

            // Validar empleado
            if (empleadoId) {
                const empleadoExiste = empleados.find(e => e.id === empleadoId)
                if (!empleadoExiste) {
                    return renderError("El empleado seleccionado no existe")
                }

            }

            next()
        } catch (error) {
            return renderError("Error interno del servidor")
        }
    }
}
module.exports = { validarTarea }