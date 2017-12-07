const http = require('http');
const path = require('path');

const dotenv = require('dotenv');
const express = require('express');
const socketio = require('socket.io');
const chalk = require('chalk');

const sockets = require('./sockets');

// Dereference .env variables that might be overriden
const { JAWSDB_URL } = process.env;

// Load .env file, overwriting any .env variables in file
dotenv.load();

// Restore any .env variabes that were already loaded
if (JAWSDB_URL !== undefined) process.env.JAWSDB_URL = JAWSDB_URL;

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