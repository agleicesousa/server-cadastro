const connection = require('./connection');

const createEntity = async (table, entity) => {
    const query = `
        INSERT INTO ${table} (nome, descricao)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [entity.nome, entity.descricao];
    const result = await connection.query(query, values);
    return result.rows[0];
};

const getAllEntities = async (table) => {
    const query = `SELECT * FROM ${table};`;
    const result = await connection.query(query);
    return result.rows;
};

const getEntityById = async (table, id) => {
    const query = `SELECT * FROM ${table} WHERE id = $1;`;
    const values = [id];
    const result = await connection.query(query, values);
    return result.rows[0];
};

const updateEntity = async (table, id, updatedFields) => {
    const setClause = [];
    const values = [];

    Object.keys(updatedFields).forEach((key, index) => {
        setClause.push(`${key} = $${index + 1}`);
        values.push(updatedFields[key]);
    });

    values.push(id);
    const query = `
        UPDATE ${table}
        SET ${setClause.join(', ')}
        WHERE id = $${values.length}
        RETURNING *;
    `;
    const result = await connection.query(query, values);
    return result.rows[0];
};

const deleteEntity = async (table, id) => {
    const query = `DELETE FROM ${table} WHERE id = $1 RETURNING *;`;
    const values = [id];
    const result = await connection.query(query, values);
    return result.rowCount > 0;
};

module.exports = {
    createEntity,
    getAllEntities,
    getEntityById,
    updateEntity,
    deleteEntity,
};