const { leerData, escribirData } = require('../lib/fs');
const Paciente = require('../models/Paciente'); // Modelo basado en FS (JSON)

// 📋 Listar todos los pacientes (FS)
async function listarPacientes(req, res) {
    try {
        const pacientes = await leerData("pacientes");
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener pacientes', error: error.message });
    }
}

// 🔍 Obtener paciente por ID
async function obtenerPaciente(req, res) {
    try {
        const { id } = req.params;
        const pacientes = await leerData("pacientes");
        const paciente = pacientes.find(p => p.id === id);

        if (!paciente) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }

        res.status(200).json(paciente);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener paciente', error: error.message });
    }
}

// ➕ Crear paciente
async function crearPaciente(req, res) {
    try {
        const { nombre, apellido, dni, telefono, email, obraSocial } = req.body;

        const pacientes = await leerData("pacientes");

        // Validación DNI duplicado
        if (pacientes.some(p => p.dni === dni)) {
            return res.status(400).json({ mensaje: "DNI ya registrado" });
        }

        // Crear paciente
        const nuevoPaciente = new Paciente(
            nombre,
            apellido,
            dni,
            telefono,
            email,
            obraSocial
        );

        pacientes.push(nuevoPaciente);
        await escribirData("pacientes", pacientes);

        res.status(201).json(nuevoPaciente);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear paciente', error: error.message });
    }
}

// ✏️ Actualizar paciente
async function actualizarPaciente(req, res) {
    try {
        const { id } = req.params;
        const pacientes = await leerData("pacientes");
        const index = pacientes.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }

        const { nombre, apellido, dni, telefono, email, obraSocial } = req.body;

        pacientes[index] = {
            ...pacientes[index],
            nombre,
            apellido,
            dni,
            telefono,
            email,
            obraSocial
        };

        await escribirData("pacientes", pacientes);
        res.status(200).json(pacientes[index]);

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar paciente', error: error.message });
    }
}

// ❌ Eliminar paciente
async function eliminarPaciente(req, res) {
    try {
        const { id } = req.params;
        const pacientes = await leerData("pacientes");

        const index = pacientes.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ mensaje: "Paciente no encontrado" });
        }

        const eliminado = pacientes.splice(index, 1);
        await escribirData("pacientes", pacientes);

        res.status(200).json(eliminado);

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar paciente', error: error.message });
    }
}

module.exports = {
    listarPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
};
