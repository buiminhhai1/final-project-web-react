const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  city: {
    district: [{
      name: {
        type: String,
        require: false
      },
      ward: [{
        name: {
          type: String,
          require: false
        }
      }]
    }],
    name: {
      type: String,
      require: true
    }
  }
});

module.exports = mongoose.model('location', locationSchema);