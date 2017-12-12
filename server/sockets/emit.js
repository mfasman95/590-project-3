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

module.exports.reduxErrorEmit = (error, customTimeout) => module.exports.reduxEmit(new Message('RRS_SHOW_SNACK', {
  payload: {
    id: error.code,
    data: {
      label: error.message,
      timeout: customTimeout || 5000,
      button: { label: 'x' },
    },
  },
}));

module.exports.rdxErrTypes = Object.freeze({
  updateParty: {
    code: 'updatePartyError',
    message: 'Unexpected Error When Retrieving Party',
  },
  updateGameState: {
    code: 'updateGameStateError',
    message: 'Unexpected Error When Updating Game State',
  },
  createUser: {
    code: 'createUserError',
    message: 'Unexpected Error When Creating User',
  },
  loginError: {
    code: 'LoginError',
    message: 'Unexpected Error During Login',
  },
  adventureEnd: {
    code: 'adventureEndError',
    message: 'Unexptected Error When Ending Adventure',
  },
  addFriend: {
    code: 'addFriendError',
    message: 'Unexpected Error When Adding Friend',
  },
  rollGatcha: {
    code: 'rollGatchaError',
    message: 'Unexpected Error When Recruiting a New Hero',
  },
  addPartyMember: {
    code: 'addPartyMemberError',
    message: 'Unexpected Error When Adding Party Member',
  },
  removePartyMember: {
    code: 'removePartyMemberError',
    message: 'Unexpected Error When Removing Party Member',
  },
  setSupport: {
    code: 'setSupportError',
    message: 'Unexpected Error When Setting Support',
  },
  setActiveFriend: {
    code: 'activeFriendError',
    message: 'Unexpected Error When Setting Active Friend',
  },
  getActiveFriend: {
    code: 'activeFriendError',
    message: 'Unexpected Error When Getting Active Friend',
  },
  userData: {
    code: 'userDataError',
    message: 'Unexpected Error When Updating User Data',
  },
});
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
