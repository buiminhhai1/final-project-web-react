const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {SkillSchema} = require('./skillModel');

const ProfileSchema = Schema({
    idUser: {type:Schema.Types.ObjectId,required:true},
    name:String,
    location:String,
    avatar:String,
    skills:[SkillSchema],
    about:String,
    createdDate:{ type: Date, default: Date.now },
    price: Number,
});


module.exports = mongoose.model('profiles', ProfileSchema);