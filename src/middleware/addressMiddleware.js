const { body } = require('express-validator')

const validateAddress = [
    body('rua').notEmpty().withMessage('A rua é obrigatória.'),
    body('numero').isNumeric().withMessage('O número deve ser numérico.'),
    body('bairro').notEmpty().withMessage('O bairro é obrigatório.'),
    body('cidade').notEmpty().withMessage('A cidade é obrigatória.'),
    body('estado').notEmpty().withMessage('O estado é obrigatório.'),
    body('cep').matches(/^\d{5}-?\d{3}$/).withMessage('CEP deve estar no formato 12345-678.'),
]

module.exports = {
    validateAddress,
}