const Empleado = require('../models/Empleado')
const { leerData, escribirData } = require('../lib/fs')

async function crearEmpleado(req, res) {
    try {
        const { nombre, apellido, dni, email, rol, area } = req.body

        // Data
        const empleado = new Empleado(nombre, apellido, dni, email, rol, area)
        const empleados = await leerData("empleados")

        // Combrobar DNI
        if (empleados.some(e => e.dni === empleado.dni)) {
            return res.status(400).json({
                error: "DNI registrado previamente"
            })
        }

        // Guardar
        empleados.push(empleado)
        await escribirData("empleados", empleados)

        return res.status(201).json(empleado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function listarEmpleados(req, res) {
    try {
        const empleados = await leerData("empleados")
        res.status(200).json(empleados)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function obtenerEmpleado(req, res) {
    try {
        const { id } = req.params

        // Data
        const empleados = await leerData("empleados")
        const empleado = empleados.find(e => e.id === id)

        // Combrobar empleado
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' })
        }

        return res.json(empleado)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

async function actualizarEmpleado(req, res) {
    try {
        const { id } = req.params

        // Data
        const empleados = await leerData("empleados")
        const index = empleados.findIndex(e => e.id === id)

        // Comprobar empleado
        if (index === -1) {
            return res.status(404).json({ error: 'Empleado no encontrado' })
        }

        const { nombre, apellido, dni, email, rol, area } = req.body

        // Guardar
        empleados[index] = { ...empleados[index], nombre, apellido, dni, email, rol, area }
        await escribirData("empleados", empleados)

        res.status(200).json(empleados[index])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

async function eliminarEmpleado(req, res) {
    try {
        const { id } = req.params

        // Data
        const empleados = await leerData("empleados")
        const index = empleados.findIndex(e => e.id === id)

        // Comprobar empleado
        if (index === -1) {
            return res.status(404).json({ error: 'Empleado no encontrado' })
        }

        // Guardar
        const eliminado = empleados.splice(index, 1)
        await escribirData("empleados", empleados)

        res.status(200).json(eliminado)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { listarEmpleados, crearEmpleado, obtenerEmpleado, actualizarEmpleado, eliminarEmpleado }
