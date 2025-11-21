const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController'); 
const validarTarea = require('../middlewares/validarTarea');
const { protegerRuta, requiereRol } = require('../middlewares/auth');


// Personas que pueden gestionar tareas: recepcion, administrador
const rolesPermitidos = requiereRol("recepcion", "administrador"); 


// CRUD DE TAREAS
// 1. VER TODAS LAS TAREAS
router.get('/', protegerRuta, rolesPermitidos, tareaController.listarTareas);
// 2. CREAR NUEVA TAREA - VER FORMULARIO Y ENVIAR
router.get('/nuevo', protegerRuta, rolesPermitidos, tareaController.formularioNuevaTarea);
router.post('/nuevo', protegerRuta, rolesPermitidos, validarTarea('nuevo'), tareaController.crearTarea);
// 3. EDITAR TAREA - VER FORMULARIO CON TAREA Y ENVIAR CAMBIOS
router.get('/editar/:id', protegerRuta, rolesPermitidos, tareaController.formularioEditarTarea);
router.put('/editar/:id', protegerRuta, rolesPermitidos, validarTarea('editar'), tareaController.actualizarTarea);
// 4. ELIMINAR TAREA 
router.delete('/eliminar/:id', protegerRuta, rolesPermitidos, tareaController.eliminarTarea);

module.exports = router;