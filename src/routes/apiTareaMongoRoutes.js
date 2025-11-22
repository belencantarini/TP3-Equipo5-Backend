const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/apiTareaMongoController'); 
const { validarApiTareaMongo } = require('../middlewares/validarApiTareaMongo');
const { protegerRuta, requiereRol } = require('../middlewares/auth');
const rolesPermitidos = requiereRol("recepcion", "administrador");

router.get('/', protegerRuta, rolesPermitidos, tareaController.listarTareas);
router.get('/:id', protegerRuta, rolesPermitidos, tareaController.obtenerTarea);
router.post('/', protegerRuta, rolesPermitidos, validarApiTareaMongo, tareaController.crearTarea); // Agregar middleware de validación si existe
router.put('/:id', protegerRuta, rolesPermitidos, validarApiTareaMongo, tareaController.actualizarTarea); // Agregar middleware de validación si existe
router.delete('/:id', protegerRuta, rolesPermitidos, tareaController.eliminarTarea);
module.exports = router;