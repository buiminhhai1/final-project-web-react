const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('skill', skillSchema);