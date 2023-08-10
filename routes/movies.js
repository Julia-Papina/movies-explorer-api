const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validation');

router.get('/', getSavedMovies);
router.post('/', celebrate(validateCreateMovie), createMovie);
router.delete('/:_id', celebrate(validateDeleteMovie), deleteMovie);

module.exports = router;
