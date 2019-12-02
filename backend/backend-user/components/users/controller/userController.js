const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const UserModel = require('../model/userModel');
const constant = require('../../utils/const/constant');

exports.login = (req, res) => {
  passport.authenticate('local', {
    session: false
  }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login has failed!',
        user
      });
    }
    req.login(user, {
      session: false
    }, (error) => {
      if (!!error) {
        res.send(error);
      }
      const token = jwt.sign(user.toJSON(), constant.JWT_SECRET, {
        expiresIn: '15m'
      });
      const newUser = {
        name: user.name,
        gennder: user.gender,
        picture: user.picture,
        rule: user.rule
      };
      return res.json({
        user: newUser,
        token,
        expiresIn: 15 * 60
      });
    });
  })(req, res);
};

exports.register = async (req, res) => {
  const {
    email,
    password,
    name,
    gender,
    rule
  } = req.body;

  if (email.length === 0 || password.length === 0) {
    return res.json({
      message: 'Username or password must not null :))'
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
    bcrypt.getSalt(10, async (err, salt) => {
      if (!err) {
        bcrypt.hash(password, salt, async (error, hash) => {
          if (!error) {
            const newUser = new UserModel({
              email,
              name,
              password: hash,
              gender,
              rule
            });
            const result = await newUser.save();
            if (!!result) {
              return res.json({
                message: `Register user with email: ${email} successed!`
              });
            }
          }
        });
      }
    });
  } catch (err) {
    return res.json({
      message: 'something went wrong!'
    });
  }
};