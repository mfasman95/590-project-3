// #region Requires
const xxh = require('xxhashjs');
const _ = require('lodash');

const { reduxEmit, genericEmit } = require('./emit');
const { clientEmitHandler } = require('./clientEventHandler');
const { Room, User, Message } = require('./../classes');
const { addUser, getUser, deleteUser } = require('./users');
// #endregion Requires

// Create a reference to io, to be assigned when initSockets is called
let io;
// #endregion Misc vars

// #region Init Rooms/Users
// Initialize object for storing rooms
const startingRoom = new Room('**INIT_ROOM**');
const rooms = {};
// #endregion Init Rooms/Users

// #region Socket Handlers
const handleConnect = (sock) => {
  const socket = sock;

  // Create a unique ID to reference this socket by
  const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);
  socket.hash = hash;

  // Store the user in the collection of all users
  const newUser = addUser(socket);

  // Add this user to the default room
  startingRoom.addUser(newUser);

  // Emit that the user joined to the client
  genericEmit(new Message('joined', {}))(socket);

  // Make sure the initial room data being sent is valid for going over socket.io
  const roomsData = {};
  const roomKeys = Object.keys(rooms);
  for (let i = 0; i < roomKeys.length; i++) {
    const room = rooms[roomKeys[i]];
    roomsData[room.id] = _.pick(room, room.keysToPick);
  }

  // Send any necessary info for initiating the connection
  reduxEmit(new Message('INIT', {
    id: hash,
  }))(socket);
};

const handleDisconnect = (sock) => {
  const socket = sock;

  // Get the relevant user and room using information on the socket
  const user = getUser(socket.hash);
  const room = rooms[user.inRoom] || startingRoom;

  // Remove the user from the room they were in
  room.removeUser(user);

  // Delete this user from the collection of users
  deleteUser(socket.hash);
};
// #endregion Socket Handlers

module.exports = Object.freeze({
  initSockets: (ioServer) => {
    // Store an instance of our websocket server
    io = ioServer;

    io.on('connection', (sock) => {
      const socket = sock;

      handleConnect(socket);
      socket.on('clientEmit', data => clientEmitHandler(socket, data));
      socket.on('disconnect', () => handleDisconnect(socket));
    });
  },
});
