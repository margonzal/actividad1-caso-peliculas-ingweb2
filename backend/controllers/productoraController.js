const Productora = require('../models/Productora');

const getProductoras = async (req, res) => {
    const productoras = await Productora.find();
    res.json(productoras);
}

const createProductora = async (req, res) => {
    const productora = new Productora(req.body);
    await productora.save();
    res.json(productora);
}

module.exports = {
    getProductoras,
    createProductora
};