const passport = require('passport');
const express = require('express');

const router = express.Router();
const levelEducationController = require('../controller/levelEducationController');
const levelEducationQuery = require('../controller/query/levelEducationQuery');
const levelEducationCommand = require('../controller/command/levelEducationCommand');

router.get('/get-list-enable-level-education', levelEducationQuery.getListLevelEducation);

router.get('/get-list-level-education', passport.authenticate('jwt', {
  session: false
}), levelEducationQuery.getListLevelEducation);

router.post('/add-level-education', passport.authenticate('jwt', {
  session: false
}), levelEducationCommand.addLevelEducation);

router.put('/update-level-education', passport.authenticate('jwt', {
  session: false
}), levelEducationCommand.updateLevelEducation);

router.delete('/delete-level-education', passport.authenticate('jwt', {
  session: false
}), levelEducationCommand.deleteLevelEducation);


module.exports = router;