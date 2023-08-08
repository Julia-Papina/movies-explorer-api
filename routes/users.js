const router = require('express').Router();

const { getInfoMe, updateProfile, getUsers } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getInfoMe);
router.patch('/me', updateProfile);

module.exports = router;
