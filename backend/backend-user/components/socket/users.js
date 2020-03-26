const users = [];

const addUser = ({ idSocket,idUser }) => {
  const user = { idSocket,idUser };
  users.push(user);
  return { user };
}

const removeUserBySocketId = (id) => {
  const index = users.findIndex((user) => user.idSocket === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUserBySocketId = (id) => users.find((user) => user.idSocket === id);
const getUserById = (id) => users.find((user) => user.idUser === id);

module.exports = { addUser, removeUserBySocketId, getUserById,getUserBySocketId};