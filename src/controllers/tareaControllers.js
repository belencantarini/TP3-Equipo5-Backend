const Tarea = require('../models/Tarea')
const {
    leerData,
    escribirData
} = require('../lib/fs')

async function cargarDatosParaFormulario() {
    const areas = await leerData("areas")
    const empleados = await leerData("empleados")
    const pacientes = await leerData("pacientes")
    const { estadosValidos, prioridadesValidas, tiposValidosPorArea } = await leerData("config")
    return {
        areas,
        empleados,
        pacientes,
        estados: estadosValidos,
        prioridades: prioridadesValidas,
        tiposValidosPorArea
    }
}


async function formularioNuevaTarea(req, res) {
    const titulo = "Nueva tarea"
    try {
        const {areas, empleados, pacientes, estados, prioridades, tiposValidosPorArea} = await cargarDatosParaFormulario()

        res.render('tareas/nuevo', {
            areas,
            empleados,
            pacientes,
            estados,
            prioridades,
            tiposValidosPorArea
        })
    } catch (error) {
        return res.render('tareas/nuevo', {
            error: error.message
        })
    }
}

async function formularioEditarTarea(req, res) {
    const titulo = "Editar tarea"
    try {
        const tareas = await leerData("tareas")
        const tarea = tareas.find(t => t.id === req.params.id)
        if (!tarea) {
            return res.redirect('/tareas')
        }

        const {areas, empleados, pacientes, estados, prioridades, tiposValidosPorArea} = await cargarDatosParaFormulario()

        return res.render('tareas/editar', {
            tarea,
            areas,
            empleados,
            pacientes,
            estados,
            prioridades,
            tiposValidosPorArea
        })
    } catch (error) {
        return res.render('tareas/editar', {
            error: error.message,
            tarea: req.body
        })
    }
}

async function crearTarea(req, res) {
    try {
        const nuevaTarea = new Tarea(req.body)
        const tareas = await leerData("tareas")
        tareas.push(nuevaTarea)
        await escribirData("tareas", tareas)
        res.redirect('/tareas')
    } catch (error) {
        const {areas, empleados, pacientes, estados, prioridades, tiposValidosPorArea} = await cargarDatosParaFormulario()

        return res.render('tareas/nuevo', {
            titulo: "Nueva tarea",
            error: error.message,
            tarea: req.body,
            areas,
            empleados,
            pacientes,
            estados,
            prioridades,
            tiposValidosPorArea
        });
    }
}

async function listarTareas(req, res) {
    try {
        const tareas = await leerData("tareas")

        const {areas, empleados, pacientes, estados, prioridades} = await cargarDatosParaFormulario()

        const {
            area,
            empleadoId,
            pacienteId,
            estado,
            prioridad,
            fecha
        } = req.query;
        let tareasFiltradas = tareas

        if (area) {
            tareasFiltradas = tareasFiltradas.filter(tarea => tarea.area === area);
        }

        if (empleadoId) {
            tareasFiltradas = tareasFiltradas.filter(tarea => tarea.empleadoId === empleadoId);
        }

        if (pacienteId) {
            tareasFiltradas = tareasFiltradas.filter(tarea => tarea.pacienteId === pacienteId);
        }

        if (estado) {
            tareasFiltradas = tareasFiltradas.filter(tarea => tarea.estado === estado);
        }

        if (prioridad) {
            tareasFiltradas = tareasFiltradas.filter(tarea => tarea.prioridad === prioridad);
        }

        if (fecha) {
            tareasFiltradas = tareasFiltradas.filter(tarea => {
                const fechaFormateada = new Date(tarea.fechaInicio).toISOString().split('T')[0];
                return fechaFormateada === fecha;
            });
        }

        const filtros = {
            area,
            empleadoId,
            pacienteId,
            estado,
            prioridad,
            fecha
        };

        res.render('tareas/listado', {
            tareas: tareasFiltradas,
            areas,
            empleados,
            pacientes,
            estados,
            prioridades,
            filtros
        })
    } catch (error) {
        const tareas = await leerData("tareas");
        const {areas, empleados, pacientes, estados, prioridades, tiposValidosPorArea} = await cargarDatosParaFormulario()

        const filtros = req.query;

        res.render('tareas/listado', {
            error: error.message,
            tareas,
            areas,
            empleados,
            pacientes,
            estados,
            prioridades,
            filtros
        })
    }
}

async function actualizarTarea(req, res) {
    const titulo = "Editar tarea"
    try {
        const {
            id
        } = req.params
        const tareas = await leerData('tareas')
        const index = tareas.findIndex(t => t.id === id)
        if (index === -1) {
            return res.render('tareas/editar', {
                titulo,
                error: "ID tarea inexistente"
            })
        }
        tareas[index] = {
            ...tareas[index],
            ...req.body
        }
        await escribirData('tareas', tareas)
        res.redirect('/tareas')
    } catch (error) {
        const tarea = {
            ...req.body,
            id: req.params.id
        }
        const titulo = "Editar tarea"
        res.render('tareas/editar', {
            titulo,
            error: error.message,
            tarea
        })
    }
}

async function eliminarTarea(req, res) {
    const titulo = "Tareas"
    try {
        const {
            id
        } = req.params
        const tareas = await leerData("tareas")
        const tareaIndex = tareas.findIndex(t => t.id === id)
        if (tareaIndex === -1) {
            return res.render('tareas/listado', {
                titulo,
                error: "ID tarea inexistente",
                tareas
            })
        }
        tareas.splice(tareaIndex, 1)
        await escribirData("tareas", tareas)
        res.redirect('/tareas')
    } catch (error) {
        const tareas = await leerData("tareas")
        return res.render('tareas/listado', {
            titulo,
            error: error.message,
            tareas
        })
    }
}

module.exports = {
    formularioNuevaTarea,
    formularioEditarTarea,
    listarTareas,
    crearTarea,
    actualizarTarea,
    eliminarTarea
}