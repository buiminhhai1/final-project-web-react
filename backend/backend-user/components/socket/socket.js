var count = 0;
var users = require('./users');
const GroupChatModel = require('../chat/model/groupChatModel').GroupChatModel;
const MessageModel = require('../chat/model/groupChatModel').MessageModel;
const chatController = require('../chat/controller/chatController');
const UserModdel = require('../users/model/userModel');


exports.init = (server) => {
  io = require('socket.io')(server);
  io.on('connection', function (socket) {
    socket.on('join', async ({ idUser }) => {
      users.addUser({ idSocket: socket.id, idUser });
      try {
        // 'groupInfo.active':true,
        const results = await GroupChatModel.find({
          $or: [
            { 'groupInfo.idUser1': idUser },
            { 'groupInfo.idUser2': idUser }]
        });
        Promise.all(results.map(async e=>{
          let toUser = e.groupInfo.idUser1;
          if(toUser==idUser) toUser=e.groupInfo.idUser2;
          const user = await UserModdel.findOne({_id: toUser});
          if(user){
            e = {'group':e,'user':user};
            return (e);
          }else{
            return (e);
          }
        })).then(data=>{
          console.log(data);
          io.to(socket.id).emit('groupData', data);
        })
        
      } catch (error) {
        console.log('Cannot get Group data');
      }
    });
    socket.on('sendMessage', function ({ idGroup, toIdUser, message }, callback) {
      const toUser = users.getUserById(toIdUser);
      const user = users.getUserBySocketId(socket.id);
      if(toUser)
        io.to(toUser.idSocket).emit('message', { user: user.idUser, message, group:idGroup });
      chatController.saveNewMessage(idGroup,user.idUser,message);
      callback();
    });

    socket.on('joinToGroup', async({ idGroup }) => {
      
      try {
        const results = await MessageModel.find({ idGroup});
        if (!!results) {
          io.to(socket.id).emit('messagesData',results);
        } else 
        console.log('messages error');

      } catch (error) {
        console.log('messages error');
      }
    })

    socket.on('disconnect', () => {
      users.removeUserBySocketId(socket.id);
    })
  });
}