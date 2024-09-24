const express = require('express')
const router = express.Router()

const ministriesController = require('../controllers/ministriesController')
const { validateCreation, validateUpdate } = require('../middleware/generalMiddleware')

// Rota para criação de Ministérios
router.post('/', validateCreation, ministriesController.createMinistry)

// Rota para listar todos os Ministérios
router.get('/', ministriesController.getAllMinistries)

// Middleware de Tratamento de Erros
router.use(ministriesController.errorHandler)

module.exports = router