const fs = require('fs');

fs.createReadStream('./config/example.envSetup')
  .pipe(fs.createWriteStream('./.env'));
