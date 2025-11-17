const express = require('express');
const router = express.Router();
const { mostrarDashboard } = require('../controllers/dashboardController');
const { protegerRuta } = require('../middlewares/auth');

// Dashboard requiere login
router.get('/', protegerRuta, mostrarDashboard);

module.exports = router;
