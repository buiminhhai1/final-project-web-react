const {
  GroupChatModel,
  MessageModel
} = require('../model/groupChatModel');

const UserModdel = require('../../users/model/userModel');

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

exports.newGroupChat = async (req, res, next) => {
  const {
    idUser1,
    idUser2,
    idUser,
    message
  } = req.body;
  try {
    const results = await GroupChatModel.findOne({
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

    if (!!results) {
      res.json({
        result: false,
        message: 'Something wrong'
      });
    } else {
      const newGroupChat = new GroupChatModel({
        groupInfo: {
          idUser1,
          idUser2
        }
      });
      await newGroupChat.save();
      const newMessage = new MessageModel({
        idGroup: newGroupChat._id,
        idUser,
        message
      });
      await newMessage.save();
      newGroupChat.lastMessage = {
        message: newMessage,
        seen: {
          isSeen: false
        }
      };
      await newGroupChat.save();
      res.json({
        result: true,
        newGroupChat
      });
    }
  } catch (error) {
    res.json({
      result: false,
      message: 'Something wrong'
    });
  }
};

exports.newMessage = async (req, res, next) => {
  const {
    idGroup,
    idUser,
    message
  } = req.body;
  try {
    const group = await GroupChatModel.findOne({
      _id: idGroup
    });
    if (!!group) {
      const newMessage = new MessageModel({
        idGroup,
        idUser,
        message
      });
      newMessage.save().then(async result => {
        if (!!result) {
          if (!group.groupInfo.active) group.groupInfo.active = true;
          group.lastMessage = {
            message: newMessage,
            seen: {
              isSeen: false
            }
          };
          await group.save();
          res.json(result);
        }
        return res.json({
          message: 'Something wrong'
        });
      });
    } else {
      res.json({
        message: 'Something wrong'
      });
    }
  } catch (error) {
    res.json({
      message: 'Something wrong'
    });
  }
};

exports.saveNewMessage = async (idGroup, idUser, message) => {
  try {
    const group = await GroupChatModel.findOne({
      _id: idGroup
    });
    if (!!group) {
      const newMessage = new MessageModel({
        idGroup,
        idUser,
        message
      });
      newMessage.save().then(async result => {
        if (!!result) {
          if (!group.groupInfo.active) group.groupInfo.active = true;
          group.lastMessage = {
            message: newMessage,
            seen: {
              isSeen: false
            }
          };
          await group.save();
        }
      });
    }
  } catch (error) {
    console.log('cannot save message');
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