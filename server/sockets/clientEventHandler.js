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
    case 'Upgrades': {
      // TODO: Send set of available characters and ways to upgrade them
      break;
    }
    default: {
      log(chalk.red(`ERROR: Page ${page} cannot be navigated to`));
    }
  }

  reduxEmit(socket, new Message('CHANGE_PAGE', { page }));
};

module.exports = Object.freeze({
  clientEmitHandler: (sock, eventData) => {
    const socket = sock;
    const { event, data } = eventData;

    switch (event) {
      case 'changePage': {
        changePage(data.page, socket);
        break;
      }
      case 'login': {
        // TODO: Handle login process

        reduxEmit(socket, new Message('LOGIN'));
        changePage('Home', socket);
        break;
      }
      case 'logout': {
        changePage('Login', socket);
        break;
      }
      default: { log(chalk.red(`Emit ${event} received from ${socket.hash} without a handler`)); }
    }
  },
});
