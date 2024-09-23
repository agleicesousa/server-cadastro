const { validationResult } = require('express-validator')
const {
    createAddressModel,
    getAllAddressesModel,
    getAddressByIdModel,
    getAddressesByParamsModel,
    updateAddressModel,
    deleteAddressModel
} = require('../models/addressModel')

// Middleware de tratamento de erros  
const errorHandler = (err, req, res, next) => {  
    console.error(err.stack)
    res.status(500).json({ 
        success: false, message: 'Erro interno no servidor.', error: err.message 
    })
}

// Cria um novo endereço  
async function createAddress(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {  
        const endereco = req.body;
        const newEndereco = await createAddressModel(endereco);
        res.status(201).json({
            success: true,
            message: 'Endereço criado com sucesso!',
            endereco: newEndereco
        });
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
            return res.status(404).json({ 
                success: false, message: 'Endereço não encontrado.' 
            })
        }

        return res.status(200).json({ success: true, data: endereco })
    } catch (error) {
        next(error)
    }
}

// Busca endereços com base em parâmetros
async function getAddressesByParamsController(req, res, next) {
    try {
        const { rua, numero, bairro, cidade, estado } = req.query
        const addresses = await getAddressesByParamsModel({ rua, numero, bairro, cidade, estado })

        if (!addresses || addresses.length === 0) {
            return res.status(404).json({ 
                success: false, message: 'Nenhum endereço encontrado com os parâmetros fornecidos.' 
            })
        }

        return res.status(200).json({ success: true, data: addresses });
    } catch (error) {
        next(error)
    }
}

// Atualiza um endereço por ID
async function updateAddressController(req, res, next) {
    const { id } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {
        // Pega apenas os campos que foram enviados
        const updatedFields = {};
        const allowedFields = [
            'rua', 'numero', 'bairro', 'cidade', 'estado', 'cep', 'complemento'
        ]
        
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updatedFields[field] = req.body[field]
            }
        })

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ 
                success: false, message: 'Nenhum campo enviado para atualização.' 
            })
        }

        const updatedEndereco = await updateAddressModel(id, updatedFields)
        if (!updatedEndereco) {
            return res.status(404).json({ 
                success: false, message: 'Endereço não encontrado.' 
            })
        }

        return res.status(200).json({ 
            success: true, message: 'Endereço atualizado com sucesso!', data: updatedEndereco 
        })

    } catch (error) {
        next(error)
    }
}

// Deleta um endereço por ID
async function deleteAddressController(req, res, next) {
    const { id } = req.params;
    console.log('ID recebido:', id);

    try {
        const deleted = await deleteAddressModel(id);

        if (!deleted) {
            return res.status(404).json({ 
                success: false, message: 'Endereço não encontrado.' 
            })
        }

        return res.status(200).json({ 
            success: true, message: 'Endereço deletado com sucesso!' 
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createAddress,
    getAllAddresses,
    getAddressByIdController,
    getAddressesByParamsController,
    updateAddressController,
    deleteAddressController,
    errorHandler
};