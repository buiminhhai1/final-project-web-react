const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const UserModel = require('../model/userModel');
const ProfileModel = require('../model/profileModel');
const constant = require('../../utils/const/constant');

// Use for google login
const google = require('googleapis').google;
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2();

const cloudinary = require('cloudinary').v2
exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  if (email.length === 0 || password.length === 0) {
    return res.json({
      message: 'Username or password must not null :))'
    });
  }

  try {
    const user = await UserModel.findOne({
      "local.email": email
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
            email,
            name,
            password: hash,
          },
          imageUrl: "https://icon-library.net/images/bot-icon/bot-icon-18.jpg",
          method: 'local',
          isTeacher: false
        });
        const result = await newUser.save();
        if (!!result) {
          const newProfile = new ProfileModel({idUser:result._id,avatar:result});
          newProfile.save();
          const { token, newUser } = getTokenAndUser(result);
          return res.json({
            user: newUser,
            token,
            expiresIn: 15 * 60
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
  passport.authenticate('local', { session: false }, async(err, user, message) => {
    if (err || !user) {
      return res.status(400).json({
        message,
      });
    }
    const { token, newUser } = getTokenAndUser(user);
    const profile = await ProfileModel.findOne({
      "idUser": user._id
    });
    return res.json({
      user: newUser,
      profile,
      token,
      expiresIn: 15 * 60
    });
  })(req, res, next);
};

exports.googleLogin = (req, res, next) => {
  const accessToken = req.body.accessToken;
  oauth2Client.setCredentials({ access_token: accessToken });

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2'
  });

  oauth2.userinfo.get(
    async function (err, response) {
      if (err) {
        return res.json({
          message: "The access token is not correct",
        });
      } else {  // If success
        const user = await registerForGoogleAccount(response.data);
        if (user) {
          const newProfile = new ProfileModel({idUser:user._id,
                              avatar:user.imageUrl,
                              name:user.google.name});
          newProfile.save();
          const { token, newUser } = getTokenAndUser(user);
          return res.json({
            profile:newProfile,
            user: newUser,
            token,
            expiresIn: 15 * 60
          });
        }
      }
    });
};

registerForGoogleAccount = async (user) => {
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
    "google.id": user.id
  });
  if (!!findUser) {
    return findUser;
  }
  else {
    // Create new user if google user not existed in db
    const newUser = new UserModel({
      google: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      imageUrl: user.picture,
      method: 'google',
      isTeacher: false
    });
    const result = await newUser.save();
    if (!!result) {
      return result;
    } else {
      return null;
    }
  }
}

getTokenAndUser = (user) => {
  const token = jwt.sign(user.toJSON(), constant.JWT_SECRET, {
    expiresIn: '15m'
  });

  let newUser = {
    userId: user._id,
    imageUrl: user.imageUrl,
    isTeacher: user.isTeacher
  };
  switch (user.method) {
    case "local": {
      newUser.name = user.local.name;
      newUser.email = user.local.email;
      break;
    }
    case "google": {
      newUser.name = user.google.name;
      newUser.email = user.google.email;
      break;
    }
    case "facebook": {
      newUser.name = user.facebook.name;
      newUser.email = user.facebook.email;
    }
  }

  return { token, newUser };
}

exports.getUser = async (req, res, next) => {
  const { idUser } = req.query;
  const profile = await ProfileModel.findOne({
    "idUser": idUser
  });
  if (!!profile) {
    return res.json(profile);
  } else return res.json({ message: "something wrong" });
};

exports.updateUser = async (req, res, next) => {
  const { idUser, name, location, avatar, skills, about, price } = req.body;
  const profile = await ProfileModel.findOne({
    "idUser": idUser
  });
  if (!!profile) {
    profile.name = name;
    profile.location = location;
    profile.avatar = avatar;
    profile.skills = skills;
    profile.about = about;
    profile.price = price;
    profile.save().then(item => {
      return res.json(profile);
    })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  } else return res.json({ message: "User cannot find" });
};

exports.facebookLogin = (req, res, next) => {
  passport.authenticate('facebook', { session: false }, (err, user, message) => {
    if (err || !user) {
      return res.json({
        message,
      });
    }
    const { token, newUser } = getTokenAndUser(user);
    return res.json({
      user: newUser,
      token,
      expiresIn: 15 * 60
    });
  })(req, res, next);
};

exports.upimage = (req, res,next) => {
  const {image,idUser} = req.body;
  
  cloudinary.uploader.upload(image).then(async(results)=>{
    const profile = await ProfileModel.findOne({
      idUser
    });
    profile.avatar = results.url;
    profile.save().then(profile=> {
      if(!!profile) res.json(profile);
      else res.json({message:"cannot save image"})
    })
    
  });
  };

