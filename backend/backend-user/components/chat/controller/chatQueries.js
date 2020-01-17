const GroupChatModel = require('../model/groupChatModel').GroupChatModel;
const MessageModel = require('../model/groupChatModel').MessageModel;

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
      // results.forEach(e=>{
      // if(!!e.lastMessage){
      //     // e['name'] = UserModdel.findOne
      // }
      // })
      return res.json(results);
    } else return res.json({
      message: 'something wrong'
    });
  } catch (error) {
    // console.log('error');
    res.json({
      message: 'something wrong'
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