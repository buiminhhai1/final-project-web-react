const express = require('express');
const passport = require('passport');

const router = express.Router();
const transactionController = require('../controller/transactionController');

router.get('/payment', transactionController.checkout);
router.get('/payment/cancel', transactionController.cancelCheckout);
router.get('/payment/success', transactionController.successCheckout);

router.post('/withdraw', transactionController.withdraw);

router.post('/transfer', transactionController.transfer);
router.post('/checkBalance', passport.authenticate('jwt', {
    session: false
}), transactionController.checkBalance);


module.exports = router;