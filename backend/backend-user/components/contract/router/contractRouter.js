const express = require('express');
const passport = require('passport');

const router = express.Router();
const contractController = require('../controller/contractController');

router.get('/getContracts', passport.authenticate('jwt', {
  session: false
}), contractController.getContracts);

router.post('/createContract', passport.authenticate('jwt', {
  session: false
}), contractController.createContract);

router.put('/update-contract', passport.authenticate('jwt', {
  session: false
}), contractController.updateContract);

router.put('/rating', passport.authenticate('jwt', {
  session: false
}), contractController.rateContract);

module.exports = router;