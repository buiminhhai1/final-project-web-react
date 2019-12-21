const mongoose = require('mongoose');
const paymentSchema = mongoose.Schema({
  contractId: {
   type: mongoose.Schema.Types.ObjectId,
   require:true
  },
  paymentId:{
    type:String,
    require:true
  },
  payerId:{
    type:String,
    require:true
  },
  time:{
    type:Date,
    default:Date.now,
    require:true
  }
});

module.exports = mongoose.model('payments', paymentSchema);