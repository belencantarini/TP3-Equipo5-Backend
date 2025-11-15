// src/routes/pacienteRoutes.js
const express = require('express');
const router = express.Router();
const controlador = require('../controllers/pacienteMongoControllerPug');
const { validarPaciente } = require('../middlewares/validarPaciente');

// LISTAR
router.get('/', controlador.listarPacientes);

// FORM NUEVO
router.get('/nuevo', controlador.mostrarFormularioNuevo);

// GUARDAR NUEVO PACIENTE
router.post('/nuevo', validarPaciente, controlador.crearPaciente);

// FORM EDITAR
router.get('/editar/:id', controlador.mostrarFormularioEditar);

// GUARDAR EDICIÓN
router.post('/editar/:id', validarPaciente, controlador.actualizarPaciente);

// ELIMINAR
router.post('/eliminar/:id', controlador.eliminarPaciente);

module.exports = router;

