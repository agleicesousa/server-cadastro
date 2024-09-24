const { validationResult } = require('express-validator');
const {
    getPositionByIdModel, 
    createPositionsModel, 
    getAllPositionsModel,
    updatePositionModel,
    deletePositionModel,
} = require('../models/positionsModel');

// Middleware de tratamento de erros  
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Erro interno no servidor.',
        error: err.message
    })
}

// Cria um novo cargo  
async function createPositions(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const cargo = req.body;
        const newCargo = await createPositionsModel(cargo);
        res.status(201).json({
            success: true,
            message: 'Novo cargo adicionado com sucesso!',
            cargo: newCargo
        })
    } catch (error) {
        next(error)
    }
}

// Listar todos os cargos
async function getAllPositions(req, res, next) {
    try {
        const positions = await getAllPositionsModel();
        res.status(200).json({
            success: true,
            data: positions,
        })
    } catch (error) {
        next(error)
    }
}

// Buscar um cargos por ID
async function getPositionById(req, res, next) {
    const { id } = req.params

    try {
        const cargo = await getPositionByIdModel(id)

        if (!cargo) {
            return res.status(404).json({
                success: false, message: 'Cargo não encontrado.'
            })
        }

        res.status(200).json({ success: true, data: cargo })
    } catch (error) {
        next(error)
    }
}

// Atualizar um cargo por ID
async function updatePositionController(req, res, next) {
    const { id } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {
        // Pega apenas os campos que foram enviados
        const updatedFields = {};
        const allowedFields = ['nome', 'descricao']
        
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

        const updatedCargo = await updatePositionModel(id, updatedFields)
        if (!updatedCargo) {
            return res.status(404).json({ 
                success: false, message: 'Cargo não encontrado.' 
            })
        }

        return res.status(200).json({ 
            success: true, message: 'Cargo atualizado com sucesso!', data: updatedCargo 
        })

    } catch (error) {
        next(error)
    }
}

// Deleta um cargo por ID
async function deletePositionController(req, res, next) {
    const { id } = req.params

    try {
        const deletedCargo = await deletePositionModel(id)
        if (!deletedCargo) {
            return res.status(404).json({ success: false, message: 'Cargo não encontrado.' })
        }

        return res.status(200).json({ success: true, message: 'Cargo deletado com sucesso!' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPositions,
    getAllPositions,
    getPositionById,
    updatePositionController,
    deletePositionController,
    errorHandler
}