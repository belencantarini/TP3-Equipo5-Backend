const Tarea = require('../models/Tarea')
const { leerData, escribirData } = require('../lib/fs')


async function obtenerTareas(req, res) {
    try {
        const tareas = await leerData("tareas")
        const filtros = req.query
        let tareasFiltradas = tareas
        if (Object.keys(filtros).length > 0) {
            tareasFiltradas = tareas.filter(tarea => {
                let coincide = true
                for (const key in filtros) {
                    if (tarea[key] == undefined || tarea[key].toString() !== filtros[key]) {
                        coincide = false
                        break
                    }
                }
                return coincide
            })
        }
        return res.status(200).json(tareasFiltradas)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function obtenerTareaPorId(req, res) {
    try {
        const { id } = req.params
        const tareas = await leerData("tareas")
        const tarea = tareas.find(t => t.id === id)
        if (!tarea) {
            return res.status(404).json({ error: "Tarea no encontrada" })
        }
        return res.status(200).json(tarea)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function crearTarea(req, res) {
    try {
        const nuevaTarea = new Tarea(req.body)
        const tareas = await leerData("tareas")
        tareas.push(nuevaTarea)
        await escribirData("tareas", tareas)
        return res.status(201).json(nuevaTarea)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function actualizarTarea(req, res) {
    try {
        const { id } = req.params
        const tareas = await leerData("tareas")
        const tareaIndex = tareas.findIndex(t => t.id === id)
        if (tareaIndex === -1) {
            return res.status(404).json({ error: "Tarea no encontrada" })
        }
        const tareaActualizada = { ...tareas[tareaIndex], ...req.body } 
        tareas[tareaIndex] = tareaActualizada
        await escribirData("tareas", tareas)
        return res.status(200).json(tareas[tareaIndex])
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function eliminarTarea(req, res) {
    try {
        const { id } = req.params
        const tareas = await leerData("tareas")
        const tareaIndex = tareas.findIndex(t => t.id === id)
        if (tareaIndex === -1) {
            return res.status(404).json({ error: "Tarea no encontrada" })
        }
        const tareaEliminada = tareas.splice(tareaIndex, 1)
        await escribirData("tareas", tareas)
        return res.status(200).json({ message: "Tarea eliminada", tarea: tareaEliminada[0] })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { crearTarea, obtenerTareas, obtenerTareaPorId, actualizarTarea, eliminarTarea }
