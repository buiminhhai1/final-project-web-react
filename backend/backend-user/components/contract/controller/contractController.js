const mongoose = require('mongoose');
const ContractModel = require('../model/contractModel');
const UserModel = require('../../users/model/userModel');

exports.createContract = async (req, res, next) => {
  const {
    student,
    teacher,
    from,
    to,
    hourRate,
    totalHourCommit
  } = req.body;
  const newContract = new ContractModel({
    _id: new mongoose.Types.ObjectId(),
    student,
    teacher,
    from,
    to,
    status: 0,
    hourRate,
    totalHourCommit
  });

  try {
    const exStudent = await UserModel.findById(student._id);
    const exTeacher = await UserModel.findById(teacher._id);
    if (exStudent && exTeacher) {
      exStudent.contracts = [...exStudent.contracts, {
        _id: new mongoose.Types.ObjectId(),
        studentId: teacher._id,
        emailStudent: teacher.email,
        nameStudent: teacher.name,
        from,
        to,
        status: 0,
        hourRate,
        totalHourCommit
      }];
      exTeacher.contracts = [...exTeacher.contracts, {
        _id: new mongoose.Types.ObjectId(),
        studentId: student._id,
        emailStudent: student.email,
        nameStudent: student.name,
        from,
        to,
        status: 0,
        hourRate,
        totalHourCommit
      }];
      await exStudent.save();
      await exTeacher.save();
    } else {
      return res.json({
        message: 'not found user',
        error: 'not found user!'
      });
    }

    const result = await newContract.save();
    if (result) {
      return res.json({
        contract: result,
        message: 'create message success'
      });
    }
    return res.json({
      error: 'create contract has failed',
      message: 'create contract has failed'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'some thing went wrong!'
    });
  }
};

exports.updateContract = async (req, res, next) => {
  const {
    _id,
    status,
    review,
    score
  } = req.body;
  try {
    const contract = await ContractModel.findById(_id);
    if (contract) {
      contract.status = status;
      contract.reivew = review;
      contract.score = score;
      await contract.save();
      return res.json({
        contract,
        message: 'update contract has success'
      });
    }
    return res.json({
      message: 'update contract has fail',
      error: 'update contract has failed'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'update has failed!'
    });
  }
};