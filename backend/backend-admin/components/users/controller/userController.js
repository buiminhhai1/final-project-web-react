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

exports.facebookLogin = async (req, res, next) => {
  const {
    email,
    name,
    picture,
    id,
    accessToken
  } = req.body;
  if (!accessToken) {
    return res.json({
      error: 'Cannot signing with Facebook!'
    });
  }
  try {
    const isUser = await UserModel.findOne({
      email
    });
    if (!!isUser) {
      if (!isUser.idFacebook) {
        isUser.idFacebook = id;
        await isUser.save();
      }
      res.json({
        user: isUser,
        token: accessToken,
        expiresIn: 15 * 60
      });
    } else {
      const newUser = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        idFacebook: id,
        email,
        name,
        picture,
      });
      await newUser.save();
      res.json({
        user: {
          userId: newUser._id,
          name: newUser.name,
          email: newUser.email,
          picture: newUser.picture
        },
        token: accessToken,
        expiresIn: 15 * 60
      });
    }
  } catch (err) {
    return res.json({
      err
    });
  }
};

exports.googleLogin = async (req, res, next) => {
  const {
    email,
    name,
    picture,
    id,
    accessToken
  } = req.body;
  if (!accessToken) {
    return res.json({
      error: 'Cannot signing with Facebook!'
    });
  }
  try {
    const isUser = await UserModel.findOne({
      email,
    });
    if (!!isUser) {
      if (!isUser.idGoogle) {
        isUser.idGoogle = id;
        await isUser.save();
      }
      res.json({
        user: isUser,
        token: accessToken,
        expiresIn: 15 * 60
      });
    } else {
      const newUser = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        idGoogle: id,
        email,
        name,
        picture,
      });
      await newUser.save();
      res.json({
        user: {
          userId: newUser._id,
          name: newUser.name,
          email: newUser.email,
          picture: newUser.picture
        },
        token: accessToken,
        expiresIn: 15 * 60
      });
    }
  } catch (err) {
    return res.json({
      err
    });
  }
};