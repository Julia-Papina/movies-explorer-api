const router = require('express').Router();
const { celebrate } = require('celebrate');

const { getInfoMe, updateProfile } = require('../controllers/users');

const { validateUpdateUser } = require('../middlewares/validation');

router.get('/me', getInfoMe);
router.patch('/me', celebrate(validateUpdateUser), updateProfile);

module.exports = router;
