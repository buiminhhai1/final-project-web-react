const mongoose = require('mongoose');
const LevelModel = require('../../model/levelModel');

exports.getListlevelEnabled = async (req, res, next) => {

};

exports.getListLevel = async (req, res, next) => {
  // update get pagination
  try {
    const levels = await LevelModel.find();
    return res.json({
      levels
    });
  } catch (err) {
    return res.json({
      error: err
    });
  }
};