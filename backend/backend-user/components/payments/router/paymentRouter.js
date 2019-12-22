const express = require('express');

const router = express.Router();
const paymentController = require('../controller/paymentController');

router.get('/', paymentController.checkout);
router.get('/cancel', paymentController.cancelCheckout);
router.get('/success',paymentController.successCheckout);
router.get('/transfer',paymentController.transfer);

module.exports = router;