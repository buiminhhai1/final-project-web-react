const express = require('express');
const passport = require('passport');

const router = express.Router();
const chatController = require('../controller/chatController');


// router.post('/groups',chatController.getListGroupChat);
router.post('/groups', passport.authenticate('jwt', {
    session: false
}),chatController.newGroupChat);

router.post('/messages',chatController.getListMessages);
// router.post('/messages', chatController.newMessage);

module.exports = router;