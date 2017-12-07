const { Message } = require('../classes');
const { getUser, getUserByDBID } = require('./users');

// #region Base Emit Functions
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
module.exports.genericEmit = emit('generic');
module.exports.reduxEmit = emit('redux');

module.exports.reduxErrorEmit = data => module.exports.reduxEmit(new Message('ERROR_SNACK', data));
// #endregion Base Emit Functions

// #region Emit To Room
// Build functions to emit to a full room
const emitToRoom = emitFunc => room => (message) => {
  for (let i = 0; i < room.currentOccupancy; i++) {
    const user = getUser(room.occupants[i].id);
    if (user) emitFunc(message)(user.socket);
  }
};
module.exports.genericEmitToRoom = emitToRoom(module.exports.genericEmit);
module.exports.reduxEmitToRoom = emitToRoom(module.exports.reduxEmit);
// #endregion Emit To Room

// #region Emit To Database User
const emitToUser = emitFunc => userRowId => (message) => {
  const user = getUserByDBID(userRowId);
  if (user) emitFunc(message)(user.socket);
};
module.exports.genericEmitToUser = emitToUser(module.exports.genericEmit);
module.exports.reduxEmitToUser = emitToUser(module.exports.reduxEmit);
// #endregion Emit To Database User
