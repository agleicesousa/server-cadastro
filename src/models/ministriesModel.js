const { createEntity, getAllEntities, getEntityById, updateEntity, deleteEntity } = require('./genericModel');

const createMinistryModel = async (ministry) => {
    return createEntity('ministerios', ministry);
};

const getAllMinistriesModel = async () => {
    return getAllEntities('ministerios');
};

const getMinistryByIdModel = async (id) => {
    return getEntityById('ministerios', id);
};

const updateMinistryModel = async (id, updatedFields) => {
    return updateEntity('ministerios', id, updatedFields);
};

const deleteMinistryModel = async (id) => {
    return deleteEntity('ministerios', id);
};

module.exports = {
    createMinistryModel,
    getAllMinistriesModel,
    getMinistryByIdModel,
    updateMinistryModel,
    deleteMinistryModel,
};