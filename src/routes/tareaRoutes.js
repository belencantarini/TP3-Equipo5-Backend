const express = require('express')
const { validarTarea } = require('../middlewares/validarTarea')
const tareaControllers = require('../controllers/tareaControllers')

const router = express.Router()

router.get('/', tareaControllers.listarTareas)
router.get('/nuevo', tareaControllers.formularioNuevaTarea)
router.post('/nuevo', validarTarea('nuevo'), tareaControllers.crearTarea)
router.get('/editar/:id', tareaControllers.formularioEditarTarea)
router.post('/editar/:id', validarTarea('editar'), tareaControllers.actualizarTarea)
router.delete('/eliminar/:id', tareaControllers.eliminarTarea)

module.exports = router
