const subjectModel = require('../models/subject.model');

exports.getSubjects = async (req, res) => {
    try {
        let subjects = await subjectModel.find({}, { title: 1, _id: 0 });
        let subjectsArray = subjects.map(subject => { return subject.title })
        return res.json({ subjects: subjectsArray })
    }
    catch (err) {
        return res.json({ message: "Cannot get any subjects" })
    }
}