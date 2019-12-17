var count = 0;
var users = require('./users');

exports.init = (server) => {
  io = require('socket.io')(server);
  io.on('connection', function (socket) {
    socket.on('join',({idGroup,idUser})=>{
      users.addUser({id:socket.id,idUser,idGroup});
      socket.join(idGroup);
    });
    socket.on('sendMessage', function (message,callback) {
      const user = users.getUser(socket.id);
      console.log(message);
      io.to(user.idGroup).emit('message', {user:user.idUser,text:message});
      callback();
    });

    socket.on('disconnect', () => {
    })
  });
}