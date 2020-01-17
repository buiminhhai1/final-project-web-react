const express = require('express');
const passport = require('passport');

const router = express.Router();
// const chatController = require('../controller/chatController');
const chatQueries = require('../controller/chatQueries');
const chatCommands = require('../controller/chatCommands');


// router.post('/groups',chatController.getListGroupChat);
router.post('/groups', passport.authenticate('jwt', {
    session: false
}), chatCommands.newGroupChat);

router.post('/messages', chatQueries.getListMessages);
// router.post('/messages', chatController.newMessage);

module.exports = router;