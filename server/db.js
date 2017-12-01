const mysql = require('mysql2/promise');

// Singleton?
let connection;

// Will be called only once, hopefully.
const initialize = async () => {
  // The connection to the database
  connection = await mysql.createConnection(process.env.JAWSDB_URL);
  return connection;
};

// Function composer for querying the database.
const query = queryString => async (params) => {
  if (!connection) { // Make the call
    await initialize(); // Await the call
  } // Now let's actually execute the parameter
  return connection.execute(queryString, params);
};

// String constants for the queries. Helps keep things clean.
const DBConstants = Object.freeze({
  LOGIN: 'SELECT `id`, FROM `user` WHERE `username` = ? AND `password` = ?;',
  CREATE_USER: 'INSERT INTO `user` (`username`, `password`) VALUES (?, ?);',

  GET_PARTY: 'SELECT `card_id` FROM `user_cards` WHERE `card_type` = 0 AND `user` = ?;',
  GET_EQUIP: 'SELECT `card_id` FROM `user_cards` WHERE `card_type` = 1 AND `user` = ?;',
  RECRUIT_CHARACTER: 'INSERT INTO `user_cards` (`user`, `card_type`, `card_id`) VALUES (?, 0, ?);',
  RECRUIT_EQUIPMENT: 'INSERT INTO `user_cards` (`user`, `card_type`, `card_id`) VALUES (?, 1, ?);',
  GET_FRIENDS: 'SELECT `friend` FROM `friend_list` WHERE `user` = ?;',
  ADD_FRIEND: 'INSERT INTO `friend_list` (`user`, `friend`) VALUES (?, ?);',
  GET_CURRENCY: 'SELECT `currency` FROM `user` WHERE `id` = ?;',
  SET_CURRENCY: 'UPDATE `user` SET `currency` = ? WHERE `id` = ?;',

  GET_CHARACTER: 'SELECT * FROM `adventurer_lookup` WHERE `id` = ?;',
  GET_EQUIPMENT: 'SELECT * FROM `equipment` WHERE `id` = ?;',
  GET_ALL_CHARS: 'SELECT `id` FROM `adventurer_lookup`;',
  GET_ALL_EQUIP: 'SELECT `id` FROM `equipment`;',
});

/*
THESE METHODS ALL _REQUIRE_ YOU AS THE PROGRAMMER(S) TO HAVE PROPER INPUT.
THEY **DO NOT** DO ANY SORT OF INPUT VALIDATION ON ANY OF THEIR ARGUMENTS.
ONLY EXCEPTIONS BEING `user_id` AND FIELD VALIDATION LIKE INT/VARCHAR CHECKS.
IF YOU GET AN ERROR FROM MYSQL (Promise.catch) YOU KNOW YOU'VE FUCKED UP.
THEY _WILL_ RETURN EMPTY ROW SETS IF THEY DON'T FIND ANYTHING.
BE **ESPECIALLY** CAREFUL WITH THE `INSERT` METHODS, FOR OBVIOUS REASONS.
*/

/* User management */

// [username, password] -> [user_id]
module.exports.loginId = query(DBConstants.LOGIN);
// [username, password] -> []
module.exports.createUser = query(DBConstants.CREATE_USER);

/* User data */

// [user_id] -> [card_id...] (entity_id)
module.exports.partyList = query(DBConstants.GET_PARTY);
// [user_id] -> [card_id...] (equip_id)
module.exports.equipList = query(DBConstants.GET_EQUIP);
// [user_id, entity_id] -> []
module.exports.recruitChar = query(DBConstants.RECRUIT_CHARACTER);
// [user_id, equip_id] -> []
module.exports.summonEquip = query(DBConstants.RECRUIT_EQUIPMENT);
// [user_id] -> [friend...] (user_id)
module.exports.friendList = query(DBConstants.GET_FRIENDS);
// [user_id, user_id] -> []
module.exports.addFriend = query(DBConstants.ADD_FRIEND);
// [user_id] -> [currency]
module.exports.getCurrency = query(DBConstants.GET_CURRENCY);
// [user_id, newVal] -> []
module.exports.setCurrency = query(DBConstants.SET_CURRENCY);

/* Lookup Methods */

// [entity_id] -> [id, level, name, race, class, str, dex, int, wis, con, cha, hp, hit]
module.exports.getCharacter = query(DBConstants.GET_CHARACTER);
// [equip_id] -> [id, is_armor, name]
module.exports.getEquipment = query(DBConstants.GET_EQUIPMENT);
// [] -> [id...] (entity_id)
module.exports.getAllCharacters = query(DBConstants.GET_ALL_CHARS);
// [] -> [id...] (equip_id)
module.exports.getAllEquipments = query(DBConstants.GET_ALL_EQUIP);
