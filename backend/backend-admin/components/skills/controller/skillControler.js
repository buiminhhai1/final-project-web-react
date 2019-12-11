const passport = require('passport');
const mongoose = require('mongoose');

const SkillModel = require('../model/skillModel');
const constant = require('../../utils/const/constant');

exports.getListSkillEnabled = async (req, res, next) => {

};

exports.getListSkill = async (req, res, next) => {
  // update get pagination
  try {
    const skills = await SkillModel.find();
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
    title,
    content
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
      title,
      content
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
    skillId,
    title,
    content
  } = req.body;
  try {
    const updateSkill = await SkillModel.findOne({
      _id: skillId,
      title
    });
    if (!!updateSkill) {
      updateSkill.title = title;
      updateSkill.content = content;
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
    skillId
  } = req.body;
  try {
    const result = SkillModel.deleteOne({
      _id: skillId
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