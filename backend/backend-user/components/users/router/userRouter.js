const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);

router.post('/login/googleOauth', userController.googleLogin);
router.post('/login/facebookOauth', userController.facebookLogin);


router.get('/detail', userController.getUser);
router.post('/user-profile', passport.authenticate('jwt', {
    session: false
}), userController.updateUser);
router.post('/teacher-profile', passport.authenticate('jwt', {
    session: false
}), userController.updateTeacher);
router.post('/image-upload', userController.uploadImage);

router.get('/verify', userController.verifyUser);
router.post('/changePassword', passport.authenticate('jwt', {
    session: false
}), userController.changePassword);
router.post('/resetPassword',passport.authenticate('jwt', {
    session: false
}), userController.resetPassword);
router.post('/sendEmailResetPassword',passport.authenticate('jwt', {
    session: false
}), userController.sendEmailResetPassword);
module.exports = router;