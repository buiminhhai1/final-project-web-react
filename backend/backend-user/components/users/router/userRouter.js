const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);

router.post('/login/googleOauth', userController.googleLogin);
router.post('/login/facebookOauth', userController.facebookLogin);


router.get('/detail', userController.getUser);
router.post('/detail', userController.updateUser);
router.post('/image-upload', userController.upimage);

router.get('/verify',userController.verifyUser);
router.post('/changePassword',userController.changePassword);
router.post('/resetPassword',userController.resetPassword);
router.post('/sendEmailResetPassword',userController.sendEmailResetPassword);
module.exports = router;