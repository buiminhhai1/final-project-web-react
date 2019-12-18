const mongoose = require('mongoose');
const LevelEducationModel = require('../model/levelEducationModel');

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

exports.addLevelEducation = async (req, res, next) => {
  const {
    title
  } = req.body;

  try {
    const isLevel = await LevelEducationModel.findOne({
      title
    });
    if (!!isLevel) {
      return res.json({
        err: `Cannot create new level: ${title}`,
        message: `level ${title} has already exsting!`
      });
    }
    const newLevel = new LevelEducationModel({
      _id: new mongoose.Types.ObjectId(),
      title
    });
    const result = await newLevel.save();
    if (!!result) {
      return res.json({
        level: result,
        message: 'create level has scucces'
      });
    }
  } catch (err) {
    return res.json({
      message: 'create level has failled',
      err
    });
  }
};

exports.updateLevelEducation = async (req, res, next) => {
  const {
    _id,
    title
  } = req.body;
  try {
    const updateLevel = await LevelEducationModel.findById({
      _id,
    });
    if (!!updateLevel) {
      updateLevel.title = title;
      const result = await updateLevel.save();
      return res.json({
        level: result,
        message: 'level have updated'
      });
    }
  } catch (err) {
    return res.json({
      message: 'updated level has failled',
      err
    });
  }
};

exports.deleteLevelEducation = async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const result = await LevelEducationModel.deleteOne({
      _id: id
    });
    if (!!result) {
      return res.json({
        level: result,
        message: 'level has deleted'
      });
    }
  } catch (err) {
    return res.json({
      message: 'delete level has failled!',
      err
    });
  }
};