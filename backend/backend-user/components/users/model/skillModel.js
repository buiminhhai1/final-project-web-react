const mongoose = require('mongoose');
const SkillSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    content:String,
});
exports.SkillSchema = SkillSchema;
exports.SkillModel = mongoose.model('skills', SkillSchema);
