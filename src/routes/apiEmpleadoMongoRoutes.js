
const express = require('express');
const router = express.Router();
const controlador = require('../controllers/apiEmpleadoMongoController');
const { validarApiEmpleado } = require('../middlewares/validarApiEmpleado');

router.get('/', controlador.listar);
router.get('/:id', controlador.obtenerPorId);
router.post('/', validarApiEmpleado, controlador.crear);
router.put('/:id', validarApiEmpleado, controlador.actualizar);
router.delete('/:id', controlador.eliminar);

module.exports = router;
