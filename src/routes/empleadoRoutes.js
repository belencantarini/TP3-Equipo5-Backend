// src/routes/empleadoRoutes.js
const express = require('express');
const router = express.Router();

const controlador = require('../controllers/empleadoMongoControllerPug');
const { validarEmpleado } = require('../middlewares/validarEmpleado');

router.get('/', controlador.listarEmpleados);
router.get('/nuevo', controlador.mostrarFormularioNuevo);
router.post('/nuevo', validarEmpleado('nuevo'), controlador.crearEmpleado);

router.get('/editar/:id', controlador.mostrarFormularioEditar);
router.post('/editar/:id', validarEmpleado('editar'), controlador.actualizarEmpleado);

router.post('/eliminar/:id', controlador.eliminarEmpleado);

module.exports = router;
