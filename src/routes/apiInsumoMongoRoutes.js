const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/apiInsumoMongoController');

// Rutas
router.get('/', insumoController.listarInsumos);
router.get('/:id', insumoController.obtenerInsumo);
router.post('/', insumoController.crearInsumo);
router.put('/:id', insumoController.actualizarInsumo);
router.delete('/:id', insumoController.eliminarInsumo);

module.exports = router;