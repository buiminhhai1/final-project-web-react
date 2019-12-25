const express = require('express');
const passport = require('passport');

const router = express.Router();
const complainController = require('../controller/complainController');

router.post('/createComplain', passport.authenticate('jwt', {
  session: false
}), complainController.createComplain);

router.put('/updateComplain', passport.authenticate('jwt', {
  session: false
}), complainController.updateComplain);

module.exports = router;