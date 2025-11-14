const { leerData } = require('../lib/fs');  
const Empleado = require('../models/EmpleadoMongo');
const Paciente = require('../models/pacienteMongoModel');



// VALIDACION VISTA TAREA MONGO

function validarTareaMongo(vista) {
    const url = `tareasmongo/${vista}`;

    return async (req, res, next) => {
        try {
            const config = await leerData("config");
            const { areas, estadosValidos, prioridadesValidas, tiposValidosPorArea } = config;

            const empleados = await Empleado.find({ activo: true });
            const pacientes = await Paciente.find({ activo: true });
            
            const {
                area, tipo, estado, prioridad, fechaFin, empleadoId, pacienteId, proveedor, observaciones
            } = req.body;
            const { id } = req.params;

            
            let tarea = { id, area, tipo, estado, prioridad, fechaFin, empleadoId, pacienteId, proveedor, observaciones };

            const renderError = (msg) => res.render(url, {
                error: msg,
                tarea,
                areas: areas, // Usamos la lista de áreas del JSON
                empleados: empleados, // Lista de empleados de MONGO
                pacientes: pacientes, // Lista de pacientes de MONGO
                estados: estadosValidos,
                prioridades: prioridadesValidas,
                tiposValidosPorArea
            });

           
            // Validar área
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
            
            // --- Las validaciones de ID deben USAR MONGOOSE (findById) ---
            if (pacienteId) {
                const pacienteExiste = await Paciente.findById(pacienteId); 
                if (!pacienteExiste) {
                    return renderError("El paciente seleccionado no existe");
                }
            }


            if (empleadoId) {
                const empleadoExiste = await Empleado.findById(empleadoId); 
                if (!empleadoExiste) {
                    return renderError("El empleado seleccionado no existe");
                }
            }

            next();
        } catch (error) {
            console.error("Error en validación de Vista Tarea:", error);
            // Aseguramos que la vista de error tenga al menos los datos base de config si el fallo es crítico
            const config = await leerData("config");
            return res.status(500).render('tareasmongo/listado', { 
                error: "Error interno del servidor al validar. " + error.message,
                areas: config.areas || [] 
            });
        }
    }
}


module.exports = validarTareaMongo;