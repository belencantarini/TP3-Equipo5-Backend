const { leerData, escribirData } = require('../lib/fs');
const Empleado = require('../models/Empleado');  // Clase Empleado (la de JSON)

// 🔹 LISTAR TODOS LOS EMPLEADOS
async function listarEmpleados(req, res) {
    try {
        const empleados = await leerData("empleados");
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 🔹 OBTENER UN EMPLEADO POR ID
async function obtenerEmpleado(req, res) {
    try {
        const { id } = req.params;
        const empleados = await leerData("empleados");
        const empleado = empleados.find(e => e.id === id);

        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        res.json(empleado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 🔹 CREAR EMPLEADO
async function crearEmpleado(req, res) {
    try {
        const { nombre, apellido, dni, email, rol, area } = req.body;

        const empleados = await leerData("empleados");

        // Evitar DNI duplicado
        if (empleados.some(e => e.dni === dni)) {
            return res.status(400).json({ error: "DNI registrado previamente" });
        }

        const nuevoEmpleado = new Empleado(nombre, apellido, dni, email, rol, area);

        empleados.push(nuevoEmpleado);
        await escribirData("empleados", empleados);

        res.status(201).json(nuevoEmpleado);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 🔹 ACTUALIZAR EMPLEADO
async function actualizarEmpleado(req, res) {
    try {
        const { id } = req.params;
        const { nombre, apellido, dni, email, rol, area } = req.body;

        const empleados = await leerData("empleados");
        const index = empleados.findIndex(e => e.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        empleados[index] = {
            ...empleados[index],
            nombre,
            apellido,
            dni,
            email,
            rol,
            area
        };

        await escribirData("empleados", empleados);

        res.status(200).json(empleados[index]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 🔹 ELIMINAR EMPLEADO
async function eliminarEmpleado(req, res) {
    try {
        const { id } = req.params;

        const empleados = await leerData("empleados");
        const index = empleados.findIndex(e => e.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        const eliminado = empleados.splice(index, 1);
        await escribirData("empleados", empleados);

        res.status(200).json(eliminado[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    listarEmpleados,
    obtenerEmpleado,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
};

