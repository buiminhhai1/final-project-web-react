const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  district: [{
    name: {
      type: String,
      require: false
    }
  }],
  city: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('location', locationSchema);