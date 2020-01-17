const mongoose = require('mongoose');
const LocationModel = require('../../model/locationModel');

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