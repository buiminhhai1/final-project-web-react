<<<<<<< HEAD
const constant = require('../const/constant');
const passport = require('passport');
const jwtExtension = require('jwt-simple');
const passportJWT = require("passport-jwt");
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
// const passportFacebook = require('passport-facebook');
const LocalStrategy = passportLocal.Strategy;
// const FacebookStrategy = passportFacebook.Strategy;
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserModel = require('../../users/model/userModel');
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const jwt = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: constant.JWT_SECRET
},
(jwtPayload, cb) => {
  return UserModel.findOne({'email':jwtPayload.email})
    .then(user => {
      return cb(null, {
        message: 'success',
        user: user});
    })
    .catch(err => {
      return cb(err);
    });
  }
);
const local = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
(email, password, cb) => {
  return UserModel.findOne({ email})
    .then(user => {
      if (!user) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      bcrypt.compare(password, user.password, (err, res) => { // so sánh mật khẩu (pass chưa hash và pash đã hash)
        if (res) { // mat khau dung
          return cb(null, user, { 'message': 'Đăng nhập thành công' });
        }
        return cb(null, false, { message: 'Incorrect email or password.' });
      });
    })
    .catch(err => cb(err));
  }
);
passport.use(jwt);
passport.use(local);
=======
const passport = require('passport');
const passportJWT = require('passport-jwt');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');

const constant = require('../const/constant');
const UserModel = require('../../users/model/user');

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

passport.serializeUser((user, done) => {
  done(null, user);
});

const jwt = new JWTStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: constant.JWT_SECRET,
  },
  async (jwtPayload, cb) => {
    try {
      const user = await UserModel.findById(jwtPayload._id);
      if (!!user) {
        return cb(null, {
          message: 'Get information about current user',
          email: user.email,
          name: user.name,
          picture: user.picture,
          gender: user.gender,
          role: user.role,
        });
      }
      return null;
    } catch (err) {
      return cb(err);
    }
  });

const local = new LocalStrategy({
    nameField: 'email',
    passwordField: 'password'
  },
  async (email, password, cb) => {
    try {
      const user = UserModel.findOne({
        email
      });
      if (!!user) {
        bcrypt.compare(password, user.password, (err, res) => {
          if (!!res) {
            return cb(null, user, {
              message: 'Login successed!'
            });
          }
        });
      } else {
        return cb(null, false, {
          message: 'Incorrect Email or password.'
        });
      }
    } catch (err) {
      cb(err);
    }
  });

passport.use(jwt);
passport.use(local);
>>>>>>> 29d0b24b903ecc789d3f2f30e4d8d54b54d5b962
