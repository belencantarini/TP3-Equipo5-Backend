const Tarea = require('../models/TareaMongo'); 

// Listar todas las tareas (GET /api/tareasmongo)
const listarTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find(req.query);
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tareas', error: error.message });
    }
};

// Obtener tarea por ID (GET /api/tareasmongo/:id)
const obtenerTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findById(req.params.id); 
        if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        res.status(200).json(tarea);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al obtener tarea', error: error.message });
    }
};

// Crear tarea (POST /api/tareasmongo)
const crearTarea = async (req, res) => {
    try {
        const nuevaTarea = new Tarea(req.body);
        await nuevaTarea.save();
        res.status(201).json({ mensaje: 'Tarea creada correctamente', tarea: nuevaTarea });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear tarea', error: error.message });
    }
};

// Actualizar tarea (PUT /api/tareasmongo/:id)
const actualizarTarea = async (req, res) => {
    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tareaActualizada) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        res.status(200).json({ mensaje: 'Tarea actualizada', tarea: tareaActualizada });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar tarea', error: error.message });
    }
};

// Eliminar tarea (DELETE /api/tareasmongo/:id)
const eliminarTarea = async (req, res) => {
    try {
        const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar tarea', error: error.message });
    }
};

module.exports = {
    listarTareas,
    obtenerTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea
};
