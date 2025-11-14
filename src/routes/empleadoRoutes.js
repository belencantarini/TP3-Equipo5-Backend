const express = require('express')
const empleadoControllers = require('../controllers/empleadoControllers')
const { validarEmpleado } = require('../middlewares/validarEmpleado')

const router = express.Router()

router.get('/', empleadoControllers.listarEmpleados)
router.get('/nuevo', empleadoControllers.formularioNuevoEmpleado)
router.post('/nuevo', validarEmpleado('nuevo'), empleadoControllers.crearEmpleado)
router.get('/editar/:id', empleadoControllers.formularioEditarEmpleado)
router.post('/editar/:id', validarEmpleado('editar'), empleadoControllers.actualizarEmpleado)
router.delete('/eliminar/:id', empleadoControllers.eliminarEmpleado)

module.exports = router
