const Director = require('../models/Director');

const getDirectores = async (req, res) => {
    const directores = await Director.find();
    res.json(directores);
}

const createDirector = async (req, res) => {
    const director = new Director(req.body);
    await director.save();
    res.json(director);
}

module.exports = {
    getDirectores,
    createDirector
};