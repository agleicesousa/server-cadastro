const express = require('express')
const router = express.Router()

const addressController = require('../controllers/addressController')
const { validateAddressCreation, validateAddressUpdate } = require('../middleware/addressMiddleware')

// Rota para criação de endereços  
router.post('/', validateAddressCreation, addressController.createAddress)

// Rota para obter todos os endereços
router.get('/', addressController.getAllAddresses)

// Rota para buscar endereços com parâmetros
router.get('/buscar', addressController.getAddressesByParamsController)

// Rota para buscar endereço por ID
router.get('/:id', addressController.getAddressByIdController)

// Rota para atualizar endereço (parcialmente)  
router.put('/:id', validateAddressUpdate, addressController.updateAddressController)

// Rota para deletar endereço
router.delete('/:id', addressController.deleteAddressController);

// Middleware de Tratamento de Erros
router.use(addressController.errorHandler)

module.exports = router;