const mongoose = require('mongoose');

const levelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('level', levelSchema);