const {
    leerData
} = require('../lib/fs');
const Empleado = require('../models/empleadoMongoModel');
const Paciente = require('../models/pacienteMongoModel');

// VALIDACION VISTA TAREA MONGO
function validarTarea(vista) {
    const url = `tareas/${vista}`;

    return async (req, res, next) => {
        try {
            const config = await leerData("config");
            const {
                areas,
                estadosValidos,
                prioridadesValidas,
                tiposValidosPorArea
            } = config;

            const empleados = await Empleado.find({
                activo: true
            });
            const pacientes = await Paciente.find({
                activo: true
            });

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
            const {
                id
            } = req.params;

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
            };

            const renderError = (msg) => res.render(url, {
                error: msg,
                tarea,
                areas,
                empleados,
                pacientes,
                estados: estadosValidos,
                prioridades: prioridadesValidas,
                tiposValidosPorArea
            });

            if (!areas.includes(area)) {
                return renderError(`Área inválida. Opciones: ${areas.join(", ")}`);
            }

            if (!estadosValidos.includes(estado)) {
                return renderError(`Estado inválido. Debe ser uno de: ${estadosValidos.join(", ")}`);
            }

            if (estado === "completada" && !fechaFin) {
                const fechaActual = new Date();
                tarea.fechaFin = fechaActual.toISOString();
                req.body.fechaFin = tarea.fechaFin;
            }

            if (!prioridadesValidas.includes(prioridad)) {
                return renderError(`Prioridad inválida. Debe ser una de: ${prioridadesValidas.join(", ")}`);
            }

            if (pacienteId && pacienteId.trim().length > 0) {
                const pacienteExiste = await Paciente.findById(pacienteId);
                if (!pacienteExiste) {
                    return renderError("El paciente seleccionado no existe o el ID es inválido.");
                }
            } else {
                req.body.pacienteId = null;
            }

            if (empleadoId && empleadoId.trim().length > 0) {
                const empleadoExiste = await Empleado.findById(empleadoId);
                if (!empleadoExiste) {
                    return renderError("El empleado seleccionado no existe o el ID es inválido.");
                }
            } else {
                req.body.empleadoId = null;
            }
        

        next();
    } catch (error) {
        console.error("Error en validación de Vista Tarea:", error);
        const config = await leerData("config");

        return res.status(500).render('tareas/listado', {
            error: "Error interno del servidor al validar. " + error.message,
            areas: config.areas || []
        });
    }
};
}

module.exports = validarTarea;