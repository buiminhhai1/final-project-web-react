const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
const UserModel = require('../model/userModel');
const constant = require('../../utils/const/constant');

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    session: false
  }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Đăng nhập thất bại',
        user
      });
    }
    req.login(user, {
      session: false
    }, err2 => {
      if (err2) {
        res.json({
          message: 'Đăng nhập thất bại',
          user: ''
        });
      }
      const token = jwt.sign(user.toJSON(), constant.JWT_SECRET, {
        expiresIn: '15m'
      });
      const newUser = {
        userId: user._id,
        name: user.name
      };
      return res.json({
        user: newUser,
        token,
        expiresIn: 15 * 60
      });
    });
  })(req, res);
};

exports.register = async (req, res, next) => {
  const {
    email,
    password,
    name
  } = req.body;

  if (email.length === 0 || password.length === 0) {
    res.json({
      message: 'Thông tin người dùng không được để trống'
    });
  }

  try {
    const resultUser = await UserModel.findOne({
      email
    });
    if (resultUser) {
      return res.json({
        message: `email: ${email} đã tồn tại`,
        email: ''
      });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err1, hash) => {
          const user = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            email,
            name,
            password: hash
          });

          user
            .save()
            .then(result => {
              if (!!result) {
                return res.json({
                  email,
                  message: `Đăng kí email: ${email} thành công!`
                });
              }
            })
            .catch(error1 => {
              res.json({
                message: `something wrong! ${error1}`
              });
            });
        });
      });
    }
  } catch (error) {
    res.json({
      message: `some thing went wrong ${error}`
    });
  }
};

exports.OAuthRegister = async (req, res) => {
  const {
    email,
    token,
    name,
    role
  } = req.body;

  if (
    email.length === 0 ||
    token.length === 0 ||
    role.length === 0 ||
    name.length === 0
  ) {
    return res.json({
      message: 'Something wrong'
    });
  }
  try {
    const user = await UserModel.findOne({
      email
    });
    if (!!user) {
      return res.json({
        message: `email: ${email} has already exsit`
      });
    }

    const newUser = new UserModel({
      email,
      name,
      role
    });
    const result = await newUser.save();
    if (!!result) {
      return res.json({
        message: `Register user with email: ${email} successed!`
      });
    }
  } catch (err) {
    return res.json({
      message: 'something went wrong!'
    });
  }
};

exports.OAuthLogin = async (req, res, next) => {
  const {
    email,
    token,
    name,
    role
  } = req.body;

  const user = await UserModel.findOne({
    email
  });

  if (!!user) {
    const tokenResult = jwt.sign(user.toJSON(), constant.JWT_SECRET, {
      expiresIn: '15m'
    });
    const newUser = {
      name: user.name,
      email: user.email,
      role: user.role
    };
    return res.json({
      user: newUser,
      tokenResult,
      expiresIn: 15 * 60
    });
  }

  res.json({
    message: 'something went wrong!'
  });
};