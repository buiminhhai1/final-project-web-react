const express = require('express');
const passport = require('passport');

const router = express.Router();
const contractQuery = require('../controller/query/contractQuery');

router.get('/get-list-contract', passport.authenticate('jwt', {
  session: false
}), contractQuery.getListContract);

router.get('/get-statitics-by-day', passport.authenticate('jwt', {
  session: false
}), contractQuery.statiticsByDay);

module.exports = router;