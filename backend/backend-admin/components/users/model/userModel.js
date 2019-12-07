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
<<<<<<< HEAD
    require: false,
=======
    require: true,
>>>>>>> 29d0b24b903ecc789d3f2f30e4d8d54b54d5b962
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

<<<<<<< HEAD
module.exports = mongoose.model('user', userSchema);
=======
module.exports = mongoose.model('user', userSchema);
>>>>>>> 29d0b24b903ecc789d3f2f30e4d8d54b54d5b962
