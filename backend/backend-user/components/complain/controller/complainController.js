const mongoose = require('mongoose');
const ComplainModel = require('../model/complainModel');

exports.createComplain = async (req, res, next) => {
  const {
    contract,
    userComplain,
    content
  } = req.body;

  const newContract = new ComplainModel({
    _id: new mongoose.Types.ObjectId(),
    userComplain,
    contract,
    content
  });

  try {
    const result = await newContract.save();
    if (result) {
      return res.json({
        complain: result,
        message: 'Create complain success!'
      });
    }
    return res.json({
      error: 'create complain has failed!',
      message: 'Create complain has fail'
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
    content
  } = req.body;

  try {
    const updated = await ComplainModel.findById(_id);
    if (updated) {
      updated.content = content;
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