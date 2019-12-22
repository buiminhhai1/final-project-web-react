const express = require('express');
const passport = require('passport');

const router = express.Router();
const chatController = require('../controller/chatController');


// router.get('/groups/:id', passport.authenticate('jwt', {
//     session: false
// }),chatController.getListGroupChat);
router.post('/groups', passport.authenticate('jwt', {
    session: false
}),chatController.newGroupChat);

// router.get('/messages/:id', passport.authenticate('jwt', {
//     session: false
// }),chatController.getListMessages);
// router.post('/messages', passport.authenticate('jwt', {
//     session: false
// }),chatController.newMessage);

module.exports = router;