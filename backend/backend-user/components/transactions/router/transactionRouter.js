const express = require('express');
const passport = require('passport');

const router = express.Router();
const transactionCommands = require('../controller/transactionCommands');
const transactionQueries = require('../controller/transactionQueries');

router.get('/checkBalance', passport.authenticate('jwt', {
    session: false
}), transactionQueries.checkBalance);

router.get('/payment', transactionCommands.checkout);
router.get('/payment/cancel', transactionCommands.cancelCheckout);
router.get('/payment/success', transactionCommands.successCheckout);

router.post('/withdraw', passport.authenticate('jwt', {
    session: false
}), transactionCommands.withdraw);

router.post('/transfer', passport.authenticate('jwt', {
    session: false
}), transactionCommands.transfer);

router.post('/completeCourse', passport.authenticate('jwt', {
    session: false
}), transactionCommands.completeContract);

router.post('/failedCourse', transactionCommands.failedContract);

module.exports = router;