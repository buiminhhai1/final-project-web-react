const express = require('express');

const router = express.Router();
const transactionController = require('../controller/transactionController');

router.get('/payment', transactionController.checkout);
router.get('/payment/cancel', transactionController.cancelCheckout);
router.get('/payment/success',transactionController.successCheckout);
router.get('/payment', transactionController.checkout);

// router.post('/withdraw', transactionController.withdraw);

// router.post('/transfer', transactionController.withdraw);



module.exports = router;