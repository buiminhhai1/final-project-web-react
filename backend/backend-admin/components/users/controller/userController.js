const mongoose = require('mongoose');
const UserSchema = require('../model/userModel');

const typeGet = {
  teacher: 1,
  student: 2,
  all: 0,
  teacherNonBlock: 3,
  studentNonBlock: 4,
  teacherBlock: 5,
  studentBlock: 6
};

const typeBlock = {
  blocked: 1,
  nonBlocked: 2,
  all: 0
};

exports.getListUser = async (req, res, next) => {
  const {
    type,
    blocking
  } = req.query;
  try {
    let condition = {};
    switch (+type) {
      case typeGet.teacher:
        condition = {
          isTeacher: true
        };
        break;
      case typeGet.student:
        condition = {
          isTeacher: false
        };
        break;
      case typeGet.all:
        condition = {};
        break;
      case typeGet.teacherNonBlock:
        condition = {
          ...condition,
          isBlocking: false
        };
        break;
      case typeGet.studentNonBlock:
        condition = {
          ...condition,
          isBlocking: false
        };
        break;
      case typeGet.teacherBlock:
        condition = {
          ...condition,
          isBlocking: true
        };
        break;
      case typeGet.studentBlock:
        condition = {
          ...condition,
          isBlocking: true
        };
    }

    const users = await UserSchema.find(condition);
    return res.json({
      users,
      message: 'Get list user success'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'Get list user has failed!'
    });
  }
};

exports.blockingUser = async (req, res, next) => {
  const {
    _id,
    blocking
  } = req.body;
  try {
    const user = await UserSchema.findById({
      _id
    });
    if (user) {
      user.isBlocking = blocking;
      await user.save();
      return res.json({
        user,
        message: `user ${user.local.email} has blocked!`
      });
    }
  } catch (err) {
    return res.json({
      error: err,
      message: 'Blocked user has failed!'
    });
  }
};

exports.getDetailUser = async (req, res, next) => {
  const {
    _id
  } = req.body;
  try {
    const user = await UserSchema.findById(_id);
    if (user) {
      return res.json({
        user,
        message: 'get user success'
      });
    } else {
      return res.json({
        message: 'user not found!'
      });
    }
  } catch (err) {
    return res.json({
      error: err,
      message: 'user not found!'
    });
  }
};