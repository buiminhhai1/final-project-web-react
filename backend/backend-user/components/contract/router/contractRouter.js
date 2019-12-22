const express = require('express');
const passport = require('passport');

const router = express.Router();
const contractController = require('../controller/contractController');

router.post('/contract', passport.authenticate('jwt', {
  session: false
}), contractController.createContract);

router.put('/update-contract', passport.authenticate('jwt', {
  session: false
}), contractController.updateContract);
module.exports = router;