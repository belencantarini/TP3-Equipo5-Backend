// src/routes/apiPacienteMongoRoutes.js
const express = require('express');
const router = express.Router();
const controlador = require('../controllers/apiPacienteMongoController');
const { validarApiPaciente } = require('../middlewares/validarApiPaciente');

router.get('/', controlador.listar);
router.get('/:id', controlador.obtenerPorId);
router.post('/', validarApiPaciente, controlador.crear);
router.put('/:id', validarApiPaciente, controlador.actualizar);
router.delete('/:id', controlador.eliminar);

module.exports = router;
