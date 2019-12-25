const mongoose = require('mongoose');
const ComplainModel = require('../model/complainModel');
const {
  sendEmail
} = require('../../utils/email/sendEmail');

exports.getListComplain = async (req, res, next) => {
  try {
    const complains = await ComplainModel.find({});
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

exports.updateComplain = async (req, res, next) => {
  const {
    _id,
    status,
    content
  } = req.body;

  let subject;
  if (status === 1) {
    subject = 'Approve Complain';
  } else {
    subject = 'Reject Complain';
  }

  try {
    const updated = await ComplainModel.findById(_id);
    if (updated) {
      updated.status = status;
      const result = await updated.save();

      const msgComplainer = {
        to: updated.userComplain.email,
        subject,
        text: content,
        html: `<h1>${content}</h1>`
      };
      const msg = {
        to: updated.contract.student.email === updated.userComplain.email ?
          updated.contract.teacher.email : updated.contract.student.email,
        subject,
        text: content,
        html: `<h1>${content}</h1>`
      };
      // thểm phần transaction ở đây nhé man

      sendEmail(msgComplainer);
      sendEmail(msg);
      return res.json({
        complain: result,
        message: 'Update complain success!'
      });
    }
    return res.json({
      error: 'Update complain has failed!',
      message: 'Update complain has fail'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'Something went wrong!'
    });
  }
};