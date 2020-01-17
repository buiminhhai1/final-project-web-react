const TransactionModel = require('../model/transactionModel');
const ContractModel = require('../../contract/model/contractModel');
const UserModel = require('../../users/model/userModel');
const paypal = require('paypal-rest-sdk');
require('dotenv').config();
const { BACKEND_USER_URL } = process.env;
const { paypalTransferMoney, paypalConfigure, create_payment_json, create_web_profile_json, execute_payment_json } = require('../utils/utils');
paypal.configure(paypalConfigure);

exports.checkout = (req, res) => {
  const { contractId, successUrl, failedUrl } = req.query;
  paypal.webProfile.create(create_web_profile_json(), async function (error, web_profile) {
    if (error) {
      // console.log('cannot get contract ' + contractId);
      res.redirect(failedUrl);
    } else {
      try {
        const existTransaction = await TransactionModel.findOne({
          method: "PAYMENT", 'detail.payment.contractId': contractId
        });
        if (existTransaction) {
          // console.log('exist');
          res.redirect(failedUrl);
        } else {
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

      }
      catch (error) {
        // console.log('cannot get contract ' + contractId);
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
          // console.log(error.message);
          res.redirect(failedUrl);
        } else {
          try {
            const existPayment = await TransactionModel.findOne({
              $or: [
                { 'detail.payment.paymentId': paymentId }, { 'detail.payment.contractId': contractId }
              ]
            });
            if (existPayment) {
              // console.log('Something wrong');
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
                transaction.save().then(async result => {
                  if (result) {
                    const isUpdate = await updateContract(contract._id, 1);
                    if (isUpdate)
                      res.redirect(successUrl);
                    else res.redirect(failedUrl);
                  }
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
    // console.log('cant check out for contractId ' + contractId);
    res.redirect(failedUrl);
  }
}

exports.cancelCheckout = (req, res) => {
  const { failedUrl } = req.query;
  // console.log('cancel checkout');
  res.redirect(failedUrl);
};

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
  const successTransfer = await transferMoney(idContract);
  if (successTransfer) res.json({ result: true, message: 'transfer money success' });
  else
    res.json({ result: true, message: 'transfer money success' });
}

const transferMoney = async (idContract) => {
  try {
    const existTransaction = await TransactionModel.findOne({
      method: "TRANSFER", 'detail.transfer.contractId': idContract
    });
    if (existTransaction) return false
    else {
      const contract = await ContractModel.findOne({ _id: idContract, status: { $gt: 1 } });
      if (contract) {
        let idReceiveMoney = (contract.status == 2) ? contract.teacher.userId : contract.student.userId;
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
            return true;
          else return false
        })
      } else return false

    }
  }

  catch (error) {
    return false
  }
}

exports.completeContract = async (req, res) => {
  const user = req.user.user;
  const { contractId } = req.body;
  try {
    if (user) {
      const contract = await ContractModel.findById(contractId);
      if (contract && contract.student.userId.toString() == user._id && contract.status === 1) {
        const isUpdate = await updateContract(contractId, 2);
        if (isUpdate) {
          await transferMoney(contractId);
          res.json({ result: true, message: 'End course success' });
        } else res.json({ result: false, message: 'cannot end course' });
      } else
        res.json({ result: false, message: 'cannot end course' });
    } else res.json({ result: false, message: 'cannot end course' });
  } catch (error) {
    res.json({ result: false, message: 'cannot end course' });
  }
}

exports.failedContract = async (req, res) => {
  const { contractId } = req.body;
  try {
    const contract = await ContractModel.findById(contractId);
    if (contract && contract.status === 1) {
      const isUpdate = await updateContract(contractId, 3);
      if (isUpdate) {
        await transferMoney(contractId);
        res.json({ result: true, message: 'Complaint is accepted' });
      } else res.json({ result: false, message: 'something wrong' });
    } else
      res.json({ result: false, message: 'something wrong' });
  } catch (error) {
    // console.log('catch');
    res.json({ result: false, message: 'something wrong' });
  }
}

const updateContract = async (_id, status) => {
  try {
    const contract = await ContractModel.findById(_id);
    if (contract) {
      contract.status = status;
      const idTeach = contract.teacher.userId;
      const idStudent = contract.student.userId;
      const teacher = await UserModel.findById(idTeach);
      const student = await UserModel.findById(idStudent);
      if (teacher && student) {
        const updateTeacher = teacher.contracts.id(_id);
        updateTeacher.status = status;
        const updateStudent = student.contracts.id(_id);
        updateStudent.status = status;
        teacher.save();
        student.save();
        contract.save();
        return true;
      } else {
        // console.log('cant update contract status');
        return false;
      }
    } else {
      // console.log('cant update contract status');
      return false;
    }
  } catch (err) {
    // console.log('cant update contract status');
    return false;
  }
};