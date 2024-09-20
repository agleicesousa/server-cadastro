function validateAddress(req, res, next) {
    const { rua, numero, bairro, cidade, estado, cep } = req.body;

    // Verificar se os campos obrigatórios estão presentes
    if (!rua || !numero || !bairro || !cidade || !estado || !cep) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos: rua, numero, bairro, cidade, estado, cep' });
    }

    // Verificar se o número é um valor numérico
    if (isNaN(numero)) {
        return res.status(400).json({ message: 'O número deve ser um valor numérico' });
    }

    // Verificar se o CEP tem um formato válido (por exemplo, 5 dígitos seguidos de 3 dígitos no Brasil)
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(cep)) {
        return res.status(400).json({ message: 'O CEP deve estar no formato 00000-000' });
    }

    // Validação passou, pode prosseguir para o controlador
    next();
}

module.exports = {
    validateAddress,
};