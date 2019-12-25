const express = require('express');
const passport = require('passport');

const router = express.Router();
const complainController = require('../controller/complainController');

router.get('/getListComplain', passport.authenticate('jwt', {
  session: false
}), complainController.getListComplain);


router.put('/updateStatusComplain', passport.authenticate('jwt', {
  session: false
}), complainController.updateComplain);

module.exports = router;