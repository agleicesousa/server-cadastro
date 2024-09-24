const { createEntity, getAllEntities, getEntityById, updateEntity, deleteEntity } = require('./genericController');
const {
    createMinistryModel,
    getAllMinistriesModel,
    getMinistryByIdModel,
    updateMinistryModel,
    deleteMinistryModel,
} = require('../models/ministriesModel');

module.exports = {
    createMinistry: createEntity({ create: createMinistryModel }),
    getAllMinistries: getAllEntities({ getAll: getAllMinistriesModel }),
    getMinistryById: getEntityById({ getById: getMinistryByIdModel }),
    updateMinistry: updateEntity({ update: updateMinistryModel }),
    deleteMinistry: deleteEntity({ delete: deleteMinistryModel }),
};