const express = require('express');
const router = express.Router();

const {
    listarPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
} = require('../controllers/apiPacienteControllers');

const { validarApiPaciente } = require('../middlewares/validarApiPaciente');

// Rutas API REST
router.get('/', listarPacientes);
router.get('/:id', obtenerPaciente);
router.post('/', validarApiPaciente, crearPaciente);
router.put('/:id', validarApiPaciente, actualizarPaciente);
router.delete('/:id', eliminarPaciente);

module.exports = router;

