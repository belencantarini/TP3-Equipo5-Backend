const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/apiTareaMongoController'); 


router.get('/', tareaController.listarTareas);
router.get('/:id', tareaController.obtenerTarea);
router.post('/', tareaController.crearTarea); // Agregar middleware de validación si existe
router.put('/:id', tareaController.actualizarTarea); // Agregar middleware de validación si existe
router.delete('/:id', tareaController.eliminarTarea);

module.exports = router;