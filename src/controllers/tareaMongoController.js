const Tarea = require('../models/TareaMongo'); 
const Empleado = require('../models/EmpleadoMongo');
const Paciente = require('../models/pacienteMongoModel');

const { leerData } = require('../lib/fs');


// DATOS PARA FORMULARIOS Y VALIDACIONES

async function cargarDatosParaFormulario() {
    const config = await leerData("config");
    const empleados = await Empleado.find({ activo: true }).select('nombre apellido _id').lean();
    const pacientes = await Paciente.find({ activo: true }).select('nombre apellido _id').lean();
    
    const { areas, estadosValidos, prioridadesValidas, tiposValidosPorArea } = config;

    return {
        areas,
        empleados,
        pacientes,
        estados: estadosValidos,
        prioridades: prioridadesValidas,
        tiposValidosPorArea
    };
}

// CRUD DE TAREAS CON MONGODB


// FORMULARIO NUEVA TAREA (GET /tareas/nuevo)

async function formularioNuevaTarea(req, res) {
    const titulo = "Nueva tarea";
    try {
        const data = await cargarDatosParaFormulario();

        res.render('tareasmongo/nuevo', {
            titulo,
            ...data 
        });
    } catch (error) {
        return res.render('tareasmongo/nuevo', {
            titulo,
            error: "Error al cargar datos del formulario: " + error.message
        });
    }
}

async function crearTarea(req, res) {
    try {
        const nuevaTarea = new Tarea(req.body);
        await nuevaTarea.save();
        res.redirect('/tareasmongo');
    } catch (error) {
        const data = await cargarDatosParaFormulario();

        return res.render('tareasmongo/nuevo', {
            titulo: "Nueva tarea",
            error: error.message,
            tarea: req.body, 
            ...data
        });
    }
}

// LISTAR TAREAS (GET /tareas) ---
async function listarTareas(req, res) {
    try {
        const filtros = req.query;
        const data = await cargarDatosParaFormulario();
        
        const mongoFiltro = {};
        if (filtros.area) mongoFiltro.area = filtros.area;
        if (filtros.empleadoId) mongoFiltro.empleadoId = filtros.empleadoId;
        if (filtros.pacienteId) mongoFiltro.pacienteId = filtros.pacienteId;
        if (filtros.estado) mongoFiltro.estado = filtros.estado;
        if (filtros.prioridad) mongoFiltro.prioridad = filtros.prioridad;
        

        if (filtros.fecha) {
            const fechaInicio = new Date(filtros.fecha);
            const fechaFin = new Date(filtros.fecha);
            fechaFin.setDate(fechaFin.getDate() + 1); 

            mongoFiltro.fechaInicio = {
                $gte: fechaInicio,
                $lt: fechaFin
            };
        }

        const tareas = await Tarea.find(mongoFiltro)
                                  .sort({ fechaInicio: -1 })  
                                  .lean(); 

        res.render('tareasmongo/listado', {
            tareas,
            ...data,
            filtros: filtros 
        });
        
    } catch (error) {
        const data = await cargarDatosParaFormulario();
        res.status(500).render('tareasmongo/listado', {
            error: "Error al listar tareas: " + error.message,
            tareas: [],
            ...data,
            filtros: req.query
        });
    }
}

//  FORMULARIO EDITAR TAREA (GET /tareas/editar/:id) ---
async function formularioEditarTarea(req, res) {
    const titulo = "Editar tarea";
    try {
        const tarea = await Tarea.findById(req.params.id).lean();
        
        if (!tarea) {
            return res.redirect('/tareasmongo'); 
        }

 
        const data = await cargarDatosParaFormulario();

        return res.render('tareasmongo/editar', {
            titulo,
            tarea,
            ...data
        });
    } catch (error) {
        return res.render('tareasmongo/editar', {
            titulo,
            error: "Error al cargar la tarea: " + error.message
        });
    }
}

//  ACTUALIZAR TAREA (PUT /tareas/:id) ---
async function actualizarTarea(req, res) {
    const titulo = "Editar tarea";
    try {
        const { id } = req.params;

        const tareaActualizada = await Tarea.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true 
        });

        if (!tareaActualizada) {
            return res.status(404).render('tareasmongo/editar', {
                titulo,
                error: "Tarea no encontrada para actualizar.",
                tarea: req.body
            });
        }
        
        res.redirect('/tareasmongo');
    } catch (error) {
         const data = await cargarDatosParaFormulario();
        const tarea = { ...req.body, _id: req.params.id };  

        res.status(400).render('tareasmongo/editar', {
            titulo,
            error: "Error de validación al actualizar: " + error.message,
            tarea,
            ...data
        });
    }
}

//  ELIMINAR TAREA (DELETE /tareas/:id) ---
async function eliminarTarea(req, res) {
    try {
        const { id } = req.params;
        
        const tareaEliminada = await Tarea.findByIdAndDelete(id); 

        if (!tareaEliminada) {
            return res.status(404).redirect('/tareasmongo?error=Tarea+no+encontrada');
        }
        
        res.redirect('/tareasmongo');
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        return res.status(500).redirect('/tareasmongo?error=Error+interno+al+eliminar');
    }
}


module.exports = {
    formularioNuevaTarea,
    formularioEditarTarea,
    listarTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea
};