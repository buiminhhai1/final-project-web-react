const mongoose = require('mongoose');
const ComplainModel = require('../model/complainModel');

exports.createComplain = async (req, res, next) => {
  const {
    contract,
    userComplain,
    content
  } = req.body;

  const newContract = new ComplainModel({
    _id: new mongoose.Types.ObjectId(),
    userComplain,
    contract,
    content
  });

  try {
    const result = await newContract.save();
    if (result) {
      return res.json({
        complain: result,
        message: 'Create complain success!'
      });
    }
    return res.json({
      error: 'create complain has failed!',
      message: 'Create complain has fail'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'Something went wrong!'
    });
  }
};

// exports.updateContract = async (req, res, next) => {
//   const { _id, idsub, review, score, status } = req.body;
//   try {
//     const contract = await ContractModel.findById(_id);
//     const idTeach = contract.teacher.userId;
//     const idStudent = contract.student.userId;
//     const teacher = await UserModel.findById(idTeach);
//     const student = await UserModel.findById(idStudent);
//     if (teacher && student) {
//       const updateTeacher = teacher.contracts.id(_id);
//       updateTeacher.review = review;
//       updateTeacher.score = score;
//       updateTeacher.status = status;
//       // teacher.contracts.id(_id) = updateTeacher;
//       const updateStudent = student.contracts.id(_id);
//       updateStudent.status = status;
//       updateStudent.review = review;
//       updateStudent.score = score;
//       await teacher.save();
//       await student.save();
//     } else {
//       return res.json({
//         message: 'update contract has failed because user not fount'
//       });
//     }

//     if (contract) {
//       contract.status = status;
//       contract.review = review;
//       contract.score = score;
//       await contract.save();
//       return res.json({
//         contract,
//         message: 'update contract has success'
//       });
//     }
//     return res.json({
//       message: 'update contract has fail',
//       error: 'update contract has failed'
//     });
//   } catch (err) {
//     return res.json({
//       error: err,
//       message: 'update has failed!'
//     });
//   }
// };