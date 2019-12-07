const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const UserModel = require('../model/userModel');
const constant = require('../../utils/const/constant');

exports.login = (req, res, next) => {
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
  })(req, res, next);
};

exports.register = async (req, res) => {
  const {
    email,
    password,
    name,
    gender,
    role
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
    const saltValue = await bcrypt.genSalt(10);

    bcrypt.hash(password, saltValue, async (error, hash) => {
      if (!error) {
        const newUser = new UserModel({
          email,
          name,
          password: hash,
          gender,
          role
        });
        const result = await newUser.save();
        if (!!result) {
          return res.json({
            message: `Register user with email: ${email} successed!`
          });
        }
      }
    });

  } catch (err) {
    return res.json({
      message: 'something went wrong!'
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

  if (email.length === 0 || token.length === 0 || role.length === 0 || name.length === 0) {
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
    const token = jwt.sign(user.toJSON(), constant.JWT_SECRET, {
      expiresIn: '15m'
    });
    const newUser = {
      name: user.name,
      email: user.email,
      role: user.role
    };
    return res.json({
      user: newUser,
      token,
      expiresIn: 15 * 60
    });
  } else {
    return res.json({
      message: 'something went wrong!'
    });
  }
};