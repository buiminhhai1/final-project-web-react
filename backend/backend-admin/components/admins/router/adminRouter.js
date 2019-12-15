const passport = require('passport');
const express = require('express');

const router = express.Router();
const adminController = require('../controller/adminController');

router.post('/login', adminController.login);
router.post('/register', adminController.register);

router.post('/login/facebookOauth', adminController.facebookLogin);
router.post('/login/googleOauth', adminController.googleLogin);

router.get('/detail', passport.authenticate('jwt', {
  session: false
}), adminController.getDetailUser);

module.exports = router;