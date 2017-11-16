const chalk = require('chalk');
const { reduxEmit } = require('./emit');
const { Message } = require('./../classes');

// #region Misc vars
const { log } = console;

const changePage = (page, socket) => {
  switch (page) {
    case 'Login': {
      reduxEmit(socket, new Message('CLEAR_SESSION'));
      reduxEmit(socket, new Message('LOGOUT'));
      break;
    }
    case 'Friends': {
      // TODO: Send the user's updated friend list
      break;
    }
    case 'Home': {
      // TODO: Update banner messages from database
      break;
    }
    case 'ManageParty': {
      // TODO: Send updated list of party members
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
    const { event, data, csrf } = eventData;
    log(chalk.yellow(`${event} ${csrf}`));

    // Check custom csrf operation
    if (socket.csrf !== csrf) {
      return log(chalk.bold.red(`INVALID CSRF TOKEN ${socket.csrf} ${csrf}`));
    }

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
