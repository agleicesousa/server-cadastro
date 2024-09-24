const express = require('express');
const {
    createMinistry,
    getAllMinistries,
    getMinistryById,
    updateMinistry,
    deleteMinistry,
} = require('../controllers/ministriesController');
const { validateCreation, validateUpdate } = require('../middlewares/genericMiddleware');

const router = express.Router();

router.post('/', validateCreation, createMinistry);
router.get('/', getAllMinistries);
router.get('/:id', getMinistryById);
router.put('/:id', validateUpdate, updateMinistry);
router.delete('/:id', deleteMinistry);

module.exports = router;