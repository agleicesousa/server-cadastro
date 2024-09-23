const connection = require('./connection')

// Função para criar o endereço do membro
const createAddressModel = async (endereco) => {
    const query = `
        INSERT INTO enderecos (rua, numero, bairro, cidade, estado, cep, complemento)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `
    const values = [endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado, endereco.cep, endereco.complemento]
    const result = await connection.query(query, values)
    return result.rows[0]
}

// Função para buscar todos os endereços
const getAllAddressesModel = async () => {  
    const query = "SELECT * FROM enderecos;"
    const result = await connection.query(query)
    return result.rows
}

// Função para buscar um endereço pelo ID
const getAddressByIdModel = async (id) => {  
    const query = "SELECT * FROM enderecos WHERE id = $1;"
    const values = [id]
    const result = await connection.query(query, values)
    return result.rows[0]
}

// Função para buscar endereços com base em parâmetros de query e retornar os resultados em ordem crescente pelo número do endereço
const getAddressesByParamsModel = async (params) => {  
    const whereClause = []
    const values = []

    Object.keys(params).forEach((key, index) => {
        const paramValue = params[key];
        // Verifica se o valor é definido, é uma string não vazia ou um número
        if (paramValue !== undefined && paramValue !== null && paramValue !== '') {
            whereClause.push(`${key} = $${values.length + 1}`)
            values.push(paramValue)
        }
    })

    const query = `
        SELECT * FROM enderecos  
        ${whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : ''}
    `
    
    console.log("QUERY: ", query) // Para depuração
    console.log("VALUES: ", values) // Para depuração

    const result = await connection.query(query, values)
    return result.rows
}

module.exports = {  
    createAddressModel,
    getAllAddressesModel,
    getAddressByIdModel,
    getAddressesByParamsModel,  
}