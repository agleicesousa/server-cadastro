const { body } = require('express-validator');

// Mensagens de erro
const ERROR_MESSAGES = {
    REQUIRED: (field) => `${field} é obrigatório.`,
    NUMERIC: 'O número deve ser numérico.',
    CEP_FORMAT: 'CEP deve estar no formato 12345-678.',
};

// Função de validação genérica
const createValidationRules = (fields, isOptional = false) => {
    return fields.map((field) => {
        const validation = isOptional ? body(field).optional() : body(field).notEmpty().withMessage(ERROR_MESSAGES.REQUIRED(field));

        switch (field) {
            case 'numero':
                return validation.isNumeric().withMessage(ERROR_MESSAGES.NUMERIC);
            case 'cep':
                return validation.matches(/^\d{5}-?\d{3}$/).withMessage(ERROR_MESSAGES.CEP_FORMAT);
            default:
                return validation;
        }
    });
};

// Validações para criação de endereço
const validateAddressCreation = createValidationRules(['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep']);

// Validações para atualização de endereço (usando a função genérica com `isOptional` como true)
const validateAddressUpdate = createValidationRules(['rua', 'numero', 'bairro', 'cidade', 'estado', 'cep'], true);

module.exports = {
    validateAddressCreation,
    validateAddressUpdate,
};