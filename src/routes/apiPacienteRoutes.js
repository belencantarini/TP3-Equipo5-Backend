const express = require('express')
const {
  listarPacientes,
  crearPaciente,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente
} = require('../controllers/apiPacienteControllers')
const { validarApiPaciente } = require('../middlewares/validarApiPaciente')

const router = express.Router()

router.get('/', listarPacientes)
router.get('/:id', obtenerPaciente)
router.post('/', validarApiPaciente, crearPaciente)
router.put('/:id', validarApiPaciente, actualizarPaciente)
router.delete('/:id', eliminarPaciente)

module.exports = router
