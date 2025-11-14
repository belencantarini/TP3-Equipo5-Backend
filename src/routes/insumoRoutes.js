const express = require('express')
const insumoControllers = require('../controllers/insumoController')
const { validarInsumo } = require('../middlewares/validarInsumo')

const router = express.Router()

router.get('/', insumoControllers.listarInsumos)
router.get('/nuevo', insumoControllers.formularioNuevoInsumo)
router.post('/nuevo', validarInsumo('nuevo'), insumoControllers.crearInsumo)
router.get('/editar/:id', insumoControllers.formularioEditarInsumo)
router.post('/editar/:id', validarInsumo('editar'), insumoControllers.actualizarInsumo)
router.delete('/eliminar/:id', insumoControllers.eliminarInsumo)

module.exports = router