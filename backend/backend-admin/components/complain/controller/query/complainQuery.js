const mongoose = require('mongoose');
const ComplainModel = require('../../model/complainModel');
const TransactionController = require('../../../transactions/controller/transactionController');
const {
  sendEmail
} = require('../../../utils/email/sendEmail');

exports.getListComplain = async (req, res, next) => {
  try {
    const complains = await ComplainModel.find({}).sort({
      status: 'asc'
    });
    return res.json({
      complains,
      message: 'Get List Complain success'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'Something went wrong!'
    });
  }
};