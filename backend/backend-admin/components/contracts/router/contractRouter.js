const express = require('express');
const passport = require('passport');

const router = express.Router();
const contractController = require('../controller/contractController');

router.get('/get-list-contract', passport.authenticate('jwt', {
  session: false
}), contractController.getListContract);

router.get('/get-statitics-by-day', passport.authenticate('jwt', {
  session: false
}), contractController.statiticsByDay);

module.exports = router;