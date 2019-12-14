const express = require('express');
const router = express.Router();

const subjectsController = require('../controllers/subjects.controller');

router.get('/subjects', subjectsController.getSubjects);

module.exports = router;