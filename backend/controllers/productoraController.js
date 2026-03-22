const { request, response } = require('express');
const Productora = require('../models/Productora');

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find();
        res.status(200).json(productoras);
    } catch (error) {
        console.error('Error al obtener productoras:', error);
        res.status(500).json({ msg: 'Error al listar productoras' });
    }
}

const createProductora = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;

        const productoraDB = await Productora.findOne({ nombre });
        if (productoraDB) {
            return res.status(400).json({ msg: `La productora "${nombre}" ya existe` });
        }

        const productora = new Productora(req.body);

        await productora.save();

        res.status(201).json(productora);
    } catch (error) {
        console.error('Error al crear productora:', error);
        res.status(500).json({ msg: 'Error al guardar productora' });
    }
}

const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const productora = await Productora.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json(productora);
    } catch (error) {
        console.error('Error al actualizar productora:', error);
        res.status(500).json({ msg: 'Error al actualizar productora' });
    }
}

const deleteProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        await Productora.findByIdAndDelete(id);

        res.status(200).json({ msg: 'Productora eliminada' });
    } catch (error) {
        console.error('Error al eliminar productora:', error);
        res.status(500).json({ msg: 'Error al eliminar productora' });
    }
}

module.exports = {
    getProductoras,
    createProductora,
    updateProductora,
    deleteProductora
};