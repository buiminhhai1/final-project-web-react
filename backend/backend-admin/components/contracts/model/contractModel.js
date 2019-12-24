const mongoose = require('mongoose');
const SubUserModel = require('./subUserModel');

const contractModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  student: SubUserModel,
  teacher: SubUserModel,
  hourRate: {
    type: Number,
    require: true
  },
  totalHourCommit: {
    type: Number,
    require: true
  },
  from: {
    type: String,
    require: true
  },
  to: {
    type: String,
    require: true,
  },
  review: {
    type: String,
    require: false
  },
  status: {
    type: Number,
    require: true
  },
  score: {
    type: Number,
    require: false
  }
});

module.exports = mongoose.model('contract', contractModel);