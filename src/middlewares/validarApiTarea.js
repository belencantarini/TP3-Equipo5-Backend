const {
    leerData
} = require('../lib/fs')

async function validarApiTarea(req, res, next) {
    try {
        const areas = await leerData("areas");
        const empleados = await leerData("empleados");
        const pacientes = await leerData("pacientes");
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
        } = req.body;

        const {estadosValidos, prioridadesValidas, tiposValidosPorArea} = await leerData("config")


        if (!areas.includes(area)) {
            return res.status(400).json({
                error: `Área inválida. Opciones: ${areas.join(", ")}`
            });
        }


        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({
                error: `Estado inválido. Opciones: ${estadosValidos.join(", ")}`
            });
        }

        if (req.body.estado === "completada" && !req.body.fechaFin) {
            const fechaActual = new Date();
            req.body.fechaFin = fechaActual.toLocaleString('es-AR');
        }

        if (!prioridadesValidas.includes(prioridad)) {
            return res.status(400).json({
                error: `Prioridad inválida. Opciones: ${prioridadesValidas.join(", ")}`
            });
        }

        if (pacienteId) {
            const pacienteExiste = pacientes.find(p => p.id === pacienteId);
            if (!pacienteExiste) {
                return res.status(400).json({
                    error: "El pacienteId no corresponde a ningún paciente existente"
                });
            }
        }

        if (empleadoId) {
            const empleadoExiste = empleados.find(e => e.id === empleadoId);
            if (!empleadoExiste) {
                return res.status(400).json({
                    error: "El empleadoId no corresponde a ningún empleado existente"
                });
            }

            /*
            if (empleadoExiste.area !== area) {
                return res.status(400).json({
                    error: "El área del empleado no coincide con el área de la tarea"
                });
            }
            */
        }

        next();
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
}

module.exports = { validarApiTarea };