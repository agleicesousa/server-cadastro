const express = require('express')
const router = express.Router()

const addressController = require('../controllers/addressController')
const { validateCreation, validateUpdate } = require('../middleware/generalMiddleware')

// Rota para criação de endereços  
router.post('/', validateCreation, addressController.createAddress)

// Rota para obter todos os endereços
router.get('/', addressController.getAllAddresses)

// Rota para buscar endereços com parâmetros
router.get('/buscar', addressController.getAddressesByParamsController)

// Rota para buscar endereço por ID
router.get('/:id', addressController.getAddressByIdController)

// Rota para atualizar endereço (parcialmente)  
router.put('/:id', validateUpdate, addressController.updateAddressController)

// Rota para deletar endereço
router.delete('/:id', addressController.deleteAddressController)

// Middleware de Tratamento de Erros
router.use(addressController.errorHandler)

module.exports = router;