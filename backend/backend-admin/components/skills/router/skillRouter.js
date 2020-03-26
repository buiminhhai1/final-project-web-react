const passport = require('passport');
const express = require('express');

const router = express.Router();

const skillCommand = require('../controller/command/skillCommand');
const skillQuery = require('../controller/query/skillQuery');

router.get('/get-list-enable-skill', skillQuery.getListSkill);

router.get('/get-list', passport.authenticate('jwt', {
  session: false
}), skillQuery.getListSkill);

router.post('/add-skill', passport.authenticate('jwt', {
  session: false
}), skillCommand.addSkill);

router.put('/update-skill/:id', passport.authenticate('jwt', {
  session: false
}), skillCommand.updateSkill);

router.delete('/delete-skill/:id', passport.authenticate('jwt', {
  session: false
}), skillCommand.deleteSkill);

module.exports = router;