const express = require('express');
const passport = require('passport');

const router = express.Router();
const contractController = require('../controller/contractController');

router.get('/get-list-contract', passport.authenticate('jwt', {
  session: false
}), contractController.getListContract);

module.exports = router;