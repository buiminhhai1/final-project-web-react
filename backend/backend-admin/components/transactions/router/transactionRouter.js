const express = require('express');
const passport = require('passport');

const router = express.Router();
const transactionController = require('../controller/transactionController');


router.post('/completeCourse', transactionController.completeContract);

router.post('/failedCourse', transactionController.failedContract);



module.exports = router;