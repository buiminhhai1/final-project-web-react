const mongoose = require('mongoose');
const LevelEducationModel = require('../../model/levelEducationModel');

exports.getListlevelEnabled = async (req, res, next) => {

};

exports.getListLevelEducation = async (req, res, next) => {
  // update get pagination
  try {
    const levelEducations = await LevelEducationModel.find({});
    return res.json({
      levelEducations
    });
  } catch (err) {
    return res.json({
      error: err
    });
  }
};