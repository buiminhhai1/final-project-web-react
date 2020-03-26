const mongoose = require('mongoose');

const subUserModel = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
});

module.exports = subUserModel;