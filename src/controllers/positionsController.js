const { validationResult } = require('express-validator');
const { createPositionsModel, getAllPositionsModel } = require('../models/positionsModel');

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
        });
    } catch (error) {
        next(error);
    }
}

// Função para listar todos os cargos
async function getAllPositions(req, res, next) {
    try {
        const positions = await getAllPositionsModel();
        res.status(200).json({
            success: true,
            data: positions,
        });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPositions,
    getAllPositions,
    errorHandler
};