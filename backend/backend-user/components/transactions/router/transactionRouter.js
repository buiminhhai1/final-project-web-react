const express = require('express');

const passport = require('passport');
const router = express.Router();
const transactionController = require('../controller/transactionController');

router.get('/payment', transactionController.checkout);
router.get('/payment/cancel', transactionController.cancelCheckout);
router.get('/payment/success', transactionController.successCheckout);

router.post('/withdraw', passport.authenticate('jwt', {
    session: false
}), transactionController.withdraw);

router.post('/transfer', passport.authenticate('jwt', {
    session: false
}), transactionController.transfer);
router.get('/checkBalance', passport.authenticate('jwt', {
    session: false
}), transactionController.checkBalance);

router.post('/completeCourse', passport.authenticate('jwt', {
    session: false
}), transactionController.completeContract);


module.exports = router;