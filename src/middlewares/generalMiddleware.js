const { body } = require('express-validator')

const ERROR_MESSAGES = {
    REQUIRED: (field) => `${field} é obrigatório.`,
};

const createValidationRules = (fields, isOptional = false) => {
    return fields.map((field) => {
        let validation = body(field)
        if (isOptional) {
            validation = validation.optional()
        } else {
            validation = validation.exists().withMessage(ERROR_MESSAGES.REQUIRED(field)).notEmpty().withMessage(ERROR_MESSAGES.REQUIRED(field))
        }

        switch (field) {
            case 'nome':
                return validation.isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres.')
            case 'descricao':
                return validation.isLength({ min: 10, max: 2000 }).withMessage('Descrição deve ter entre 10 e 2000 caracteres.')
            default:
                return validation
        }
    });
};

// Validações para criação
const validateCreation = createValidationRules(['nome', 'descricao'])

// Validações para atualização (usando a função genérica com `isOptional` como true)
const validateUpdate = createValidationRules(['nome', 'descricao'], true)

module.exports = {
    validateCreation,
    validateUpdate,
};