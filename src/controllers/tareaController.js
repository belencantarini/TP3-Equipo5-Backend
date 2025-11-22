const Tarea = require('../models/Tarea');
const Empleado = require('../models/empleadoMongoModel');
const Paciente = require('../models/pacienteMongoModel');

const {
    leerData
} = require('../lib/fs');


// DATOS PARA FORMULARIOS Y VALIDACIONES

async function cargarDatosParaFormulario() {
    const config = await leerData("config");
    const empleados = await Empleado.find({
        activo: true
    }).select('nombre apellido rol dni _id').lean();
    const pacientes = await Paciente.find({
        activo: true
    }).select('nombre apellido dni _id').lean();

    const {
        areas,
        estadosValidos,
        prioridadesValidas,
        tiposValidosPorArea
    } = config;

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

        res.render('tareas/nuevo', {
            titulo,
            ...data
        });
    } catch (error) {
        return res.render('tareas/nuevo', {
            titulo,
            error: "Error al cargar datos del formulario: " + error.message
        });
    }
}

async function crearTarea(req, res) {
    try {
        const nuevaTarea = new Tarea(req.body);
        await nuevaTarea.save();
        res.redirect('/tareas');
    } catch (error) {
        const data = await cargarDatosParaFormulario();

        return res.render('tareas/nuevo', {
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
            .populate('empleadoId', 'nombre apellido rol dni')
            .populate('pacienteId', 'nombre apellido dni')
            .sort({fechaInicio: -1})
            .lean();

        res.render('tareas/listado', {
            tareas,
            ...data,
            filtros: filtros
        });

    } catch (error) {
        const data = await cargarDatosParaFormulario();
        res.status(500).render('tareas/listado', {
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
       const tarea = await Tarea.findById(req.params.id)
       .populate('empleadoId', 'nombre apellido rol dni')
       .populate('pacienteId', 'nombre apellido dni')
       .lean();

        if (!tarea) {
            return res.redirect('/tareas');
        }


        const data = await cargarDatosParaFormulario();

        return res.render('tareas/editar', {
            titulo,
            tarea,
            ...data
        });
    } catch (error) {
        return res.render('tareas/editar', {
            titulo,
            error: "Error al cargar la tarea: " + error.message
        });
    }
}

//  ACTUALIZAR TAREA (PUT /tareas/:id) ---
async function actualizarTarea(req, res) {
    const titulo = "Editar tarea";
    try {
        const {
            id
        } = req.params;

        const tareaActualizada = await Tarea.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!tareaActualizada) {
            return res.status(404).render('tareas/editar', {
                titulo,
                error: "Tarea no encontrada para actualizar.",
                tarea: req.body
            });
        }

        res.redirect('/tareas');
    } catch (error) {
        const data = await cargarDatosParaFormulario();
        const tarea = {
            ...req.body,
            _id: req.params.id
        };

        res.status(400).render('tareas/editar', {
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
        const {
            id
        } = req.params;

        const tareaEliminada = await Tarea.findByIdAndDelete(id);

        if (!tareaEliminada) {
            return res.status(404).redirect('/tareas?error=Tarea+no+encontrada');
        }

        res.redirect('/tareas');
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        return res.status(500).redirect('/tareas?error=Error+interno+al+eliminar');
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