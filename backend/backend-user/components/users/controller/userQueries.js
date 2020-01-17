const jwt = require("jsonwebtoken");
const passport = require("passport");

const UserModel = require("../model/userModel");
const constant = require("../../utils/const/constant");

exports.login = (req, res, next) => {
  passport.authenticate(
    "local",
    {
      session: false
    },
    async (err, user, message) => {
      if (err || !user) {
        return res.json({
          message
        });
      }
      const { token, newUser } = getTokenAndUser(user);

      return res.json({
        user: newUser,
        token,
        expiresIn: 1500 * 60
      });
    }
  )(req, res, next);
};

getTokenAndUser = user => {
  const token = jwt.sign(user.toJSON(), constant.JWT_SECRET, {
    expiresIn: "1500m"
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
  const { userId } = req.query;

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
        message: "something wrong"
      });
    }
  } catch (error) {
    // console.log(error);
    res.json({
      message: "something wrong"
    });
  }
};

exports.facebookLogin = (req, res, next) => {
  passport.authenticate(
    "facebook",
    {
      session: false
    },
    (err, user, message) => {
      if (err || !user) {
        return res.json({
          message
        });
      }
      const { token, newUser } = getTokenAndUser(user);
      return res.json({
        user: newUser,
        token,
        expiresIn: 1500 * 60
      });
    }
  )(req, res, next);
};