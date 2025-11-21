const express = require('express');
const router = express.Router();
const controlador = require('../controllers/pacienteMongoControllerPug');
const { validarPaciente } = require('../middlewares/validarPaciente');
const { protegerRuta, requiereRol } = require('../middlewares/auth');

// Personas que pueden gestionar pacientes:
// recepcion, medico, administrador
const permitido = requiereRol("recepcion", "medico", "administrador");

// LISTAR
router.get('/', protegerRuta, permitido, controlador.listarPacientes);

// FORM NUEVO
router.get('/nuevo', protegerRuta, permitido, controlador.mostrarFormularioNuevo);

// GUARDAR NUEVO PACIENTE
router.post('/nuevo', protegerRuta, permitido, validarPaciente, controlador.crearPaciente);

// FORM EDITAR
router.get('/editar/:id', protegerRuta, permitido, controlador.mostrarFormularioEditar);

// GUARDAR EDICIÓN
router.post('/editar/:id', protegerRuta, permitido, validarPaciente, controlador.actualizarPaciente);

// ELIMINAR
router.post('/eliminar/:id', protegerRuta, permitido, controlador.eliminarPaciente);

module.exports = router;
