const constant = require('../const/constant');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
const facebookStrategy = require('passport-facebook-token');

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const UserModel = require('../../users/model/userModel');

require('dotenv').config();
const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;

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
    return UserModel.findById(jwtPayload._id)
      .then(user => {
        return cb(null, {
          message: 'success',
          user
        });
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
    return UserModel.findOne({ "local.email": email })
      .then(user => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }
        bcrypt.compare(password, user.local.password, (err, res) => { // so sánh mật khẩu (pass chưa hash và pash đã hash)
          if (res) { // mat khau dung
            return cb(null, user, { message: 'Sign in success' });
          }
          return cb(null, false, { message: 'Incorrect email or password.' });
        });
      })
      .catch(err => cb(err));
  }
);

// Facebook strategy
const facebook = new facebookStrategy({
  clientID: facebookClientId,
  clientSecret: facebookClientSecret
}, async (accessToken, refreshToken, profile, cb) => {
  // Check existed user
  UserModel.findOne({ "facebook.id": profile.id })
    .then(user => {
      if (user) {
        return cb(null, user, { message: 'Sign in success' });
      }

      // Create new account
      const newUser = new UserModel({
        method: 'facebook',
        facebook: {
          id: profile.id,
        },
        name: profile.displayName,
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value,
        isTeacher: false
      });
      newUser.save()
        .then(user => {
          return cb(null, user, { message: 'Sign in success' });
        })
        .catch(err => {
          cb(null, false, { message: err.errmsg });
        });
    })
    .catch(err => cb(err));
});

passport.use(jwt);
passport.use(local);
passport.use('facebook', facebook);
