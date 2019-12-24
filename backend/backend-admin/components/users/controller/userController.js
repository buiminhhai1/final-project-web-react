const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const UserSchema = require('../model/userModel');

const config = {
  mailserver: {
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: false,
    auth: {
      user: 'apikey',
      pass: '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'
    }
  },
  mail: {
    from: 'ngovietduc20088@gmail.com',
    to: 'ngovietduc20@gmail.com',
    subject: 'Hello',
    text: 'Testing Nodemailer'
  }
};

const sendMail = async ({
  mailserver,
  mail
}) => {
  const transporter = nodemailer.createTransport(mailserver);
  const info = await transporter.sendMail(mail);
  console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
};

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
      // await sgMail.send(msg);
      sendMail(config).catch(console.error);
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