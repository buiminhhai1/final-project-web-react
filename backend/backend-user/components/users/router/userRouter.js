const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);

router.post('/login/googleOauth', userController.googleLogin);
router.post('/login/facebookOauth', userController.facebookLogin);


module.exports = router;