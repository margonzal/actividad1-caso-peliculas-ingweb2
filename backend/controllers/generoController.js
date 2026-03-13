const { request, response } = require('express');
const Genero = require('../models/Genero');

const getGeneros = async (req = request, res = response) => {
    try{
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error){
        console.error('Error al obtener géneros', error);
        res.status(500).json({ msg: 'Ocurrió un error al listar los géneros'});
    }    
}

const createGeneros = async (req = request, res = response) => {
    try{
        const {nombre, descripcion} = req.body;
        const generoDB = await Genero.findOne({ nombre });
        if (generoDB) {
            return res.status(400).json({ msg: `El genero "${nombre}" ya existe`});
        }

        const genero = new Genero({ nombre, descripcion});

        await genero.save();
        res.status(201).json(genero);        
    } catch (error){
        console.error('Error al crear genero:', error);
        res.status(500).json({ msg: 'Ocurrió un error al guardar el género'});
    }
}

const updateGeneros = async (req = request, res = response) => {
    try {
        const {id} = req.params;

        const genero = await Genero.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        res.status(200).json(genero);
    } catch (error){
        res.status(500).json({ msg: 'Error de actualización de genero'});
    }
}

const deleteGeneros = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        await Genero.findByIdAndDelete(id);
        res.status(200).json({ msg: 'Género eliminado'});        
    } catch (error){
        res.status(500).json({ msg: 'Error al eliminar género'});
    }
}

module.exports = {
    getGeneros,
    createGeneros,
    updateGeneros,
    deleteGeneros
}