const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { validateAddressCreation, validateAddressUpdate } = require('../middlewares/addressMiddleware');

router.post('/', validateAddressCreation, addressController.createAddress);
router.get('/', addressController.getAllAddresses);
router.get('/buscar', addressController.getAddressesByParamsController);
router.get('/:id', addressController.getAddressByIdController);
router.put('/:id', validateAddressUpdate, addressController.updateAddressController);
router.delete('/:id', addressController.deleteAddressController);

module.exports = router;