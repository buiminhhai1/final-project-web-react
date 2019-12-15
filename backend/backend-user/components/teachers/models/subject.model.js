const mongoose = require('mongoose');
const subjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('subjects', subjectSchema);