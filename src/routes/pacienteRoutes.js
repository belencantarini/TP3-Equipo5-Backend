const express = require('express')
const { leerData, escribirData } = require('../lib/fs')
const Paciente = require('../models/Paciente')

const router = express.Router()

// Listado de pacientes
router.get('/', async (req, res) => {
  try {
    const pacientes = await leerData('pacientes')
    res.render('pacientes/listado', { titulo: 'Pacientes', pacientes })
  } catch (error) {
    res.render('pacientes/listado', { titulo: 'Pacientes', error: 'Error al cargar los pacientes' })
  }
})

// Formulario nuevo paciente
router.get('/nuevo', (req, res) => {
  res.render('pacientes/nuevo', { titulo: 'Nuevo Paciente' })
})

// Crear paciente (desde formulario)
router.post('/nuevo', async (req, res) => {
  try {
    const { nombre, apellido, dni, email, telefono, obraSocial, nroAfiliado, fechaNacimiento } = req.body
    const pacientes = await leerData('pacientes')

    // Validar DNI único
    if (pacientes.some(p => p.dni === dni)) {
      return res.render('pacientes/nuevo', {
        titulo: 'Nuevo Paciente',
        error: 'DNI ya registrado',
        paciente: req.body
      })
    }

    const paciente = new Paciente(nombre, apellido, dni, email, telefono, obraSocial, nroAfiliado, fechaNacimiento)
    pacientes.push(paciente)
    await escribirData('pacientes', pacientes)

    res.redirect('/pacientes')
  } catch (error) {
    res.render('pacientes/nuevo', { titulo: 'Nuevo Paciente', error: 'Error al guardar el paciente' })
  }
})

// Formulario editar paciente
router.get('/editar/:id', async (req, res) => {
  try {
    const pacientes = await leerData('pacientes')
    const paciente = pacientes.find(p => p.id === req.params.id)

    if (!paciente) {
      return res.render('pacientes/listado', { titulo: 'Pacientes', error: 'Paciente no encontrado', pacientes })
    }

    res.render('pacientes/editar', { titulo: 'Editar Paciente', paciente })
  } catch (error) {
    res.render('pacientes/listado', { titulo: 'Pacientes', error: 'Error al cargar paciente' })
  }
})

// Actualizar paciente
router.post('/editar/:id', async (req, res) => {
  try {
    const pacientes = await leerData('pacientes')
    const index = pacientes.findIndex(p => p.id === req.params.id)

    if (index === -1) {
      return res.render('pacientes/listado', { titulo: 'Pacientes', error: 'Paciente no encontrado', pacientes })
    }

    pacientes[index] = { ...pacientes[index], ...req.body }
    await escribirData('pacientes', pacientes)

    res.redirect('/pacientes')
  } catch (error) {
    res.render('pacientes/editar', { titulo: 'Editar Paciente', error: 'Error al actualizar paciente', paciente: req.body })
  }
})

// Eliminar paciente
router.post('/eliminar/:id', async (req, res) => {
  try {
    let pacientes = await leerData('pacientes')
    pacientes = pacientes.filter(p => p.id !== req.params.id)
    await escribirData('pacientes', pacientes)

    res.redirect('/pacientes')
  } catch (error) {
    res.render('pacientes/listado', { titulo: 'Pacientes', error: 'Error al eliminar paciente' })
  }
})

module.exports = router
