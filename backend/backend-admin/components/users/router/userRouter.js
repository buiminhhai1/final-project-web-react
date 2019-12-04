const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);
<<<<<<< HEAD
router.post('/register', userController.register);

router.post('/login/oauth', userController.OAuthLogin);
router.post('/register/oauth', userController.OAuthRegister);

module.exports = router;
=======
router.post('/register', userController.register);
>>>>>>> 29d0b24b903ecc789d3f2f30e4d8d54b54d5b962
