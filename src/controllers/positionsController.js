const { createEntity, getAllEntities, getEntityById, updateEntity, deleteEntity } = require('./genericController');
const {
    createPositionsModel,
    getAllPositionsModel,
    getPositionByIdModel,
    updatePositionModel,
    deletePositionModel,
} = require('../models/positionsModel');

module.exports = {
    createPosition: createEntity({ create: createPositionsModel }),
    getAllPositions: getAllEntities({ getAll: getAllPositionsModel }),
    getPositionById: getEntityById({ getById: getPositionByIdModel }),
    updatePosition: updateEntity({ update: updatePositionModel }),
    deletePosition: deleteEntity({ delete: deletePositionModel }),
};