const mysql = require('mysql2/promise');

// The connection to the database
const connection = mysql.createConnection(process.env.JAWSDB_URL);

// Function composer for querying the database.
const query = queryString => async params => connection.execute(queryString, params);

// String constants for the queries. Helps keep things clean.
const DBConstants = Object.freeze({
  LOGIN: 'SELECT `id` FROM `user` WHERE `username` = ? AND `password` = ?;',
  GET_CHARACTER: 'SELECT * FROM `adventurer_lookup`;',
});

module.exports.loginId = query(DBConstants.LOGIN);
module.exports.getUsers = query(DBConstants.GET_CHARACTER);
