const chalk = require('chalk');
const { reduxEmit, reduxErrorEmit } = require('./emit');
const { getUser } = require('./users');
const { Message } = require('./../classes');
const db = require('./../db.js');

// #region Misc vars
const { log } = console;

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
      reduxEmit(new Message(string, obj))(socket);
    }
  }
});
const sendObj = (socket, string, method, params) => sendHelper(method, params, (val) => {
  reduxEmit(new Message(string, val))(socket);
});

const changePage = (page, socket) => {
  switch (page) {
    case 'Login': {
      // There should be no old state on Login page
      reduxEmit(new Message('CLEAR_SESSION'))(socket);
      reduxEmit(new Message('LOGOUT'))(socket);
      break;
    }
    case 'SignUp': {
      // There should be no old state on SignUp page
      reduxEmit(new Message('CLEAR_SESSION'))(socket);
      reduxEmit(new Message('LOGOUT'))(socket);
      break;
    }
    case 'Friends': {
      const { dbId } = getUser(socket.hash);
      sendList(socket, 'UPDATE_FRIEND', 'friend', db.friendList, [dbId]);
      break;
    }
    case 'Home': {
      // Dunno where to put this, lol
      const { dbId } = getUser(socket.hash);
      sendObj(socket, 'UPDATE_STATS', db.getUserData, [dbId]);
      break;
    }
    case 'ManageParty': {
      const { dbId } = getUser(socket.hash);
      sendList(socket, 'UPDATE_ADVENTURER', 'adventurer', db.partyList, [dbId]);
      sendList(socket, 'UPDATE_GEAR', 'gear', db.equipList, [dbId]);
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

  reduxEmit(new Message('CHANGE_PAGE', { page }))(socket);
};

const loginResponse = (socket, res) => {
  const user = getUser(socket.hash);

  // Store the user's id on the user object
  user.dbId = res.id;
  reduxEmit(new Message('LOGIN'))(socket);
  return changePage('Home', socket);
};

module.exports = Object.freeze({
  clientEmitHandler: (sock, eventData) => {
    const socket = sock;
    const { event, data } = eventData;

    switch (event) {
      case 'changePage': {
        return changePage(data.page, socket);
      }
      case 'signup': {
        // Check for all params
        if (!data.username || !data.pass1 || !data.pass2) {
          return reduxErrorEmit({
            error: 'MissingParams',
            message: 'Username, Password, and Confirm Password all required for sign up',
          })(socket);
        }

        // Clean up params
        const username = `${data.username}`; // cast to string
        const pass1 = `${data.pass1}`; // cast to string
        const pass2 = `${data.pass2}`; // cast to string

        // Handle passwords do not match
        if (pass1 !== pass2) {
          return reduxErrorEmit({
            error: 'PasswordsMustMatch',
            message: 'Password and Confirm Password must match',
          })(socket);
        }

        // For now, store raw passwords in db
        // TODO: Hash/Salt incoming passwords, store salt on DB

        db.createUser([username, pass1])
          .then(() => db.loginId([username, pass1]))
          .then(res => loginResponse(socket, res))
          .catch(err => reduxErrorEmit({ err })(socket));
        return null;
      }
      case 'login': {// Check for all params
        if (!data.username || !data.password) {
          return reduxErrorEmit({
            error: 'MissingParams',
            message: 'Username and Password both required for log in',
          })(socket);
        }

        // Clean up params
        const username = `${data.username}`; // cast to string
        const password = `${data.password}`; // cast to string

        db.loginId([username, password])
          .then((res) => {
            // Catch if no user data is returned
            // This means the specified user does not exist, or the password is wrong
            if (Object.keys(res).length <= 0) {
              return reduxErrorEmit({
                error: 'LoginError',
                message: 'A user with that username and/or password does not exist',
              })(socket);
            }
            return loginResponse(socket, res);
          })
          .catch(err => reduxErrorEmit({ err })(socket));

        return null;
      }
      case 'logout': {
        // TODO: Handle logout process
        const user = getUser(socket.hash);

        // Remove the users db id
        delete user.dbId;

        return changePage('Login', socket);
      }
      case 'adventureStart': {
        // Populate relevant enemy and hero data
        reduxEmit(new Message('UPDATE_GAME_STATE', {
          gameState: {
            enemies: {},
            heroes: {},
          },
        }))(socket);
        reduxEmit(new Message('ADVENTURE_START'))(socket);
        return changePage('Adventure', socket);
      }
      case 'adventureEnd': {
        reduxEmit(new Message('ADVENTURE_END'))(socket);
        changePage('Home', socket);
        return reduxEmit(new Message('CLEAR_GAME_STATE'))(socket);
      }
      default: { return log(chalk.bold.yellow(`Emit ${event} received from ${socket.hash} without a handler`)); }
    }
  },
});
