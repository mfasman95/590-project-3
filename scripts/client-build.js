/* eslint-disable */
const cp = require('child_process');
const chalk = require('chalk');

const { log } = console;

log(chalk.yellow('Starting client build script...'));
cp.spawnSync(
  'npm run build',
  [],
  { stdio: 'inherit', cwd: 'client', shell: true }
);
log(chalk.yellow('Completed client build script!'));
