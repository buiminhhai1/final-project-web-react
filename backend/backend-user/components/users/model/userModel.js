const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  verify:{
    type : Boolean,
    default: false,
    require: true
  },
  isTeacher: {
    type: Boolean,
    required: true
  },
  imageUrl: {
    type: String,
    require: true,
  },
  local: {
    name: String,
    email: {
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