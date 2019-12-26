const mongoose = require('mongoose');
const subContractModel = require('./subContract');
const subUserModel = require('./subUserModel');

const complainModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userComplain: subUserModel,
  contract: subContractModel,
  content: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model('complain', complainModel);