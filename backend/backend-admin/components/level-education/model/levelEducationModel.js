const mongoose = require('mongoose');

const levelEducationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('leveleducation', levelEducationSchema);