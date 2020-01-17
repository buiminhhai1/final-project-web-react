const express = require('express');
const passport = require('passport');

const router = express.Router();
const userCommands = require('../controller/userCommands');
const userQueries = require('../controller/userQueries');

router.post('/login', userQueries.login);
router.post('/register', userCommands.register);

router.post('/login/googleOauth', userCommands.googleLogin);
router.post('/login/facebookOauth', userQueries.facebookLogin);

router.get('/detail', userQueries.getUser);
router.post('/user-profile', passport.authenticate('jwt', {
    session: false
}), userCommands.updateUser);
router.post('/teacher-profile', passport.authenticate('jwt', {
    session: false
}), userCommands.updateTeacher);
router.post('/image-upload', userCommands.uploadImage);

router.get('/verify', userCommands.verifyUser);
router.post('/changePassword', passport.authenticate('jwt', {
    session: false
}), userCommands.changePassword);
router.post('/resetPassword', passport.authenticate('jwt', {
    session: false
}), userCommands.resetPassword);
router.post('/sendEmailResetPassword', passport.authenticate('jwt', {
    session: false
}), userCommands.sendEmailResetPassword);

module.exports = router;