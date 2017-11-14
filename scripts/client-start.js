/* eslint-disable */
const cp = require('child_process');
const chalk = require('chalk');

const { log } = console;

log(chalk.yellow('Starting client watch script...'));

const clientWatch = cp.spawn(
  'cross-env PORT=3001 npm start',
  [],
  { stdio: 'inherit', cwd: 'client', shell: true }
);

clientWatch.on('error', err => log(chalk.red('Client watch script ended with an error'), err));
clientWatch.on('close', () => log(chalk.yellow('Ending client watch script...')));
clientWatch.on('exit', () => log(chalk.yellow('Ending client watch script...')));
