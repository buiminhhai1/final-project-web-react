const express = require('express');
const passport = require('passport');

const router = express.Router();
const chatController = require('../controller/chatController');

router.post('/groups', passport.authenticate('jwt', {
    session: false
}), chatController.newGroupChat);

router.post('/messages', passport.authenticate('jwt', {
    session: false
}), chatController.getListMessages);

module.exports = router;