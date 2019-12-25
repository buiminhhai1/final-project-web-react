const mongoose = require('mongoose');
const ComplainModel = require('../model/complainModel');

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
    status
  } = req.body;

  try {
    const updated = await ComplainModel.findById(_id);
    if (updated) {
      updated.status = status;
      const result = await updated.save();
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