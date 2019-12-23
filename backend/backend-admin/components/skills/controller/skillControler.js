const passport = require('passport');
const mongoose = require('mongoose');

const SkillModel = require('../model/skillModel');
const constant = require('../../utils/const/constant');

exports.getListSkillEnabled = async (req, res, next) => {

};

exports.getListSkill = async (req, res, next) => {
  // update get pagination
  console.log('test query');
  const {
    searchString
  } = req.query;
  let skills;
  try {
    if (searchString) {
      console.log('search with handle search string');
      skills = await SkillModel.findOne({
        title: searchString
      });
    } else {
      skills = await SkillModel.find({});
    }
    return res.json({
      skills
    });
  } catch (err) {
    return res.json({
      error: err
    });
  }
};

exports.addSkill = async (req, res, next) => {
  const {
    title
  } = req.body;

  try {
    const isSkill = await SkillModel.findOne({
      title
    });
    if (!!isSkill) {
      return res.json({
        err: `Cannot create new skill: ${title}`,
        message: `skill ${title} has already exsting!`
      });
    }
    const newSkill = new SkillModel({
      _id: new mongoose.Types.ObjectId(),
      title
    });
    const result = await newSkill.save();
    if (!!result) {
      return res.json({
        skill: result,
        message: 'create skill has scucces'
      });
    }
  } catch (err) {
    return res.json({
      message: 'create skill has failled',
      err
    });
  }
};

exports.updateSkill = async (req, res, next) => {
  const {
    _id,
    title
  } = req.body;
  try {
    const updateSkill = await SkillModel.findOne({
      _id,
    });
    if (!!updateSkill) {
      updateSkill.title = title;
      const result = await updateSkill.save();
      return res.json({
        skill: result,
        message: 'skill have updated'
      });
    }
  } catch (err) {
    return res.json({
      message: 'updated skill has failled',
      err
    });
  }
};

exports.deleteSkill = async (req, res, next) => {
  const {
    id
  } = req.params;

  try {
    const result = await SkillModel.deleteOne({
      _id: id
    });
    if (!!result) {
      return res.json({
        skill: result,
        message: 'skill has deleted'
      });
    }
  } catch (err) {
    return res.json({
      message: 'delete skill has failled!',
      err
    });
  }
};