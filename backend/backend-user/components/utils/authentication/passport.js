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

// const facebook = new FacebookStrategy({
//   clientID: constant.FACEBOOK_ID,
//   clientSecret: constant.FACEBOOK_SECRET,
//   callbackURL: "/user/facebook/callback",
//   profileFields: ['id', 'displayName', 'photos', 'email', 'gender']
// },
// async (accessToken, refreshToken, profile, done) => {
//   const { emails, displayName, photos, gender } = profile;
//   console.log(profile);
//   try {
//     const user = await UserModel.findOne({ email: emails[0].value });
//     if (user) {
//       let result = {
//         email: user.email,
//         name: user.name,
//         picture: user.picture,
//         gender: user.gender,
//       };
//       result = {...result, token: jwtExtension.encode(result, constant.JWT_SECRET)};
//       return done(null, result);
//     }
//     else {
//       const newUser = new UserModel({
//         _id: new mongoose.Types.ObjectId(),
//         email: emails[0].value,
//         gender: gender,
//         name: displayName,
//         picture: photos[0].value
//       });
//       const tempUser = await newUser.save();
//       const result = {
//         email: tempUser.email,
//         name: tempUser.name,
//         gender: tempUser.gender,
//         picture: tempUser.picture,
//       };
//       result = {...result, token: jwtExtension.encode(result, constant.JWT_SECRET)};
//       return done(null, result)
//     }
//   } catch (err) {
//     console.log(err);
//     return done(err);
//   }
// });

const jwt = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: constant.JWT_SECRET
},
(jwtPayload, cb) => {
  return UserModel.findById(jwtPayload.email)
    .then(user => {
      return cb(null, {
        message: 'get imformation about current user',
        email: user.email});
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
// passport.use(facebook);