const passport = require('passport');
const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');

router.get('/get-list-user', userController.getListUser);

router.put('/blocking-user', passport.authenticate('jwt', {
  session: false
}), userController.blockingUser);

router.get('/detail/:userId', passport.authenticate('jwt', {
  session: false
}), userController.getDetailUser);

module.exports = router;