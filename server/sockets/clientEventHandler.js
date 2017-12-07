const chalk = require('chalk');
const { reduxEmit, reduxErrorEmit } = require('./emit');
const { getUser } = require('./users');
const { Message } = require('./../classes');
const db = require('./../db.js');

// #region Misc vars
const { log } = console;

// Probably should refactor down to the client
const gatchaTypes = Object.freeze({
  Bronze: 1,
  Silver: 2,
  Gold: 3,
  Platinum: 4,
});

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
      obj[key].key = keys[i];
      reduxEmit(new Message(string, obj))(socket);
    }
  }
});
const sendObj = (socket, string, method, params) => sendHelper(method, params, (val) => {
  reduxEmit(new Message(string, val))(socket);
});

const changePage = (page, socket) => {
  const { userRowId } = getUser(socket.hash);
  sendObj(socket, 'UPDATE_STATS', db.getUserData, [userRowId]);

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
      // getSelectedSupport
      // Ensure that friends list is two entries
      // Add db function for grabbing friend entry whose support is selected

      sendList(socket, 'UPDATE_FRIEND', 'friend', db.friendList, [userRowId]);
      break;
    }
    case 'Home': {
      db.getActive([userRowId])
        .then(party => reduxEmit(new Message('UPDATE_PARTY', party)(socket)))
        .catch(err => reduxErrorEmit(err)(socket));
      break;
    }
    case 'ManageParty': {
      sendList(socket, 'UPDATE_ADVENTURER', 'adventurer', db.partyList, [userRowId]);
      sendList(socket, 'UPDATE_GEAR', 'gear', db.equipList, [userRowId]);
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
      db.startEncounter([userRowId])
        .then((res) => {
          const { enemies } = res;

          const encounter = getUser(socket.hash).startEncounter(enemies);

          return reduxEmit(new Message('UPDATE_GAME_STATE', {
            gameState: {
              enemies,
              party: {/* This needs to be retrieved from the DB, should be 3 adventurers */},
              ally: 'Select the ally that this user has designated from their friends list',
              encounterId: encounter.id,
            },
          }));
        })
        .catch(err => reduxErrorEmit(err)(socket));
      break;
    }
    default: { log(chalk.bold.yellow(`ERROR: Page ${page} cannot be navigated to`)); }
  }

  reduxEmit(new Message('CHANGE_PAGE', { page }))(socket);
};

const loginResponse = (socket, res, username) => {
  const user = getUser(socket.hash);

  // Store the user's id on the user object
  user.userRowId = res.id;
  user.setName(username);

  reduxEmit(new Message('LOGIN'))(socket);
  return changePage('Home', socket);
};

module.exports.clientEmitHandler = (sock, eventData) => {
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
          code: 'MissingParams',
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
          code: 'PasswordsMustMatch',
          message: 'Password and Confirm Password must match',
        })(socket);
      }

      // For now, store raw passwords in db
      // TODO: Hash/Salt incoming passwords, store salt on DB

      return db.createUser([username, pass1])
        .then(() => db.loginId([username, pass1]))
        .then(res => loginResponse(socket, res, username))
        .catch(err => reduxErrorEmit(err)(socket));
    }
    case 'login': {
      // Check for all params
      if (!data.username || !data.password) {
        return reduxErrorEmit({
          code: 'MissingParams',
          message: 'Username and Password both required for log in',
        })(socket);
      }

      // Clean up params
      const username = `${data.username}`; // cast to string
      const password = `${data.password}`; // cast to string

      return db.loginId([username, password])
        .then((res) => {
          // Catch if no user data is returned
          // This means the specified user does not exist, or the password is wrong
          if (Object.keys(res).length <= 0) {
            return reduxErrorEmit({
              code: 'LoginError',
              message: 'A user with that username and/or password does not exist',
            })(socket);
          }
          return loginResponse(socket, res, username);
        })
        .catch(err => reduxErrorEmit(err)(socket));
    }
    case 'logout': {
      const user = getUser(socket.hash);

      // Remove the users db id
      delete user.userRowId;

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
    case 'addFriend': {
      // Check for all params
      if (!data.friendName) {
        return reduxErrorEmit({
          code: 'MissingParams',
          message: 'Friend Name is required to add a friend',
        })(socket);
      }

      // Clean up params
      const friendName = `${data.friendName}`; // cast to string
      const { userRowId } = getUser(socket.hash);

      return db.getUserByName([friendName])
        .then(friend => db.addFriend([userRowId, friend.id]))
        .then((res) => {
          // TODO: Send feedback to user
          console.log(friendName);
          console.log(res);
        })
        .catch(err => reduxErrorEmit(err)(socket));
    }
    case 'gatchaRoll': {
      // data.type is the type of the gatcha roll
      // types: ['Bronze', 'Silver', 'Gold', 'Platinum']

      // Check for all params
      if (!data.type) {
        return reduxErrorEmit({
          code: 'MissingParams',
          message: 'Roll type is required to recruit a new hero',
        })(socket);
      }

      // Clean up params
      const type = `${data.type}`; // cast to string
      const { userRowId } = getUser(socket.hash);

      return db.rollGatcha([userRowId, gatchaTypes[type]])
        .then((res) => {
          // Returns an adventurer in full data for your display pleasure
          // TODO: Actually display said returned entity
          console.log(res);
        })
        .catch(err => reduxErrorEmit(err)(socket));
    }
    default: { return log(chalk.bold.yellow(`Emit ${event} received from ${socket.hash} without a handler`)); }
  }
};
