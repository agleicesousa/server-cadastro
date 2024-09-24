const express = require('express')
const router = express.Router()

const positionsController = require('../controllers/positionsController')
const { validateCreation, validateUpdate } = require('../middlewares/generalMiddleware')

// Rota para criação de Cargos
router.post('/', validateCreation, positionsController.createPositions)

// Rota para listar todos os Cargos
router.get('/', positionsController.getAllPositions)

// Rota para buscar um cargo pelo ID
router.get('/:id', positionsController.getPositionById)

// Rota para atualizar um cargo (parcialmente)
router.put('/:id', validateUpdate, positionsController.updatePositionController)

// Rota para deletar um cargo
router.delete('/:id', positionsController.deletePositionController)

// Middleware de Tratamento de Erros
router.use(positionsController.errorHandler)

module.exports = router;