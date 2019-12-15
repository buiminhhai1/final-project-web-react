const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idFacebook: {
    type: String,
    require: false
  },
  idGoogle: {
    type: String,
    require: false
  },
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: false,
  },
  picture: {
    type: String,
    require: false,
  },
  role: {
    type: String,
    require: false,
  },
  type: {
    type: String,
    require: false
  }
});

module.exports = mongoose.model('admin', userSchema);