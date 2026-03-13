const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero'
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director'
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora'
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo'
    },
    anioEstreno: {
        type: Number
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }
});

module.exports = model('Media', MediaSchema);