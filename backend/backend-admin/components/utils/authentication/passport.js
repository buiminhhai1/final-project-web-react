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