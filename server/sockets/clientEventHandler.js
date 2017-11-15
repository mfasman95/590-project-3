const chalk = require('chalk');
const { reduxEmit } = require('./emit');
const { Message } = require('./../classes');

// #region Misc vars
const { log } = console;

module.exports = Object.freeze({
  clientEmitHandler: (sock, eventData) => {
    const socket = sock;
    const { event, data } = eventData;

    switch (event) {
      case 'login': {
        // TODO: Handle login process

        reduxEmit(socket, new Message('LOGIN'));

        reduxEmit(socket, new Message('CHANGE_PAGE', {
          page: 'Home',
        }));

        break;
      }
      case 'logout': {
        // TODO: Handle logout process

        reduxEmit(socket, new Message('CLEAR_SESSION'));
        reduxEmit(socket, new Message('LOGOUT'));

        reduxEmit(socket, new Message('CHANGE_PAGE', {
          page: 'Login',
        }));
        break;
      }
      default: { log(chalk.red(`Emit ${event} received from ${socket.hash} without a handler`)); }
    }
  },
});
