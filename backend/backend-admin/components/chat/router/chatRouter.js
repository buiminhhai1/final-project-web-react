const express = require('express');
const passport = require('passport');

const router = express.Router();
const chatCommand = require('../controller/command/chatCommand');
const chatQuery = require('../controller/query/chatQuery');

router.post('/groups', passport.authenticate('jwt', {
    session: false
}), chatCommand.newGroupChat);

router.post('/messages', passport.authenticate('jwt', {
    session: false
}), chatQuery.getListMessages);

module.exports = router;