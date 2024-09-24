const connection = require('./connection')

// Função para criar um novo cargo
const createPositionsModel = async (cargo) => {
    const query = `
        INSERT INTO cargos (nome, descricao)
        VALUES ($1, $2)
        RETURNING *;
    `
    const values = [cargo.nome, cargo.descricao]
    const result = await connection.query(query, values)
    return result.rows[0]
}

// Função para obter todos os cargos
const getAllPositionsModel = async () => {
    const query = `SELECT * FROM cargos;`
    const result = await connection.query(query)
    return result.rows
}

// Função para buscar um cargo pelo ID
const getPositionByIdModel = async (id) => {
    const query = `SELECT * FROM cargos WHERE id = $1;`
    const values = [id]
    const result = await connection.query(query, values)
    return result.rows[0]
}

// Função para atualizar um cargo
const updatePositionModel = async (id, updatedFields) => {
    const setClause = []
    const values = []

    // Construindo dinamicamente os campos que devem ser atualizados
    Object.keys(updatedFields).forEach((key, index) => {
        setClause.push(`${key} = $${index + 1}`)
        values.push(updatedFields[key])
    })

    // Adiciona o ID no array de valores
    values.push(id)

    const query = `
    UPDATE cargos
    SET ${setClause.join(', ')}
    WHERE id = $${values.length}
    RETURNING *;
`

    const result = await connection.query(query, values)
    return result.rows[0]
}

module.exports = {
    createPositionsModel,
    getAllPositionsModel,
    getPositionByIdModel,
    updatePositionModel,
}