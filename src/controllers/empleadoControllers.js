const Empleado = require('../models/Empleado')
const { leerData, escribirData } = require('../lib/fs')

function formularioNuevoEmpleado(req, res) {
    const titulo = "Nuevo empleado"

    try {
        // El formulario NUEVO siempre inicia vacío
        res.render('empleados/nuevo', { titulo, formData: {} })
    } catch (error) {
        return res.render('empleados/nuevo', {
            titulo,
            error: error.message,
            formData: {}
        })
    }
}

async function formularioEditarEmpleado(req, res) {
    const titulo = "Editar empleado"

    try {
        const empleados = await leerData('empleados')
        const empleado = empleados.find((e) => e.id === req.params.id)

        if (!empleado) {
            return res.render('empleados/editar', {
                titulo,
                error: "ID empleado incorrecto"
            })
        }

        // Edit usa formData también
        res.render('empleados/editar', { titulo, formData: empleado })
    } catch (error) {
        return res.render('empleados/editar', {
            titulo,
            error: error.message,
            formData: req.body
        })
    }
}

async function crearEmpleado(req, res) {
    try {
        const { nombre, apellido, dni, email, rol, area } = req.body

        const empleado = new Empleado(nombre, apellido, dni, email, rol, area)
        const empleados = await leerData('empleados')

        empleados.push(empleado)
        await escribirData('empleados', empleados)

        res.redirect('/empleados')
    } catch (error) {
        const titulo = "Nuevo empleado"
        return res.render('empleados/nuevo', {
            titulo,
            error: error.message,
            formData: req.body
        })
    }
}

async function listarEmpleados(req, res) {
    const titulo = "Empleados"

    try {
        const empleados = await leerData('empleados')
        res.render('empleados/listado', { titulo, empleados })
    } catch (error) {
        return res.render('empleados/listado', {
            titulo,
            error: error.message
        })
    }
}

async function actualizarEmpleado(req, res) {
    const titulo = "Editar empleado"

    try {
        const { id } = req.params
        const empleados = await leerData('empleados')
        const index = empleados.findIndex((e) => e.id === id)

        if (index === -1) {
            return res.render('empleados/editar', {
                titulo,
                error: "ID empleado inexistente"
            })
        }

        empleados[index] = { ...empleados[index], ...req.body }
        await escribirData('empleados', empleados)

        res.redirect('/empleados')
    } catch (error) {
        return res.render('empleados/editar', {
            titulo,
            error: error.message,
            formData: { ...req.body, id: req.params.id }
        })
    }
}

async function eliminarEmpleado(req, res) {
    const titulo = "Empleados"

    try {
        const { id } = req.params
        const empleados = await leerData('empleados')
        const index = empleados.findIndex((e) => e.id === id)

        if (index === -1) {
            return res.render('empleados/listado', {
                titulo,
                error: "ID empleado inexistente",
                empleados
            })
        }

        empleados.splice(index, 1)
        await escribirData('empleados', empleados)

        res.redirect('/empleados')
    } catch (error) {
        const empleados = await leerData('empleados')
        return res.render('empleados/listado', {
            titulo,
            error: error.message,
            empleados
        })
    }
}

module.exports = {
    formularioNuevoEmpleado,
    formularioEditarEmpleado,
    listarEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
}
