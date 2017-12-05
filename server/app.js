const http = require('http');
const path = require('path');

const dotenv = require('dotenv');
const express = require('express');
const socketio = require('socket.io');
const chalk = require('chalk');

const sockets = require('./sockets');

// Load env variable if it doesn't exist
if (!process.env.JAWSDB_URL) {
  dotenv.load();
}

const { log } = console;
const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

app.use('/', express.static(path.resolve(`${__dirname}./../client/build/`)));

const server = http.createServer(app);

const io = socketio(server);

sockets.initSockets(io);

server.listen(PORT, (err) => {
  if (err) throw err;

  log(chalk.blue(`Listening on port ${PORT}`));
});

// Here's an example of how to use the DB
// Yes, this is how promises work.
const dbRefs = require('./db.js');
// Do error handling or something, lol
const errorHandling = e => log(chalk.red(e));

const playerId = 1;

// Get the list of friends
dbRefs.friendList([playerId]).then((val) => {
  log(chalk.green('Your friend list: '));
  // Gets the list of keys
  const keys = Object.keys(val);
  // Loop through the list of keys
  for (let i = 0; i < keys.length; i++) {
    // Get the friend
    const friend = val[keys[i]];
    // Print the friend's name and id
    log(chalk.yellow(`Friend #${friend.id}: ${friend.name}`));
  }
}).catch(errorHandling);

dbRefs.partyList([playerId]).then((val) => {
  log(chalk.green('Your party: '));
  const keys = Object.keys(val);
  for (let i = 0; i < keys.length; i++) {
    const adventurer = val[keys[i]];
    log(chalk.yellow(`Adventurer: ${adventurer.name}`));
  }
}).catch(errorHandling);
