const mongoose = require('mongoose');
const LocationModel = require('../model/locationModel');

module.exports.getListLocation = async (req, res, next) => {
  try {
    const locations = await LocationModel.find({});
    return res.json({
      locations,
      message: 'Get list lacaton has successed!'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'Get list location has failed!'
    });
  }
};

module.exports.addLocation = async (req, res, next) => {
  const {
    city,
    district
  } = req.body;
  try {
    const location = await LocationModel.findOne({
      city
    });
    if (location) {
      return res.json({
        error: 'Name location has exsting',
        message: 'Create location has failed!'
      });
    }
    const newLocation = new LocationModel({
      _id: new mongoose.Types.ObjectId(),
      city,
      district
    });
    await newLocation.save();
    return res.json({
      location: newLocation,
      message: 'Create location has successed!'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'create location has failed!'
    });
  }
};

module.exports.updateLocation = async (req, res, next) => {
  const {
    _id,
    city
  } = req.body;
  try {
    const location = await LocationModel.findById(_id);
    if (location) {
      location.city = city;
      await location.save();
      return res.json({
        location,
        message: 'update location has successed!'
      });
    } else {
      return res.json({
        error: 'Location not found!',
        message: 'update location has failed!'
      });
    }
  } catch (err) {
    return res.json({
      error: err,
      message: 'update location has failed!'
    });
  }
};

module.exports.deleteLocation = async (req, res, next) => {
  const {
    _id
  } = req.body;
  try {
    const result = await LocationModel.deleteOne({
      _id
    });
    if (result) {
      return res.json({
        message: 'delete location has success!',
        location: result
      });
    } else {
      return res.json({
        message: 'delete location has failed!',
        errror: 'Not found location'
      });
    }
  } catch (err) {
    return res.json({
      error: err,
      message: 'delete location has failed!'
    });
  }
};