const express = require('express');
const router = express.Router();
const PacienteMongoController = require('../controllers/pacienteMongoController');

// Rutas API Pacientes (MongoDB)
router.get('/', PacienteMongoController.listarPacientes);
router.get('/:id', PacienteMongoController.obtenerPacientePorId);
router.post('/', PacienteMongoController.crearPaciente);
router.put('/:id', PacienteMongoController.actualizarPaciente);
router.delete('/:id', PacienteMongoController.eliminarPaciente);

module.exports = router;
