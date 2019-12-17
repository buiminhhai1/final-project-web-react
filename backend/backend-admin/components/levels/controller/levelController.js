const mongoose = require('mongoose');
const LevelModel = require('../model/levelModel');

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

exports.addLevel = async (req, res, next) => {
  const {
    title
  } = req.body;

  try {
    const isLevel = await LevelModel.findOne({
      title
    });
    if (!!isLevel) {
      return res.json({
        err: `Cannot create new level: ${title}`,
        message: `level ${title} has already exsting!`
      });
    }
    const newLevel = new LevelModel({
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

exports.updateLevel = async (req, res, next) => {
  const {
    _id,
    title
  } = req.body;
  try {
    const updateLevel = await LevelModel.findById({
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

exports.deleteLevel = async (req, res, next) => {
  console.log(req.params);
  const {
    id
  } = req.params;
  console.log(id);
  try {
    const result = await LevelModel.deleteOne({
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