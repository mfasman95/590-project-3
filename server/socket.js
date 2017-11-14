// #region Requires
const chalk = require('chalk');
const xxh = require('xxhashjs');
const _ = require('lodash');

// Add custom classes
const {
  Room,
  User,
  Message,
} = require('./classes');
// #endregion Requires

// #region Misc vars
const { log } = console;

// Create a reference to io, to be assigned when initSockets is called
let io;
// #endregion Misc vars

// #region Init Rooms/Users
// Initialize object for storing rooms
const startingRoom = new Room('**INIT_ROOM**');
const rooms = {};

// Initialize object for storing users
const users = {};
// #endregion Init Rooms/Users

// #region Emit Functions
// Build functions to emit to a single client
const emit = type => (socket, message) => {
  const { event, data, timestamp } = message;

  socket.emit('serverEmit', {
    type,
    event,
    data,
    timestamp,
  });
};
const genericEmit = emit('generic');
const reduxEmit = emit('redux');

// Build functions to emit to a full room
const emitToRoom = emitFunc => room => (message) => {
  for (let i = 0; i < room.currentOccupancy; i++) {
    const user = users[room.occupants[i].id];
    if (user) emitFunc(user.socket, message);
  }
};
// const genericEmitToRoom = emitToRoom(genericEmit);
const reduxEmitToRoom = emitToRoom(reduxEmit);
// #endregion Emit Functions

// #region Socket Handlers
const clientEmitHandler = (sock, eventData) => {
  const socket = sock;
  const { event, data } = eventData;

  // TODO: This just shows what data we are getting. Get rid of this later.
  log(data);

  switch (event) {
    default: { log(chalk.red(`Emit ${event} received from ${socket.hash} without a handler`)); }
  }
};

const handleConnect = (sock) => {
  const socket = sock;

  // Create a unique ID to reference this socket by
  const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);
  socket.hash = hash;

  // Store the user in the collection of all users
  users[hash] = new User(socket);

  // Add this user to the default room
  startingRoom.addUser(users[hash]);

  // Emit that the user joined to the client
  genericEmit(socket, new Message('joined', {}));

  // Make sure the initial room data being sent is valid for going over socket.io
  const roomsData = {};
  const roomKeys = Object.keys(rooms);
  for (let i = 0; i < roomKeys.length; i++) {
    const room = rooms[roomKeys[i]];
    roomsData[room.id] = _.pick(room, room.keysToPick);
  }

  // Send any necessary info for initiating the connection
  reduxEmit(socket, new Message('INIT', {
    rooms: roomsData,
    id: hash,
  }));
};

const handleDisconnect = (sock) => {
  const socket = sock;

  // Get the relevant user and room using information on the socket
  const user = users[socket.hash];
  const room = rooms[user.inRoom] || startingRoom;

  // Remove the user from the room they were in
  room.removeUser(user);

  // Delete this user from the collection of users
  delete users[socket.hash];
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
