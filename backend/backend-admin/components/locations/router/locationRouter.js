const passport = require('passport');
const express = require('express');

const router = express.Router();
const locationController = require('../controller/locationController');

router.get('/get-list-location', locationController.getListLocation);

router.post('/add-location', passport.authenticate('jwt', {
  session: false
}), locationController.addLocation);

router.put('/update-location', passport.authenticate('jwt', {
  session: false
}), locationController.updateLocation);

router.delete('/delete-location', passport.authenticate('jwt', {
  session: false
}), locationController.deleteLocation);

module.exports = router;