const {
  GroupChatModel,
  MessageModel
} = require('../../model/groupChatModel');

const UserModdel = require('../../../users/model/userModel');

exports.getListGroupChat = async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const results = await GroupChatModel.find({
      'groupInfo.active': true,
      $or: [{
        'groupInfo.idUser1': id
      }, {
        'groupInfo.idUser2': id
      }]
    });
    if (!!results) {
      return res.json(results);
    }
    return res.json({
      message: 'something wrong'
    });
  } catch (error) {
    res.json({
      message: 'something wrong',
      error
    });
  }
};

exports.getListMessages = async (req, res, next) => {
  const {
    idUser1,
    idUser2
  } = req.body;
  try {
    const group = await GroupChatModel.findOne({
      $or: [{
          'groupInfo.idUser1': idUser1,
          'groupInfo.idUser2': idUser2
        },
        {
          'groupInfo.idUser1': idUser2,
          'groupInfo.idUser2': idUser1
        }
      ]
    });
    const results = await MessageModel.find({
      idGroup: group._id
    });
    if (!!results) {
      return res.json(results);
    } else return res.json([]);
  } catch (error) {
    res.json([]);
  }
};