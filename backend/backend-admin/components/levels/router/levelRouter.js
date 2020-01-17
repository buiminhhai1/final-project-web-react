const passport = require('passport');
const express = require('express');

const router = express.Router();
const levelQuery = require('../controller/query/levelsQuery');
const levelCommand = require('../controller/command/levelsCommand');

router.get('/get-list-enable-level', levelQuery.getListLevel);

router.get('/get-list', passport.authenticate('jwt', {
  session: false
}), levelQuery.getListLevel);

router.post('/add-level', passport.authenticate('jwt', {
  session: false
}), levelCommand.addLevel);

router.put('/update-level', passport.authenticate('jwt', {
  session: false
}), levelCommand.updateLevel);

router.delete('/delete-level', passport.authenticate('jwt', {
  session: false
}), levelCommand.deleteLevel);


module.exports = router;