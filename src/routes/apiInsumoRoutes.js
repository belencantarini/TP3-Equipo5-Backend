const express = require('express')
const {
  listarInsumos,
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo,
  obtenerInsumo
} = require('../controllers/apiInsumoController')
const { validarApiInsumo } = require('../middlewares/validarApiInsumo')

const router = express.Router()

router.get('/', listarInsumos)
router.post('/', validarApiInsumo, crearInsumo)
router.put('/:id', validarApiInsumo, actualizarInsumo)
router.delete('/:id', eliminarInsumo)
router.get('/:id', obtenerInsumo)

module.exports = router