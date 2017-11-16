const users = require('./users');
const xxh = require('xxhashjs');

const generateCSRF = (sock) => {
  const socket = sock;

  const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);
  socket.csrf = hash;

  return hash;
};

// Build functions to emit to a single client
const emit = type => (socket, message) => {
  const { event, data, timestamp } = message;

  socket.emit('serverEmit', {
    type,
    event,
    data,
    timestamp,
    csrf: generateCSRF(socket),
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
const genericEmitToRoom = emitToRoom(genericEmit);
const reduxEmitToRoom = emitToRoom(reduxEmit);

module.exports = Object.freeze({
  genericEmit,
  reduxEmit,
  genericEmitToRoom,
  reduxEmitToRoom,
});
