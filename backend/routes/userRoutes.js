const express = require('express');
const { userRegister, userLogin, getMe } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', userRegister);

router.post('/login', userLogin);

router.get('/me', protect, getMe);

module.exports = router;
