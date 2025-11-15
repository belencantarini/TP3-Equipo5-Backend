const express = require('express');
const router = express.Router();

const {
    listarEmpleados,
    crearEmpleado,
    obtenerEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
} = require('../controllers/apiEmpleadoControllers');

const { validarApiEmpleado } = require('../middlewares/validarApiEmpleado');

// Rutas API REST
router.get('/', listarEmpleados);
router.get('/:id', obtenerEmpleado);
router.post('/', validarApiEmpleado, crearEmpleado);
router.put('/:id', validarApiEmpleado, actualizarEmpleado);
router.delete('/:id', eliminarEmpleado);

module.exports = router;

