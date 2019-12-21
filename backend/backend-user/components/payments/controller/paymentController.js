const PaymentModel = require('../model/paymentModel');
const paypal = require('paypal-rest-sdk');
const { paypalConfigure, create_payment_json, create_web_profile_json, execute_payment_json } = require('../utils/utils');
paypal.configure(paypalConfigure);

exports.checkout = (req, res) => {
  const { contractId, successUrl, failedUrl } = req.query;

  paypal.webProfile.create(create_web_profile_json(), function (error, web_profile) {
    if (error) {
      throw error;
    } else {
      const payment_json = create_payment_json(1,
        `http://localhost:4000/payment/success?contractId=${contractId}&successUrl=${successUrl}&failedUrl=${failedUrl}`,
        'http://localhost:4000/payment/cancel');
      //Set the id of the created payment experience in payment json
      var experience_profile_id = web_profile.id;
      payment_json.experience_profile_id = experience_profile_id;

      paypal.payment.create(payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              res.redirect(payment.links[i].href);
            }
          }
        }
      });
    }
  });
}


exports.successCheckout = (req, res) => {
  const { PayerID, paymentId, successUrl, failedUrl, contractId } = req.query;
  try {
    paypal.payment.execute(paymentId, execute_payment_json(PayerID, 1),
      async function (error, payment) {
        if (error) {
          console.log(error.message);
          res.redirect(failedUrl);
        } else {
          const existPayment = await PaymentModel.findOne({ $or: [
            {paymentId},{contractId}
          ] });
          if (existPayment) {
            console.log('Something wrong');
            res.redirect(failedUrl);
          } else {
            const payment = new PaymentModel({ contractId, paymentId, payerId: PayerID });
            payment.save().then(result => {
              if (result)
                res.redirect(successUrl);
              else res.redirect(failedUrl);
            })
          }

        }
      });
  } catch (error) {
    console.log('cant check out for contractId ' + contractId);
    res.redirect(failedUrl);
  }
}

exports.cancelCheckout = (req, res) => res.send('Cancelled');
