const Media = require('../models/Media');

const getMedias = async (req, res) => {
    const medias = await Media.find()
    .populate('genero')
    .populate('director')
    .populate('productora')
    .populate('tipo');

    res.json(medias);
}

const createMedia = async (req, res) => {
    const media = new Media(req.body);
    await media.save();
    res.json(media);
}

module.exports = {
    getMedias,
    createMedia
};