const express = require('express')
const router = express.Router()

const positionsController = require('../controllers/positionsController')
const { validatePositionCreation, validatePositionUpdate } = require('../middleware/positionsMiddleware')

// Rota para criação de Cargos
router.post('/', validatePositionCreation, positionsController.createPositions)

// Rota para listar todos os Cargos
router.get('/', positionsController.getAllPositions)

// Rota para buscar um cargo pelo ID
router.get('/:id', positionsController.getPositionById)

// Rota para atualizar um cargo (parcialmente)
router.put('/:id', validatePositionUpdate, positionsController.updatePositionController)

// Rota para deletar um cargo
router.delete('/:id', positionsController.deletePositionController)

// Middleware de Tratamento de Erros
router.use(positionsController.errorHandler)

module.exports = router;