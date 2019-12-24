const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const UserModel = require('../model/userModel');
const constant = require('../../utils/const/constant');

// Use for google login
const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2();

const cloudinary = require('cloudinary').v2;
const {
  sendEmail
} = require('../../utils/email/sendEmail');

exports.register = async (req, res) => {
  const {
    email,
    password,
    name
  } = req.body;
  if (email.length === 0 || password.length === 0) {
    return res.json({
      message: 'Username or password must not null :))'
    });
  }

  try {
    const user = await UserModel.findOne({
      email: email
    });
    if (!!user) {
      return res.json({
        message: `Email ${email} has already exsit`
      });
    }
    // Create new account
    const saltValue = await bcrypt.genSalt(10);
    bcrypt.hash(password, saltValue, async (error, hash) => {
      if (!error) {
        const newUser = new UserModel({
          local: {
            password: hash
          },
          email,
          name,
          imageUrl: 'https://icon-library.net/images/bot-icon/bot-icon-18.jpg',
          method: 'local',
          isTeacher: false
        });
        const result = await newUser.save();
        if (!!result) {
          const {
            token,
            newUser
          } = getTokenAndUser(result);
          const message = {
            to: email,
            subject: 'Verify account',
            html: `<h2>Click a link below to verify your email</h2><a style='background-color:green;color:white;font-size:50px;text-decoration: none;padding:0px 50px;' href='http://localhost:4000/users/verify?id=${result._id}&successRedirectUrl=http://localhost:3000/logout&failureRedirectUrl=http://localhost:3000/'>Verify Email</a>`
          };
          sendEmail(message);
          return res.json({
            user: newUser,
            token,
            expiresIn: 1500 * 60
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

exports.login = (req, res, next) => {
  passport.authenticate(
    'local', {
      session: false
    },
    async (err, user, message) => {
      if (err || !user) {
        return res.json({
          message
        });
      }
      const {
        token,
        newUser
      } = getTokenAndUser(user);

      return res.json({
        user: newUser,
        token,
        expiresIn: 1500 * 60
      });
    }
  )(req, res, next);
};

exports.googleLogin = (req, res, next) => {
  const accessToken = req.body.accessToken;
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2'
  });

  oauth2.userinfo.get(async function (err, response) {
    if (err) {
      return res.json({
        message: 'The access token is not correct'
      });
    } else {
      // If success
      const user = await registerForGoogleAccount(response.data);
      if (user) {
        const {
          token,
          newUser
        } = getTokenAndUser(user);
        return res.json({
          user: newUser,
          token,
          expiresIn: 1500 * 60
        });
      }
    }
  });
};

registerForGoogleAccount = async user => {
  /*user: {
      id: string,
      email: string,
      verified_email: boolean,
      name: string,
      given_name: string,
      family_name: string,
      picture: url_string,
      locale: string
  }*/
  const findUser = await UserModel.findOne({
    'google.id': user.id
  });
  if (!!findUser) {
    return findUser;
  } else {
    // Create new user if google user not existed in db
    const newUser = new UserModel({
      google: {
        id: user.id
      },
      email: user.email,
      name: user.name,
      imageUrl: user.picture,
      method: 'google',
      isTeacher: false,
      verify: true
    });
    const result = await newUser.save();
    if (!!result) {
      return result;
    } else {
      return null;
    }
  }
};

getTokenAndUser = user => {
  const token = jwt.sign(user.toJSON(), constant.JWT_SECRET, {
    expiresIn: '1500m'
  });

  let newUser = {
    userId: user._id,
    imageUrl: user.imageUrl,
    isTeacher: user.isTeacher,
    name: user.name,
    email: user.email,
    verify: user.verify,
    isBlocking: user.isBlocking
  };

  return {
    token,
    newUser
  };
};

exports.getUser = async (req, res, next) => {
  const {
    userId
  } = req.query;

  try {
    const user = await UserModel.findById(userId);
    if (!!user) {
      const teacher = {
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        location: user.location,
        experience: user.experience,
        status: user.status,
        contracts: user.contracts,
        totalScore: user.totalScore
      };
      res.json({
        teacher
      });
    } else {
      return res.json({
        message: 'something wrong'
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: 'something wrong'
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const {
    user
  } = req.user;
  if (!!user) {
    user.contact.address.city = req.body.location.city;
    user.contact.address.district = req.body.location.district.name;
    user.contact.address.street = req.body.address;
    user.contact.phone = req.body.phone;
    user.name = req.body.name;
    // Update user
    user
      .save()
      .then(updatedUser => {
        const {
          token,
          newUser
        } = getTokenAndUser(updatedUser);
        return res.json({
          user: newUser,
          token,
          expiresIn: 1500 * 60
        });
      })
      .catch(err => {
        return res.json({
          message: 'Something wrong happened'
        });
      });
  }
};

exports.updateTeacher = async (req, res, next) => {
  const {
    user
  } = req.user;
  if (!!user) {
    console.log('Body: ', req.body);
    user.isTeacher = true;
    user.experience.introduction.description = req.body.submitDescription;
    user.experience.level = req.body.submitLevel;
    user.experience.skill = req.body.submitSubjects;
    user.experience.educationLevel = req.body.submitEducationLevel;
    user.experience.location = req.body.submitLocation;
    user.status.hourRate = req.body.submitHourPay;
    user.status.timeCommit = req.body.submitHourWork;
    user.status.availability = true;
    user.status.isVisibility = true;
    user.totalScore = 0;

    // Update user
    user
      .save()
      .then(updatedUser => {
        const {
          token,
          newUser
        } = getTokenAndUser(updatedUser);
        return res.json({
          user: newUser,
          token,
          expiresIn: 1500 * 60
        });
      })
      .catch(err => {
        return res.json({
          message: 'Something wrong happened'
        });
      });
  } else res.status(400).json({
    message: 'Something wrong happened'
  });
};

exports.facebookLogin = (req, res, next) => {
  passport.authenticate(
    'facebook', {
      session: false
    },
    (err, user, message) => {
      if (err || !user) {
        return res.json({
          message
        });
      }
      const {
        token,
        newUser
      } = getTokenAndUser(user);
      return res.json({
        user: newUser,
        token,
        expiresIn: 1500 * 60
      });
    }
  )(req, res, next);
};

exports.uploadImage = (req, res, next) => {
  const {
    image,
    idUser
  } = req.body;

  cloudinary.uploader.upload(image).then(async results => {
    try {
      const user = await UserModel.findOne({
        _id: idUser
      });
      if (!!user) {
        user.imageUrl = results.url;
        user.save().then(user => {
          if (!!user) res.json(user);
          else res.json({
            message: 'cannot update image'
          });
        });
      } else {
        res.json({
          message: 'cannot update'
        });
      }
    } catch (error) {
      res.json({
        message: 'cannot update'
      });
    }
  });
};

exports.verifyUser = async (req, res, next) => {
  const {
    id,
    successRedirectUrl,
    failureRedirectUrl
  } = req.query;
  try {
    const user = await UserModel.findOne({
      _id: id
    });
    if (!!user) {
      user.verify = true;
      user.save().then(user => {
        if (!!user) res.redirect(successRedirectUrl);
        else res.redirect(failureRedirectUrl);
      });
    } else res.redirect(failureRedirectUrl);
  } catch (error) {
    res.redirect(failureRedirectUrl);
  }
};

exports.changePassword = async (req, res, next) => {
  const {
    idUser,
    currentPassword,
    newPassword
  } = req.body;
  try {
    const user = await UserModel.findOne({
      _id: idUser
    });

    if (!!user) {
      bcrypt.compare(
        currentPassword,
        user.local.password,
        async (err, resp) => {
          // so sánh mật khẩu (pass chưa hash và pash đã hash)
          if (resp) {
            const saltValue = await bcrypt.genSalt(10);
            bcrypt.hash(newPassword, saltValue, async (error, hash) => {
              if (!error) {
                user.local.password = hash;
                user.save().then(user => {
                  if (!!user) {
                    res.json({
                      result: true,
                      message: 'change password success'
                    });
                  } else
                    res.json({
                      result: false,
                      message: 'cannot change password'
                    });
                });
              } else
                res.json({
                  result: false,
                  message: 'cannot change password'
                });
            });
          } else res.json({
            result: false,
            message: 'cannot change password'
          });
        }
      );
    } else res.json({
      result: false,
      message: 'cannot change password'
    });
  } catch (err) {
    res.json({
      message: 'cannot change password'
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  const {
    idUser,
    newPassword
  } = req.body;
  try {
    const user = await UserModel.findOne({
      _id: idUser
    });

    if (!!user) {
      const saltValue = await bcrypt.genSalt(10);
      bcrypt.hash(newPassword, saltValue, async (error, hash) => {
        if (!error) {
          user.local.password = hash;
          user.save().then(user => {
            if (!!user) {
              res.json({
                result: true,
                message: 'Reset password success'
              });
            } else res.json({
              result: false,
              message: 'Reset password error'
            });
          });
        } else res.json({
          result: false,
          message: 'Reset password error'
        });
      });
    } else res.json({
      result: false,
      message: 'Reset password error'
    });
  } catch (error) {
    res.json({
      result: false,
      message: 'Reset password error'
    });
  }
};

exports.sendEmailResetPassword = async (req, res, next) => {
  const {
    email
  } = req.body;
  console.log(email);

  try {
    const user = await UserModel.findOne({
      email: email
    });
    if (!!user) {
      const message = {
        to: email,
        subject: 'Reset password',
        html: `<h2>Click a link below to reset your password</h2><a style='background-color:green;color:white;font-size:50px;text-decoration: none;padding:0px 50px;' href='http://localhost:3000/resetpassword?id=${user._id}'>Reset password</a>`
      };
      sendEmail(message);
      res.json({
        result: true,
        message: 'send email success'
      });
    } else res.json({
      result: false,
      message: 'send email error'
    });
  } catch (error) {
    res.json({
      result: false,
      message: 'send email error'
    });
  }
};