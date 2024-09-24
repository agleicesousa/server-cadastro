const { validationResult } = require('express-validator')
const {
    createMinistryModel,
    getAllMinistriesModel,
} = require('../models/ministriesModel')

// Middleware de tratamento de erros  
const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        success: false,
        message: 'Erro interno no servidor.',
        error: err.message
    })
}

// Cria um novo ministério
async function createMinistry(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {
        const ministry = req.body;
        const newMinistry = await createMinistryModel(ministry);
        res.status(201).json({
            success: true,
            message: 'Ministério criado com sucesso!',
            data: newMinistry
        });
    } catch (error) {
        next(error)
    }
}

// Lista todos os ministérios
async function getAllMinistries(req, res, next) {
    try {
        const ministerios = await getAllMinistriesModel();
        res.status(200).json({
            success: true,
            data: ministerios
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createMinistry,
    getAllMinistries,
    errorHandler
};