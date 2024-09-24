const connection = require('./connection');

// Função para criar o endereço do membro
const createAddressModel = async (endereco) => {
    const query = `
        INSERT INTO enderecos (rua, numero, bairro, cidade, estado, cep, complemento)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const values = [
        endereco.rua,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.estado,
        endereco.cep,
        endereco.complemento,
    ];

    const result = await connection.query(query, values);
    return result.rows[0];
};

// Função para buscar todos os endereços
const getAllAddressesModel = async () => {
    const query = "SELECT * FROM enderecos;";
    const result = await connection.query(query);
    return result.rows;
};

// Função para buscar um endereço pelo ID
const getAddressByIdModel = async (id) => {
    const query = "SELECT * FROM enderecos WHERE id = $1;";
    const values = [id];
    const result = await connection.query(query, values);
    return result.rows[0];
};

// Função para buscar endereços com base em parâmetros
const getAddressesByParamsModel = async (params) => {
    const whereClause = [];
    const values = [];

    Object.keys(params).forEach((key, index) => {
        const paramValue = params[key];
        if (paramValue !== undefined && paramValue !== null && paramValue !== '') {
            whereClause.push(`${key} = $${values.length + 1}`);
            values.push(paramValue);
        }
    });

    const query = `
        SELECT * FROM enderecos  
        ${whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : ''}
        ORDER BY numero ASC;
    `;

    const result = await connection.query(query, values);
    return result.rows;
};

// Função para atualizar um endereço
const updateAddressModel = async (id, updatedFields) => {
    const setClause = [];
    const values = [];

    // Construindo dinamicamente os campos que devem ser atualizados
    Object.keys(updatedFields).forEach((key, index) => {
        setClause.push(`${key} = $${index + 1}`);
        values.push(updatedFields[key]);
    });

    // Adiciona o ID no array de valores
    values.push(id);

    const query = `
        UPDATE enderecos
        SET ${setClause.join(', ')}
        WHERE id = $${values.length}
        RETURNING *;
    `;

    const result = await connection.query(query, values);
    return result.rows[0];
};

// Função para deletar um endereço
const deleteAddressModel = async (id) => {
    const query = "DELETE FROM enderecos WHERE id = $1 RETURNING *;";
    const values = [id];
    const result = await connection.query(query, values);
    console.log('Row count:', result.rowCount);
    return result.rowCount > 0;
};

module.exports = {
    createAddressModel,
    getAllAddressesModel,
    getAddressByIdModel,
    getAddressesByParamsModel,
    updateAddressModel,
    deleteAddressModel,
};