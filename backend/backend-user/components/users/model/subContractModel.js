const mongoose = require('mongoose');

const subContract = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: false
  },
  userContractId: {
    type: mongoose.Schema.Types.ObjectId,
    require: false
  },
  emailUserContract: {
    type: String,
    require: false
  },
  nameUserContract: {
    type: String,
    require: false
  },
  from: {
    type: String,
    require: false
  },
  to: {
    type: String,
    require: false
  },
  hourRate: {
    type: Number,
    require: false
  },
  totalHourCommit: {
    type: Number,
    require: false
  },
  review: {
    type: String,
    require: false
  },
  status: {
    type: Number,
    require: false
  },
  score: {
    type: Number,
    require: false
  },
  isHirer: {
    type: Boolean,
    require: false
  }
});

module.exports = subContract;