const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const UserSchema = require('../model/userModel');
const SubContractSchema = require('../model/subContractModel');

const {
  sendEmail
} = require('../../utils/email/sendEmail');

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
    block,
    content
  } = req.body;
  try {
    const user = await UserSchema.findById({
      _id
    });
    if (user) {
      user.isBlocking = block;
      await user.save();
      let subject;
      let message;
      if (block) {
        subject = 'Blocking user';
        message = `user ${user.email} has blocked!`;
      } else {
        subject = 'Unblocking user';
        message = `user ${user.email} has unblocked!`;
      }
      const msg = {
        to: user.email,
        subject,
        text: content,
        html: `<h1>${content}</h1>`
      };
      sendEmail(msg);
      return res.json({
        user,
        message
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
    userId
  } = req.params;
  try {
    const user = await UserSchema.findById(userId);
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

const leapYear = year => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

exports.getTopUser = async (req, res, next) => {
  let {
    numDate
  } = req.params;
  numDate = +numDate;
  const curr = new Date();
  const currDate = curr.getDate();
  const currMonth = curr.getMonth() + 1;
  const currYear = curr.getFullYear();
  const present = new Date(currYear, currMonth - 1, currDate);
  let prev;
  switch (numDate) {
    case 1:
      prev = new Date(currYear, currMonth - 1, currDate);
      break;
    case 7:
      if (currDate > 7) {
        prev = new Date(currYear, currMonth - 1, currDate - 7);
      } else {
        switch (currMonth) {
          case 2:
          case 4:
          case 8:
          case 9:
          case 11:
            prev = new Date(currYear, currMonth - 1 - 1, currDate + 31 - 7);
            break;
          case 5:
          case 7:
          case 10:
          case 12:
            prev = new Date(currYear, currMonth - 1 - 1, currDate + 30 - 7);
            break;
          case 1:
            prev = new Date(currYear, 12 - 1, currDate + 31 - 7);
            break;
          case 3:
            if (leapYear(currYear)) {
              prev = new Date(currYear, currMonth - 1 - 1, currDate + 29 - 7);
            } else {
              prev = new Date(currYear, currMonth - 1 - 1, currDate + 28 - 7);
            }
            break;
        }
      }
      break;
    case 30:
      if (currDate > 30) {
        prev = new Date(currYear, currMonth - 1, currDate - 7);
      } else {
        switch (currMonth) {
          case 2:
          case 4:
          case 8:
          case 9:
          case 11:
            prev = new Date(currYear, currMonth - 1 - 1, currDate + 31 - 30);
            break;
          case 5:
          case 7:
          case 10:
          case 12:
            prev = new Date(currYear, currMonth - 1 - 1, currDate + 30 - 30);
            break;
          case 1:
            prev = new Date(currYear, 12 - 1, currDate + 31 - 30);
            break;
          case 3:
            if (currDate + 28 > 30) {
              if (leapYear(currYear)) {
                prev = new Date(currYear, currMonth - 1 - 1, currDate + 29 - 7);
              } else {
                prev = new Date(currYear, currMonth - 1 - 1, currDate + 28 - 7);
              }
            } else if (leapYear(currYear)) {
              prev = new Date(currYear, currMonth - 1 - 2, currDate + 29 + 31 - 30);
            } else {
              prev = new Date(currYear, currMonth - 1 - 2, currDate + 28 + 31 - 30);
            }
            break;
        }
      }
      break;
    case 90:
      switch (currMonth) {
        case 1:
          if (currDate + 31 + 30 > 90) {
            prev = new Date(currYear, 11 - 1, currDate + 30 + 31 - 90);
          } else {
            prev = new Date(currYear, 10 - 1, currDate + 31 + 30 + 31 - 90);
          }
          break;
        case 2:
          if (currDate + 31 + 31 > 90) {
            prev = new Date(currYear, 12 - 1, currDate + 31 + 31 - 90);
          } else {
            prev = new Date(currYear, 11 - 1, currDate + 31 + 31 + 30 - 90);
          }
          break;
        case 3:
          if (leapYear(currYear)) {
            if (currDate + 29 + 31 > 90) {
              prev = new Date(currYear, 1 - 1, currDate + 31 + 29 - 90);
            } else {
              prev = new Date(currYear, 12 - 1, currDate + 29 + 31 + 31 - 90);
            }
          } else {
            prev = new Date(currYear, 12 - 1, currDate + 28 + 31 + 31 - 90);
          }
          break;
        case 4:
          if (leapYear(currYear)) {
            prev = new Date(currYear, 1 - 1, currDate + 31 + 29 + 31 - 90);
          } else {
            prev = new Date(currYear, 1 - 1, currDate + 31 + 28 + 31 - 90);
          }
          break;
        case 5:
          if (currDate + 30 + 31 > 90) {
            prev = new Date(currYear, 3 - 1, currDate + 30 + 31 - 90);
          } else if (leapYear(currYear)) {
            prev = new Date(currYear, 2 - 1, currDate + 30 + 31 + 29 - 90);
          } else {
            prev = new Date(currYear, 2 - 1, currDate + 30 + 31 + 28 - 90);
          }
          break;
        case 6:
          if (currDate + 31 + 30 > 90) {
            prev = new Date(currYear, 4 - 1, currDate + 31 + 30 - 90);
          } else {
            prev = new Date(currYear, 3 - 1, currDate + 31 + 30 + 31);
          }
          break;
        case 7:
          if (currDate + 30 + 31 > 90) {
            prev = new Date(currYear, 5 - 1, currDate + 30 + 31 - 90);
          } else {
            prev = new Date(currYear, 4 - 1, currDate + 30 + 31 + 30 - 90);
          }
          break;
        case 8:
          if (currDate + 31 + 30 > 90) {
            prev = new Date(currYear, 6 - 1, currDate + 30 + 31 - 90);
          } else {
            prev = new Date(currYear, 5 - 1, currDate + 31 + 30 + 31 - 90);
          }
          break;
        case 9:
          if (currDate + 31 + 31 > 90) {
            prev = new Date(currYear, 7 - 1, currDate + 31 + 31 - 90);
          } else {
            prev = new Date(currYear, 6 - 1, currDate + 31 + 31 + 30 - 90) - 1;
          }
          break;
        case 10:
          if (currDate + 30 + 31 > 90) {
            prev = new Date(currYear, 8 - 1, currDate + 30 + 31 - 90);
          } else {
            prev = new Date(currYear, 7 - 1, currDate + 30 + 31 + 31 - 90);
          }
          break;
        case 11:
          if (currDate + 31 + 30 > 90) {
            prev = new Date(currYear, 9 - 1, currDate + 31 + 30 - 90);
          } else {
            prev = new Date(currYear, 8 - 1, currDate + 30 + 31 + 31 - 90);
          }
          break;
        case 12:
          if (currDate + 30 + 31 > 90) {
            prev = new Date(currYear, 10 - 1, currDate + 30 + 31 - 90);
          } else {
            prev = new Date(currYear, 9 - 1, currDate + 30 + 31 + 30 - 90);
          }
          break;
      }
      break;
    default:
      prev = null;
      break;
  }
  try {
    const list = await UserSchema.find({
      isTeacher: true
    });
    let result = [];
    list.forEach((item, index) => {
      let value = 0;
      item.contracts.forEach(v => {
        if (v.status === 2) {
          const temp = v.to.split('-');
          const vYear = +temp[0];
          const vMonth = +temp[1] - 1;
          const vDate = +temp[2];
          const tempDate = new Date(vYear, vMonth, vDate);
          if (tempDate >= prev && tempDate <= present) {
            value += v.hourRate * v.totalHourCommit;
          }
        }
      });
      result.push({
        user: item,
        value
      });
    });
    for (let i = 0; i < result.length - 1; i += 1) {
      for (let j = i + 1; j < result.length; j += 1) {
        if (result[i].value < result[j].value) {
          const temp = result[i].value;
          result[i] = result[j];
          result[j] = temp;
        }
      }
    }
    result = result.slice(0, 9);
    return res.json({
      result
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'Something went wrong!'
    });
  }
};