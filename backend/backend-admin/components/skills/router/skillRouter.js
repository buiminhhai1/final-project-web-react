const passport = require('passport');
const express = require('express');

const router = express.Router();
const skillController = require('../controller/skillControler');

router.get('/get-list-enable-skill', skillController.getListSkill);

router.get('/get-list', passport.authenticate('jwt', {
  session: false
}), skillController.getListSkill);

router.post('/add-skill', passport.authenticate('jwt', {
  session: false
}), skillController.addSkill);

router.put('/update-skill/:id', passport.authenticate('jwt', {
  session: false
}), skillController.updateSkill);

router.delete('/delete-skill/:id', passport.authenticate('jwt', {
  session: false
}), skillController.deleteSkill);

module.exports = router;