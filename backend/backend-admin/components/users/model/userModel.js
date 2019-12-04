const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: false,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: false,
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
});

module.exports = mongoose.model('user', userSchema);
