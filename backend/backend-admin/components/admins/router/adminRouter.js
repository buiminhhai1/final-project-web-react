const passport = require('passport');
const express = require('express');

const router = express.Router();

const adminQuery = require('../controller/query/adminQuery');
const adminCommand = require('../controller/command/adminCommand');

router.post('/login', adminCommand.login);
router.post('/register', adminCommand.register);

router.post('/login/facebookOauth', adminCommand.facebookLogin);
router.post('/login/googleOauth', adminCommand.googleLogin);

router.get('/detail', passport.authenticate('jwt', {
  session: false
}), adminQuery.getDetailUser);

module.exports = router;