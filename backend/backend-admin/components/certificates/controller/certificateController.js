const passport = require('passport');
const mongoose = require('mongoose');

const CertificateModel = require('../model/certificateModel');
const constant = require('../../utils/const/constant');

exports.getListcertificateEnabled = async (req, res, next) => {

};

exports.getListCertificate = async (req, res, next) => {
  // update get pagination
  try {
    const certificates = await CertificateModel.find();
    return res.json({
      certificates
    });
  } catch (err) {
    return res.json({
      error: err
    });
  }
};

exports.addCertificate = async (req, res, next) => {
  const {
    name,
    description
  } = req.body;

  try {
    const isCertificate = await CertificateModel.findOne({
      name
    });
    if (!!isCertificate) {
      return res.json({
        err: `Cannot create new certificate: ${name}`,
        message: `certificate ${name} has already exsting!`
      });
    }
    const newCertificate = new CertificateModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      description
    });

    const result = await newCertificate.save();
    if (!!result) {
      return res.json({
        certificate: result,
        message: 'create certificate has scucces'
      });
    }
  } catch (err) {
    return res.json({
      message: 'create certificate has failled',
      err
    });
  }
};

exports.updateCertificate = async (req, res, next) => {
  const {
    certificateId,
    name,
    description
  } = req.body;
  try {
    const update = await CertificateModel.findOne({
      _id: certificateId
    });
    if (!!update) {
      update.name = name;
      update.description = description;
      const result = await update.save();
      return res.json({
        certificate: result,
        message: 'certificate have updated'
      });
    }
  } catch (err) {
    return res.json({
      message: 'updated certificate has failled',
      err
    });
  }
};

exports.deletecertificate = async (req, res, next) => {
  const {
    certificateId
  } = req.body;
  try {
    const result = CertificateModel.deleteOne({
      _id: certificateId
    });
    if (!!result) {
      return res.json({
        certificate: result,
        message: 'certificate has deleted'
      });
    }
  } catch (err) {
    return res.json({
      message: 'delete certificate has failled!',
      err
    });
  }
};