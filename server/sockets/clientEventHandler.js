const chalk = require('chalk');
const { reduxEmit } = require('./emit');
const { Message } = require('./../classes');
const db = require('../db.js');

// #region Misc vars
const { log } = console;

// THIS IS HIGHLY TEMPORARY!!
// Please remove once we've got login completed
const userId = 1;

// Do error handling or something, lol
const errorHandling = e => log(chalk.red(e));

// Helper methods
const sendHelper = (method, params, func) => method(params).then(func).catch(errorHandling);
const sendList = (socket, string, key, method, params) => sendHelper(method, params, (val) => {
  const keys = Object.keys(val);
  for (let i = 0; i < keys.length; i++) {
    const obj = {};
    obj[key] = val[keys[i]];
    if (obj[key]) {
      reduxEmit(socket, new Message(string, obj));
    }
  }
});
const sendObj = (socket, string, method, params) => sendHelper(method, params, (val) => {
  reduxEmit(socket, new Message(string, val));
});

const changePage = (page, socket) => {
  switch (page) {
    case 'Login': {
      reduxEmit(socket, new Message('CLEAR_SESSION'));
      reduxEmit(socket, new Message('LOGOUT'));
      break;
    }
    case 'Friends': {
      sendList(socket, 'UPDATE_FRIEND', 'friend', db.friendList, [userId]);
      break;
    }
    case 'Home': {
      // Dunno where to put this, lol
      sendObj(socket, 'UPDATE_STATS', db.getUserData, [userId]);
      break;
    }
    case 'ManageParty': {
      sendList(socket, 'UPDATE_ADVENTURER', 'adventurer', db.partyList, [userId]);
      sendList(socket, 'UPDATE_GEAR', 'gear', db.equipList, [userId]);
      break;
    }
    case 'Options': {
      // TODO: Send current option settings
      break;
    }
    case 'Recruit': {
      // TODO: Send set of available recruitment options
      break;
    }
    case 'MicroTransactions': {
      // TODO: Send set of available MicroTransaction options
      break;
    }
    case 'Adventure': {
      // TODO: Send set of data needed for game play
      break;
    }
    default: { log(chalk.bold.yellow(`ERROR: Page ${page} cannot be navigated to`)); }
  }

  reduxEmit(socket, new Message('CHANGE_PAGE', { page }));
};

module.exports = Object.freeze({
  clientEmitHandler: (sock, eventData) => {
    const socket = sock;
    const { event, data } = eventData;

    switch (event) {
      case 'changePage': {
        return changePage(data.page, socket);
      }
      case 'login': {
        // TODO: Handle login process

        reduxEmit(socket, new Message('LOGIN'));
        return changePage('Home', socket);
      }
      case 'logout': {
        // TODO: Handle logout process

        return changePage('Login', socket);
      }
      case 'adventureStart': {
        // Populate relevant enemy and hero data
        reduxEmit(socket, new Message('UPDATE_GAME_STATE', {
          gameState: {
            enemies: {},
            heroes: {},
          },
        }));
        reduxEmit(socket, new Message('ADVENTURE_START'));
        return changePage('Adventure', socket);
      }
      case 'adventureEnd': {
        reduxEmit(socket, new Message('ADVENTURE_END'));
        changePage('Home', socket);
        return reduxEmit(socket, new Message('CLEAR_GAME_STATE'));
      }
      default: { return log(chalk.bold.yellow(`Emit ${event} received from ${socket.hash} without a handler`)); }
    }
  },
});
