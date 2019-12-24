const mongoose = require('mongoose');
const ContractModel = require('../model/contractModel');

exports.getListContract = async (req, res, next) => {
  try {
    const contracts = await ContractModel.find({});
    return res.json({
      contracts,
      message: 'get list contract successfull!'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'some thing went wrong!'
    });
  }
};