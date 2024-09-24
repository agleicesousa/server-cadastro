const express = require('express');
const {
    createPosition,
    getAllPositions,
    getPositionById,
    updatePosition,
    deletePosition,
} = require('../controllers/positionsController');
const { validateCreation, validateUpdate } = require('../middlewares/genericMiddleware');

const router = express.Router();

router.post('/', validateCreation, createPosition);
router.get('/', getAllPositions);
router.get('/:id', getPositionById);
router.put('/:id', validateUpdate, updatePosition);
router.delete('/:id', deletePosition);

module.exports = router;