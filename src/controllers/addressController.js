const { validationResult } = require('express-validator')
const {
    createAddressModel,
    getAllAddressesModel,
    getAddressesByParamsModel,
    getAddressByIdModel,
} = require('../models/addressModel')

// Middleware de tratamento de erros  
const errorHandler = (err, req, res, next) => {  
    console.error(err.stack)
    res.status(500).json({ success: false, message: 'Erro interno no servidor.', error: err.message })
}

// Cria um novo endereço  
async function createAddress(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {  
        const endereco = req.body
        const newEndereco = await createAddressModel(endereco)
        res.status(201).json({
            success: true,
            message: 'Endereço criado com sucesso!',
            endereco: newEndereco
        })
    } catch (error) {
        next(error)
    }
}

// Obtém todos os endereços  
async function getAllAddresses(req, res, next) {
    try {
        const enderecos = await getAllAddressesModel()
        res.status(200).json({
            success: true,
            data: enderecos
        })
    } catch (error) {
        next(error)
    }
}

// Busca um endereço por ID  
async function getAddressByIdController(req, res, next) {
    const { id } = req.params

    try {
        const endereco = await getAddressByIdModel(id)

        if (!endereco) {
            return res.status(404).json({ success: false, message: 'Endereço não encontrado.' })
        }

        return res.status(200).json({ success: true, data: endereco })
    } catch (error) {
        next(error)
    }
}

// Busca endereços com base em parâmetros
async function getAddressesByParamsController(req, res, next) {
    try {
        const { rua, numero, bairro, cidade, estado } = req.query;  
        const addresses = await getAddressesByParamsModel({ rua, numero, bairro, cidade, estado })

        if (!addresses || addresses.length === 0) {
            return res.status(404).json({ success: false, message: 'Nenhum endereço encontrado com os parâmetros fornecidos.' })
        }

        return res.status(200).json({ success: true, data: addresses })
    } catch (error) {
        next(error)
    }
}

module.exports = {  
    createAddress,  
    getAllAddresses,  
    getAddressesByParamsController,  
    getAddressByIdController,
    errorHandler,  
};