const express = require('express');
const router = express.Router();

const positionsController = require('../controllers/positionsController');
const { validatePositionCreation } = require('../middleware/positionsMiddleware');

// Rota para criação de Cargos
router.post('/', validatePositionCreation, positionsController.createPositions);

// Rota para listar todos os Cargos
router.get('/', positionsController.getAllPositions);

// Middleware de Tratamento de Erros
router.use(positionsController.errorHandler)

module.exports = router;