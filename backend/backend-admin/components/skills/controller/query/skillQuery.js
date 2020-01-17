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
