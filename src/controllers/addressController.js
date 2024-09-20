const { createAddressModel, getAllAddressesModel } = require('../models/addressModel');

async function createAddress(req, res) {
    try {
        const enderecos = req.body;
        const newEndereco = await createAddressModel(enderecos);
        res.status(201).json({ message: 'Endereço criado com sucesso!', id: newEndereco.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error.stack);
    }
}

async function getAllAddresses(req, res) {
    try {
        const enderecos = await getAllAddressesModel();
        res.status(200).json(enderecos);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error.stack);
    }
}

module.exports = {
    createAddress,
    getAllAddresses,
};
