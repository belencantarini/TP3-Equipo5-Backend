const express = require('express');
const router = express.Router();

const controlador = require('../controllers/empleadoMongoControllerPug');
const { validarEmpleado } = require('../middlewares/validarEmpleado');
const { protegerRuta, requiereRol } = require('../middlewares/auth');

// Solo ADMIN puede gestionar empleados
router.get('/', protegerRuta, requiereRol("administrador"), controlador.listarEmpleados);

router.get('/nuevo', protegerRuta, requiereRol("administrador"), controlador.mostrarFormularioNuevo);

router.post('/nuevo', protegerRuta, requiereRol("administrador"), validarEmpleado('nuevo'), controlador.crearEmpleado);

router.get('/editar/:id', protegerRuta, requiereRol("administrador"), controlador.mostrarFormularioEditar);

router.post('/editar/:id', protegerRuta, requiereRol("administrador"), validarEmpleado('editar'), controlador.actualizarEmpleado);

router.post('/eliminar/:id', protegerRuta, requiereRol("administrador"), controlador.eliminarEmpleado);

module.exports = router;
