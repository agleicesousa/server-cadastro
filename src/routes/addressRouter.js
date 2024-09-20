const express = require('express');
const router = express.Router();

const addressController = require('../controllers/addressController');
const { validateAddress } = require('../middleware/addressMiddleware');

router.post('/', validateAddress, addressController.createAddress);
router.get('/', addressController.getAllAddresses);

module.exports = router;