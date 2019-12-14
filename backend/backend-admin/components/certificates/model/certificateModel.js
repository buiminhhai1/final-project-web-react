const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('certificate', certificateSchema);