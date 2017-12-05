const { Message } = require('../classes');
const { getUser } = require('./users');
const xxh = require('xxhashjs');

// Build functions to emit to a single client
const emit = type => message => (socket) => {
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

const reduxErrorEmit = data => reduxEmit(new Message('ERROR_SNACK', data));

// Build functions to emit to a full room
const emitToRoom = emitFunc => room => (message) => {
  for (let i = 0; i < room.currentOccupancy; i++) {
    const user = getUser(room.occupants[i].id);
    if (user) emitFunc(message)(user.socket);
  }
};
const genericEmitToRoom = emitToRoom(genericEmit);
const reduxEmitToRoom = emitToRoom(reduxEmit);

module.exports = Object.freeze({
  genericEmit,
  reduxEmit,
  genericEmitToRoom,
  reduxEmitToRoom,
  reduxErrorEmit,
});
