const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtExtension = require('jwt-simple');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passportFacebook = require('passport-facebook');
const constant = require('../const/constant');
const UserModel = require('../../users/model/userModel');

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const facebook = new FacebookStrategy({
    clientID: constant.FACEBOOK_APP_ID,
    clientSecret: constant.FACEBOOK_APP_SECRET,
    callbackURL: '/admin/facebook/redirect',
    profileFields: ['id', 'email', 'name', 'picture']
  },
  (accessToken, refreshToken, profile, done) => {
    const {
      email,
      name,
      picture
    } = profile;
    UserModel.findOne({
        email,
        type: 'facebook'
      })
      .then(user => {
        if (user) {
          let tempUser = {
            email: user.email,
            name: user.name,
            picture: user.picture,
            type: user.type,
          };
          tempUser = {
            ...tempUser,
            token: jwtExtension.encode(tempUser, constant.JWT_SECRET)
          };
          return done(null, tempUser);
        } else {
          const newUser = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            email,
            name,
            picture,
          });
          newUser.save()
            .then(result => {
              let tempUser = {
                email: result.email,
                name: result.name,
                type: result.type,
                picture: result.picture
              };
              tempUser = {
                ...tempUser,
                token: jwtExtension.encode(tempUser, constant.JWT_SECRET)
              };
              done(null, tempUser);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(error => {
        return done(error);
      });
  });

const jwt = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: constant.JWT_SECRET
  },
  (jwtPayload, cb) => {
    return UserModel.findById(jwtPayload._id)
      .then(user => {
        return cb(null, {
          message: 'get imformation about current user',
          email: user.email
        });
      })
      .catch(err => {
        return cb(err);
      });
  });

const local = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, cb) => {
    return UserModel.findOne({
        email
      })
      .then(user => {
        if (!user) {
          return cb(null, false, {
            message: 'Incorrect email or password.'
          });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // mat khau dung
            return cb(null, user, {
              message: 'Đăng nhập thành công'
            });
          }
          return cb(null, false, {
            message: 'Sai thông tin đăng nhập'
          });
        });
      })
      .catch(err => cb(err));
  });



passport.use(jwt);
passport.use(local);
passport.use(facebook);