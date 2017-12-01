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

// Get the list of party memebers
dbRefs.partyList([1]).then((val) => {
  // Gets the rows
  const [userCards] = val;
  // For each of the rows
  for (let i = 0; i < userCards.length; i++) {
    // Do the query
    dbRefs.getCharacter([userCards[i].card_id]).then((arg) => {
      // Gets the argument rows
      const [characters] = arg;
      // Log the character's name as it comes in
      log(chalk.yellow(characters[0].name));
    }).catch(errorHandling);
  } // Error handling stuff
}).catch(errorHandling);
