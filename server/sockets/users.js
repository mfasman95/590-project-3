const { User } = require('./../classes');

const users = {};

module.exports.addUser = (socket) => {
  const user = new User(socket);
  users[socket.hash] = user;
  return user;
};

module.exports.getUser = hash => users[hash];

module.exports.getUserByDBID = (id) => {
  const userKeys = Object.keys(users);

  let retUser = null;

  console.log(userKeys);
  for (let i = 0; i < userKeys.length; i++) {
    const user = users[userKeys[i]];

    // If the user has disconnected while this function is running, skip past them
    if (!user) continue;

    console.log(user.userRowId, id);
    // Check if this is the user you are looking for
    if (user.userRowId === id) {
      retUser = user;
      // Shortcut when the user is found
      break;
    }
  }

  return retUser;
};

module.exports.deleteUser = hash => delete users[hash];
