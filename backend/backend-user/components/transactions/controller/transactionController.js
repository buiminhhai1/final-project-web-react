const TransactionModel = require('../model/transactionModel');
const ContractModel = require('../../contract/model/contractModel');
const paypal = require('paypal-rest-sdk');
require('dotenv').config();
const { BACKEND_USER_URL } = process.env;
const { paypalTransferMoney, paypalConfigure, create_payment_json, create_web_profile_json, execute_payment_json } = require('../utils/utils');
paypal.configure(paypalConfigure);

exports.checkout = (req, res) => {
  const { contractId, successUrl, failedUrl } = req.query;
  paypal.webProfile.create(create_web_profile_json(), async function (error, web_profile) {
    if (error) {
      console.log('cannot get contract ' + contractId);
      res.redirect(failedUrl);
    } else {
      try {
        const contract = await ContractModel.findOne({ _id: contractId, status: 0 });
        const amount = contract.totalHourCommit * contract.hourRate;
        const payment_json = create_payment_json(amount,
          `${BACKEND_USER_URL}/transaction/payment/success?contractId=${contractId}&successUrl=${successUrl}&failedUrl=${failedUrl}`,
          `${BACKEND_USER_URL}/transaction/payment/cancel?failedUrl=${failedUrl}`);
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
                break;
              }
            }
          }
        });
      }
      catch (error) {
        console.log('cannot get contract ' + contractId);
        res.redirect(failedUrl);
      }
    }
  });
}

exports.successCheckout = async (req, res) => {
  const { PayerID, paymentId, successUrl, failedUrl, contractId } = req.query;
  try {
    const contract = await ContractModel.findOne({ _id: contractId, status: 0 });
    const amount = contract.totalHourCommit * contract.hourRate;
    paypal.payment.execute(paymentId, execute_payment_json(PayerID, amount),
      async function (error) {
        if (error) {
          console.log(error.message);
          res.redirect(failedUrl);
        } else {
          try {
            const existPayment = await TransactionModel.findOne({
              $or: [
                { 'detail.payment.paymentId': paymentId }, { 'detail.payment.contractId': contractId }
              ]
            });
            if (existPayment) {
              console.log('Something wrong');
              res.redirect(failedUrl);
            } else {
              const contract = await ContractModel.findOne({ _id: contractId, status: 0 });
              if (contract) {
                const transaction = new TransactionModel({
                  idUser: contract.student._id,
                  method: "PAYMENT",
                  amount: contract.hourRate * contract.totalHourCommit,
                  detail: {
                    payment: {
                      contractId, paymentId, payerId: PayerID
                    }
                  }
                });
                transaction.save().then(result => {
                  if (result)
                    res.redirect(successUrl);
                  else res.redirect(failedUrl);
                })
              } else res.redirect(failedUrl);
            }
          } catch (error) {
            res.redirect(failedUrl);
          }

        }
      });
  } catch (error) {
    console.log('cant check out for contractId ' + contractId);
    res.redirect(failedUrl);
  }
}

exports.cancelCheckout = (req, res) => {
  const { failedUrl } = req.query;
  console.log('cancel checkout');
  res.redirect(failedUrl);
};

exports.checkBalance = async (req, res) => {
  const { idUser } = req.body;
  console.log(req.user);
  
  const balance = await checkBalanceUser(idUser);
  if (balance < 0) {
    res.json({ result: false, balance, message: 'Cannot check balance' });
  } else {
    res.json({ result: true, balance, message: 'Check balance success' });
  }
}

const checkBalanceUser = async (idUser) => {
  try {
    const list = await TransactionModel.find({ idUser, $or: [{ method: 'TRANSFER' }, { method: 'WITHDRAW' }] });
    let balance = 0;
    list.forEach(e => {
      if (e.amount >= 0) {
        switch (e.method) {
          case 'TRANSFER': balance += e.amount;
            break;
          case 'WITHDRAW': balance -= e.amount;
            break;
        }
      }
    })
    return balance;
  } catch (error) {
    return -1;
  }
}

exports.withdraw = async (req, res) => {
  const { email, idUser } = req.body;
  try {
    const balance = await checkBalanceUser(idUser);
    if (balance > 0) {
      const result = await paypalTransferMoney(email, balance);
      if (result.status < 300) {

        const transaction = new TransactionModel({
          idUser,
          method: "WITHDRAW",
          amount: balance,
          detail: {
            withdraw: {
              paypalEmail: email
            }
          }
        });
        transaction.save().then(result => {
          if (result)
            res.json({ result: true, message: 'withdraw success' })
          else
            res.json({ result: false, message: 'cannot withdraw' })
        })

      }
      else
        res.json({ result: false, message: 'cannot withdraw' })

    } else {
      res.json({ result: false, message: 'cannot withdraw' })
    }
  } catch (error) {
    res.json({ result: false, message: 'cannot withdraw' })
  }


}


exports.transfer = async (req, res) => {
  const { idContract } = req.body;
  try {
    const existTransaction = await TransactionModel.findOne({
      method: "TRANSFER", 'detail.transfer.contractId': idContract
    });
    console.log(existTransaction);
    if (existTransaction) res.json({ result: false, message: "cannot transfer money" });
    else {
      const contract = await ContractModel.findOne({ _id: idContract, status: { $ne: 1 } });
      if (contract) {
        let idReceiveMoney = (contract.status == 2) ? contract.teacher._id : contract.student._id;
        const transaction = new TransactionModel({
          idUser: idReceiveMoney,
          method: "TRANSFER",
          amount: contract.hourRate * contract.totalHourCommit,
          detail: {
            transfer: {
              contractId: idContract
            },
          }
        });
        transaction.save().then(result => {
          if (result)
            res.json({ result: true, message: "transfer money success" });
          else res.json({ result: false, message: "cannot transfer money" });
        })
      } else res.json({ result: false, message: "cannot transfer money" });

    }
  }

  catch (error) {
    res.json({ result: false, message: "cannot transfer money" });
  }
}

