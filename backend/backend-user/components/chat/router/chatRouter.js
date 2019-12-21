const express = require('express');

const router = express.Router();
const chatController = require('../controller/chatController');


router.get('/groups/:id',chatController.getListGroupChat);
router.post('/groups',chatController.newGroupChat);

router.get('/messages/:id',chatController.getListMessages);
router.post('/messages',chatController.newMessage);

module.exports = router;