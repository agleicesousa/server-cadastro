const connection = require('./connection')

// Função para criar um novo ministério
const createMinistryModel = async (ministro) => {
    const query = `
        INSERT INTO ministerios (nome, descricao)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [ministro.nome, ministro.descricao]
    const result = await connection.query(query, values)
    return result.rows[0]
}

// Função para buscar todos os ministérios
const getAllMinistriesModel = async () => {
    const query = "SELECT * FROM ministerios;"
    const result = await connection.query(query)
    return result.rows;
};

module.exports = {
    createMinistryModel,
    getAllMinistriesModel,
};