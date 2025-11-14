const express = require('express');
const router = express.Router();
const EmpleadoMongoController = require('../controllers/empleadoMongoController');

// Rutas API para Empleados (MongoDB)
router.get('/', EmpleadoMongoController.listarEmpleados);
router.get('/:id', EmpleadoMongoController.obtenerEmpleadoPorId);
router.post('/', EmpleadoMongoController.crearEmpleado);
router.put('/:id', EmpleadoMongoController.actualizarEmpleado);
router.delete('/:id', EmpleadoMongoController.eliminarEmpleado);

module.exports = router;
