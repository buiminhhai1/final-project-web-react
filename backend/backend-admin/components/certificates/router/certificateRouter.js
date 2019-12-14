const passport = require('passport');
const express = require('express');

const router = express.Router();
const certificateController = require('../controller/certificateController');

router.get('/get-list-enable-certificate', certificateController.getListCertificate);

router.get('/get-list', passport.authenticate('jwt', {
  session: false
}), certificateController.getListCertificate);

router.post('/add-certificate', passport.authenticate('jwt', {
  session: false
}), certificateController.addCertificate);

router.put('/update-certificate/:id', passport.authenticate('jwt', {
  session: false
}), certificateController.updateCertificate);

router.delete('delete-certificate/:id', passport.authenticate('jwt', {
  session: false
}), certificateController.deleteCertificate);

module.exports = router;