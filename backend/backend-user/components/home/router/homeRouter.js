const express = require('express');
const passport = require('passport');

const router = express.Router();
const homeController = require('../controller/homeController');


router.get('/tutors',homeController.getTutorList);
router.get('/tutors/:id',homeController.getTutorDetail);

module.exports = router;