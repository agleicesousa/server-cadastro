const { body } = require('express-validator');

const validateCreation = [
    body('nome').isString().notEmpty().withMessage('O nome é obrigatório.'),
    body('descricao').isString().optional(),
];

const validateUpdate = [
    body('nome').isString().optional(),
    body('descricao').isString().optional(),
];

module.exports = {
    validateCreation,
    validateUpdate,
};