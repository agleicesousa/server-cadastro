const { createEntity, getAllEntities, getEntityById, updateEntity, deleteEntity } = require('./genericModel');

const createPositionsModel = async (position) => {
    return createEntity('cargos', position);
};

const getAllPositionsModel = async () => {
    return getAllEntities('cargos');
};

const getPositionByIdModel = async (id) => {
    return getEntityById('cargos', id);
};

const updatePositionModel = async (id, updatedFields) => {
    return updateEntity('cargos', id, updatedFields);
};

const deletePositionModel = async (id) => {
    return deleteEntity('cargos', id);
};

module.exports = {
    createPositionsModel,
    getAllPositionsModel,
    getPositionByIdModel,
    updatePositionModel,
    deletePositionModel,
};