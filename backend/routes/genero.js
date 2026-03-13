const { Router } = require('express');
const { getGeneros, createGeneros, updateGeneros, deleteGeneros } = require('../controllers/generoController');

const router = Router();

router.get('/', getGeneros);
router.post('/', createGeneros);
router.put('/:id', updateGeneros);
router.delete('/:id', deleteGeneros);

module.exports = router;