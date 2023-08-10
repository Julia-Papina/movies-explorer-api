const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createUser, login, signout } = require('../controllers/users');
const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { loginValidation, registerValidation } = require('../middlewares/validation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', celebrate(registerValidation), createUser);
router.post('/signin', celebrate(loginValidation), login);
router.get('/signout', signout);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
