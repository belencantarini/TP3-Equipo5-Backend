const express = require('express');
const router = express.Router();
const tareaMongoController = require('../controllers/tareaMongoController'); 
const validarTareaMongo = require('../middlewares/validarTareaMongo');


router.get('/', tareaMongoController.listarTareas)
router.get('/nuevo', tareaMongoController.formularioNuevaTarea)
router.post('/nuevo', validarTareaMongo('nuevo'), tareaMongoController.crearTarea)
router.get('/editar/:id', tareaMongoController.formularioEditarTarea)
router.put('/editar/:id', validarTareaMongo('editar'), tareaMongoController.actualizarTarea)
router.delete('/eliminar/:id', tareaMongoController.eliminarTarea)

module.exports = router
