const Tipo = require('../models/Tipo');

const getTipos = async (req, res) => {
    const tipos = await Tipo.find();
    res.json(tipos);
}

const createTipo = async (req, res) => {
    const tipo = new Tipo(req.body);
    await tipo.save();
    res.json(tipo);
}

module.exports = {
    getTipos,
    createTipo
};