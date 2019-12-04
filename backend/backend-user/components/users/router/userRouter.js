const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);

router.post('/login/oauth', userController.OAuthLogin);
router.post('/register/oauth', userController.OAuthRegister);

module.exports = router;