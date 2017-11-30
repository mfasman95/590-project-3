const mysql = require('mysql2/promise');

const DBConstants = Object.freeze({
  GET_CHARACTER: 'SELECT * FROM `adventurer_lookup`;',
});

const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DATA,
});

const query = queryString => async params => connection.execute(queryString, params);

module.exports.getUsers = query(DBConstants.GET_CHARACTER);
