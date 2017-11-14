const chalk = require('chalk');
const { reduxEmit } = require('./emit');
const { Message } = require('./../classes');

// #region Misc vars
const { log } = console;

module.exports = Object.freeze({
  clientEmitHandler: (sock, eventData) => {
    const socket = sock;
    const { event, data } = eventData;

    // TODO: This just shows what data we are getting. Get rid of this later.
    log(data);

    switch (event) {
      case 'goHome': {
        reduxEmit(socket, new Message('CHANGE_PAGE', { page: 'Home' }));
        break;
      }
      default: { log(chalk.red(`Emit ${event} received from ${socket.hash} without a handler`)); }
    }
  },
});
