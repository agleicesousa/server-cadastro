const connection = require('./connection');

// Função para criar o endereço do membro
async function createAddressModel(endereco) {
    const { rua, numero, bairro, cidade, estado, cep, complemento } = endereco;

    try {
        const result = await connection.query(
            `INSERT INTO enderecos (rua, numero, bairro, cidade, estado, cep, complemento)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            [rua, numero, bairro, cidade, estado, cep, complemento]
        );

        return { id: result.rows[0].id };
    } catch (error) {
        throw new Error('Erro ao criar endereço: ' + error.message);
    }
}

// Função para buscar todos os endereços
async function getAllAddressesModel() {
    try {
        const result = await connection.query('SELECT * FROM enderecos');
        return result.rows;
    } catch (error) {
        throw new Error('Erro ao buscar endereços: ' + error.message);
    }
}

module.exports = {
    createAddressModel,
    getAllAddressesModel,
};