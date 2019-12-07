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

  console.log(email+" " + password);
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
