const express = require('express');
const passport = require('passport');

const router = express.Router();
// const contractCommands = require('../controller/contractCommands');
const contractCommands = require('../controller/contractCommands');
const contractQueries = require('../controller/contractQueries');

router.get('/getContracts', passport.authenticate('jwt', {
  session: false
}), contractQueries.getContracts);

router.post('/createContract', passport.authenticate('jwt', {
  session: false
}), contractCommands.createContract);

router.put('/update-contract', passport.authenticate('jwt', {
  session: false
}), contractCommands.updateContract);

router.put('/rating', passport.authenticate('jwt', {
  session: false
}), contractCommands.rateContract);

module.exports = router;