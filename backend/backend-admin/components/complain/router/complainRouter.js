const express = require('express');
const passport = require('passport');

const router = express.Router();
const complainCommand = require('../controller/command/complainCommand');
const complainQuery = require('../controller/query/complainQuery')

router.get('/getListComplain', passport.authenticate('jwt', {
  session: false
}), complainQuery.getListComplain);


router.put('/updateStatusComplain', passport.authenticate('jwt', {
  session: false
}), complainCommand.updateComplain);

module.exports = router;