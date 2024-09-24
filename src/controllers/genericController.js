const { validationResult } = require('express-validator');

const createEntity = (model) => async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const entity = req.body;
        const newEntity = await model.create(entity);
        res.status(201).json({
            success: true,
            message: `${model.name} criado com sucesso!`,
            data: newEntity,
        });
    } catch (error) {
        next(error);
    }
};

const getAllEntities = (model) => async (req, res, next) => {
    try {
        const entities = await model.getAll();
        res.status(200).json({
            success: true,
            data: entities,
        });
    } catch (error) {
        next(error);
    }
};

const getEntityById = (model) => async (req, res, next) => {
    const { id } = req.params;

    try {
        const entity = await model.getById(id);
        if (!entity) {
            return res.status(404).json({
                success: false,
                message: 'Entidade não encontrada.',
            });
        }

        res.status(200).json({ success: true, data: entity });
    } catch (error) {
        next(error);
    }
};

const updateEntity = (model) => async (req, res, next) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const updatedFields = req.body;
        const updatedEntity = await model.update(id, updatedFields);
        if (!updatedEntity) {
            return res.status(404).json({
                success: false,
                message: 'Entidade não encontrada.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Entidade atualizada com sucesso!',
            data: updatedEntity,
        });
    } catch (error) {
        next(error);
    }
};

const deleteEntity = (model) => async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleted = await model.delete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Entidade não encontrada.',
            });
        }

        res.status(200).json({ success: true, message: 'Entidade deletada com sucesso!' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createEntity,
    getAllEntities,
    getEntityById,
    updateEntity,
    deleteEntity,
};