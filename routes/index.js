const router = require('express').Router();
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/logout', logout);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
