const { leerData } = require('../lib/fs');  
const Empleado = require('../models/EmpleadoMongo');
const Paciente = require('../models/pacienteMongoModel');


// VALIDACION API TAREA MONGO

async function validarApiTareaMongo(req, res, next) {
    try {
        const config = await leerData("config");
        const { areas, estadosValidos, prioridadesValidas, tiposValidosPorArea } = config;

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
        

        if (!areas.includes(area)) {
            return res.status(400).json({ error: `Área inválida. Opciones: ${areas.join(", ")}` });
        }
        

        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ error: `Estado inválido. Opciones: ${estadosValidos.join(", ")}` });
        }

        if (req.body.estado === "completada" && !req.body.fechaFin) {
            const fechaActual = new Date();
            req.body.fechaFin = fechaActual.toISOString(); 
        }

        if (!prioridadesValidas.includes(prioridad)) {
            return res.status(400).json({ error: `Prioridad inválida. Opciones: ${prioridadesValidas.join(", ")}` });
        }
        
        // --- VALIDACIONES DE EXISTENCIA (IDs con MongoDB) ---
        
        if (pacienteId) {
            const pacienteExiste = await Paciente.findById(pacienteId); 
            if (!pacienteExiste) {
                return res.status(400).json({ error: "El pacienteId no corresponde a ningún paciente existente" });
            }
        }

        if (empleadoId) {
            const empleadoExiste = await Empleado.findById(empleadoId);
            if (!empleadoExiste) {
                return res.status(400).json({ error: "El empleadoId no corresponde a ningún empleado existente" });
            }

        }
        
        next();
    } catch (error) {
        console.error("Error en validación de API Tarea:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}


module.exports = { validarApiTareaMongo };