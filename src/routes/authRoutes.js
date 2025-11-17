const express = require('express');
const router = express.Router();

const { mostrarLogin, login, logout } = require('../controllers/authController');

// Mostrar formulario de login
router.get('/login', mostrarLogin);

// Procesar login
router.post('/login', login);

// Cerrar sesión
router.get('/logout', logout);

module.exports = router;

