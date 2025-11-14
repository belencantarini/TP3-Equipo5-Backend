const express = require('express')
const { listarEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado, obtenerEmpleado } = require('../controllers/apiEmpleadoControllers')
const { validarApiEmpleado } = require('../middlewares/validarApiEmpleado')

const router = express.Router()

router.get('/', listarEmpleados)
router.post('/', validarApiEmpleado, crearEmpleado)
router.put('/:id', validarApiEmpleado, actualizarEmpleado)
router.delete('/:id', eliminarEmpleado)
router.get('/:id', obtenerEmpleado)

module.exports = router
