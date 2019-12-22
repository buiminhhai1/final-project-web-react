const mongoose = require('mongoose');

const contractModel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  student: {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    }
  },
  teacher: {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    }
  },
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