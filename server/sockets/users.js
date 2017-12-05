const { User } = require('./../classes');

const users = {};

module.exports.addUser = (socket) => {
  const user = new User(socket);
  users[socket.hash] = user;
  return user;
};

module.exports.getUser = hash => users[hash];

module.exports.deleteUser = hash => delete users[hash];
