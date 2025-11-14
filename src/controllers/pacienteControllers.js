const Paciente = require('../models/Paciente');
const { leerData, escribirData } = require('../lib/fs');

async function crearPaciente(req, res) {
    try {
        const { nombre, apellido, dni, email, telefono, obraSocial, nroAfiliado, fechaNacimiento } = req.body;

        // Data
        const pacientes = await leerData("pacientes");
        const paciente = new Paciente(nombre, apellido, dni, email, telefono, obraSocial, nroAfiliado, fechaNacimiento);

        // Validar DNI único
        if (pacientes.some(p => p.dni === paciente.dni)) {
            return res.status(400).json({ error: "DNI registrado previamente" });
        }

        // Guardar
        pacientes.push(paciente);
        await escribirData("pacientes", pacientes);

        return res.status(201).json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function listarPacientes(req, res) {
    try {
        const pacientes = await leerData("pacientes");
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerPaciente(req, res) {
    try {
        const { id } = req.params;
        const pacientes = await leerData("pacientes");
        const paciente = pacientes.find(p => p.id === id);

        if (!paciente) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }

        res.json(paciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function actualizarPaciente(req, res) {
    try {
        const { id } = req.params;
        const pacientes = await leerData("pacientes");
        const index = pacientes.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }

        const { nombre, apellido, dni, email, telefono, obraSocial, nroAfiliado, fechaNacimiento } = req.body;

        pacientes[index] = {
            ...pacientes[index],
            nombre,
            apellido,
            dni,
            email,
            telefono,
            obraSocial,
            nroAfiliado,
            fechaNacimiento
        };

        await escribirData("pacientes", pacientes);

        res.status(200).json(pacientes[index]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function eliminarPaciente(req, res) {
    try {
        const { id } = req.params;
        const pacientes = await leerData("pacientes");
        const index = pacientes.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ error: "Paciente no encontrado" });
        }

        const eliminado = pacientes.splice(index, 1);
        await escribirData("pacientes", pacientes);

        res.status(200).json(eliminado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarPacientes,
    crearPaciente,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
};
