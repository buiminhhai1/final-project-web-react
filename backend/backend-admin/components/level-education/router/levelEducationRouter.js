const passport = require('passport');
const express = require('express');

const router = express.Router();
const levelEducationController = require('../controller/levelEducationController');

router.get('/get-list-enable-level-education', levelEducationController.getListLevelEducation);

router.get('/get-list-level-education', passport.authenticate('jwt', {
  session: false
}), levelEducationController.getListLevelEducation);

router.post('/add-level-education', passport.authenticate('jwt', {
  session: false
}), levelEducationController.addLevelEducation);

router.put('/update-level-education', passport.authenticate('jwt', {
  session: false
}), levelEducationController.updateLevelEducation);

router.delete('/delete-level-education', passport.authenticate('jwt', {
  session: false
}), levelEducationController.deleteLevelEducation);


module.exports = router;