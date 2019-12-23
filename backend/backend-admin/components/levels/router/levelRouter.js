const passport = require('passport');
const express = require('express');

const router = express.Router();
const levelController = require('../controller/levelController');

router.get('/get-list-enable-level', levelController.getListLevel);

router.get('/get-list', passport.authenticate('jwt', {
  session: false
}), levelController.getListLevel);

router.post('/add-level', passport.authenticate('jwt', {
  session: false
}), levelController.addLevel);

router.put('/update-level', passport.authenticate('jwt', {
  session: false
}), levelController.updateLevel);

router.delete('/delete-level', passport.authenticate('jwt', {
  session: false
}), levelController.deleteLevel);


module.exports = router;