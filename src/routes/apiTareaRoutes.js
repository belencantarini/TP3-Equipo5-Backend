const express = require('express')
const { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea, obtenerTareaPorId } = require('../controllers/apiTareaControllers')
const {validarApiTarea} = require('../middlewares/validarApiTarea')

const router = express.Router()

router.get('/', obtenerTareas)
router.post('/', validarApiTarea, crearTarea)
router.put('/:id', validarApiTarea, actualizarTarea)
router.delete('/:id', eliminarTarea)
router.get('/:id', obtenerTareaPorId)

module.exports = router
