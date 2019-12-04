const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  role: {
    type: String,
    enum: ['tutor', 'student'],
    required: true
  },
  imageUrl: {
    type: String,
    require: false,
  },
  local: {
    name: String,
    emailAddress: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    }
  },
  google: {
    id: {
      type: String
    },
    name: String,
    email: {
      type: String,
      lowercase: true,
    }
  },
  facebook: {
    id: {
      type: String
    },
    name: String,
    email: {
      type: String,
      lowercase: true,
    }
  },
});

module.exports = mongoose.model('user', userSchema);