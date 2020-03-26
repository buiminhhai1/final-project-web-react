const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');

const AdminModel = require('../../model/adminModel');
const constant = require('../../../utils/const/constant');

exports.getDetailUser = (req, res, next) => {
  res.json(req.user);
};