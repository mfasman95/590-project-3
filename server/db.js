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
const query = (queryString, func) => async (params) => {
  if (!connection) { // Make the call
    await initialize(); // Await the call
  } // Return a new Promise
  return new Promise((resolve, reject) => {
    // console.log(`Query: ${queryString}\n\tParams: [${params}]`);
    // Now let's actually execute the parameter
    connection.execute(queryString, params)
      // If it succeeds
      .then(async (val) => {
        // Transform the value, async if needed
        const transformed = await func(val);
        // Return the transformed value
        resolve(transformed);
      }) // If it fails
      .catch((reason) => {
        // Return the rejection message.
        reject(reason);
      });
  });
};

// Helper function for cleanly returning an empty object
// This is called for INSERT methods.
const emptyObject = async () => ({});

// Extract data from a single row response
// This turns [a, b, c] into {a, b, c}
const firstRow = async (val) => {
  // Gets the list of field objects
  const fields = val[1];
  // Gets the row - Should only be one!
  const data = val[0][0];
  // Build a return object
  const returnObj = {};
  // If there is no value
  if (!data) {
    // Return the object now.
    return returnObj;
  }
  // Loop through the fields
  for (let i = 0; i < fields.length; i++) {
    // Get the field name
    const fieldName = fields[i].name;
    // Set `returnObj.fieldName` as `data.fieldName`
    returnObj[fieldName] = data[fieldName];
  } // Return the data
  return returnObj;
};

// Loop through list and convert ids to values
// This expands arrays into objects of objects
const convertList = (arrayId, baseId, convertFunc) => async (val) => {
  // Make a temporary promise list
  const promiseList = [];
  // Gets the rows
  const [userList] = val;
  // For each of the rows
  for (let i = 0; i < userList.length; i++) {
    // Get the ID of the friend
    const userId = userList[i][baseId];
    // Add the lookup to the list
    promiseList.push(convertFunc([userId]));
  }
  // Build a return object
  const returnObj = {};
  // Await the resolution of all the promises
  await Promise.all(promiseList).then((args) => {
    // Loop through all the values
    for (let i = 0; i < args.length; i++) {
      // Add them to the return object
      returnObj[userList[i][arrayId]] = args[i];
    }
  });
  return returnObj;
};

// String constants for the queries. Helps keep things clean.
const DBConstants = Object.freeze({
  LOGIN: 'SELECT `id` FROM `user` WHERE `username` = ? AND `password` = ?;',
  CREATE_USER: 'INSERT INTO `user` (`username`, `password`) VALUES (?, ?);',
  GET_USER: 'SELECT `id`, `username` AS name FROM `user` WHERE `id` = ?;',
  GET_USER_BY_NAME: 'SELECT `id` FROM `user` WHERE `username` = ?;',
  GET_USER_DATA: 'SELECT `id`, `currency`, `level` AS lvl, `experience` AS xp, `stamina` FROM `user` WHERE `id` = ?;',
  SET_CURRENCY: 'UPDATE `user` SET `currency` = ? WHERE `id` = ?;',
  SET_LEVEL: 'UPDATE `user` SET `level` = ? WHERE `id` = ?;',
  SET_EXPERIENCE: 'UPDATE `user` SET `experience` = ? WHERE `id` = ?;',
  SET_STAMINA: 'UPDATE `user` SET `stamina` = ? WHERE `id` = ?;',

  GET_PARTY: 'SELECT `id` AS uuid, `card_id` AS entity_id FROM `user_cards` WHERE `card_type` = 0 AND `user` = ?;',
  GET_EQUIP: 'SELECT `id` AS uuid, `card_id` AS equip_id FROM `user_cards` WHERE `card_type` = 1 AND `user` = ?;',
  GET_FRIENDS: 'SELECT `friend` AS user_id FROM `friend_list` WHERE `user` = ?;',
  ADD_FRIEND: 'INSERT INTO `friend_list` (`user`, `friend`) VALUES (?, ?), (?, ?);',
  RECRUIT_CHARACTER: 'INSERT INTO `user_cards` (`user`, `card_type`, `card_id`) VALUES (?, 0, ?);',
  RECRUIT_EQUIPMENT: 'INSERT INTO `user_cards` (`user`, `card_type`, `card_id`) VALUES (?, 1, ?);',
  GET_ACTIVE: 'SELECT `id` AS uuid, `card_id` AS entity_id FROM `user_cards` WHERE `card_type` = 0 AND `user` = ? AND `party` = 1;',
  GET_SUPPORT: 'SELECT `id` AS uuid, `card_id` AS entity_id FROM `user_cards` WHERE `card_type` = 0 AND `user` = ? AND `support` = 1;',
  SET_ACTIVE: 'UPDATE `user_cards` SET `party` = ? WHERE `user` = ? AND `id` = ? AND `card_type` = 0;',
  SET_SUPPORT: 'UPDATE `user_cards` SET `support` = ? WHERE `user` = ? AND `id` = ? AND `card_type` = 0;',
  GET_ACTIVE_FRIEND: 'SELECT `friend` AS user_id FROM `friend_list` WHERE `user` = ? AND `active` = 1;',
  SET_ACTIVE_FRIEND: 'UPDATE `friend_list` SET `active` = ? WHERE `user` = ? AND `friend` = ?;',
  GET_ACTIVE_LIST: 'SELECT  `id` AS uuid, `card_id` AS entity_id FROM `user_cards` WHERE `card_type` = 0 ' +
    'AND ((`user` = ? AND `party` = 1) OR (`user` = (SELECT `friend` AS user_id FROM `friend_list` WHERE `user` = ? AND `active` = 1) AND `support` = 1))',

  GET_CHARACTER: 'SELECT * FROM `adventurer_lookup` WHERE `id` = ?;',
  GET_EQUIPMENT: 'SELECT * FROM `equipment` WHERE `id` = ?;',
  GET_ENEMY: 'SELECT * FROM `enemy` WHERE `id` = ?;',
  GET_ALL_CHARS: 'SELECT `id` AS entity_id FROM `adventurer_lookup`;',
  GET_ALL_EQUIP: 'SELECT `id` AS equip_id FROM `equipment`;',
  ROLL_CHARACTER: 'SELECT ROLL_GATCHA(?, ?) AS entity_id;',
  ROLL_ENEMIES: 'SELECT `id` FROM `enemy` WHERE `challenge` = ? ORDER BY RAND() LIMIT ?;',
});

/*
THESE METHODS ALL _REQUIRE_ YOU AS THE PROGRAMMER(S) TO HAVE PROPER INPUT.
THEY **DO NOT** DO ANY SORT OF INPUT VALIDATION ON ANY OF THEIR ARGUMENTS.
ONLY EXCEPTIONS BEING `user_id` AND FIELD VALIDATION LIKE INT/VARCHAR CHECKS.
IF YOU GET AN ERROR FROM MYSQL (Promise.catch) YOU KNOW YOU'VE FUCKED UP.
THEY _WILL_ RETURN EMPTY ROW SETS IF THEY DON'T FIND ANYTHING.
BE **ESPECIALLY** CAREFUL WITH THE `INSERT` METHODS, FOR OBVIOUS REASONS.
*/

/* Lookup Methods */

// [entity_id] -> [id, level, name, race, className, str, dex, int, wis, con, cha, hp, hit] -> {<>}
module.exports.getCharacter = query(DBConstants.GET_CHARACTER, firstRow);
// [equip_id] -> [id, is_armor, name] -> {id, is_armor, name}
module.exports.getEquipment = query(DBConstants.GET_EQUIPMENT, firstRow);
// [enemy_id] -> [id, name, challenge, health, attack] -> {id, name, challenge, health, attack}
module.exports.getEnemy = query(DBConstants.GET_ENEMY, firstRow);
// [] -> [entity_id...]
module.exports.getAllCharacters = query(DBConstants.GET_ALL_CHARS);
// [] -> [equip_id...]
module.exports.getAllEquipments = query(DBConstants.GET_ALL_EQUIP);
// [user_id, gatcha_type] -> [entity_id] -> {entity_id: {<entity_vals>}}
module.exports.rollGatcha = query(DBConstants.ROLL_CHARACTER, convertList('id', 'entity_id', module.exports.getCharacter));
// [challenge_rating, num_enemies] -> [enemy_id...] -> {enemy_id: {<enemy_vals>}, ...}
module.exports.createEncounter = query(DBConstants.ROLL_ENEMIES, convertList('id', 'id', module.exports.getEnemy));

/* User management */

// [username, password] -> [user_id] -> {id}
module.exports.loginId = query(DBConstants.LOGIN, firstRow);
// [username, password] -> [] -> {}
module.exports.createUser = query(DBConstants.CREATE_USER, emptyObject);
// [user_id] -> [user_id, username] -> {id, name}
module.exports.getUser = query(DBConstants.GET_USER, firstRow);
// [username] -> [user_id] -> {id}
module.exports.getUserByName = query(DBConstants.GET_USER_BY_NAME, firstRow);
// [user_id] -> [user_id, currency, level, experience, stamina] -> {id, currency, lvl, xp, stamina}
module.exports.getUserData = query(DBConstants.GET_USER_DATA, firstRow);
// [newVal, user_id] -> [] -> {}
module.exports.setCurrency = query(DBConstants.SET_CURRENCY, emptyObject);
// [newVal, user_id] -> [] -> {}
module.exports.setLevel = query(DBConstants.SET_LEVEL, emptyObject);
// [newVal, user_id] -> [] -> {}
module.exports.setExperience = query(DBConstants.SET_EXPERIENCE, emptyObject);
// [newVal, user_id] -> [] -> {}
module.exports.setStamina = query(DBConstants.SET_STAMINA, emptyObject);

/* Lists of Things */

// [user_id] -> [(uuid, entity_id)...] -> {uuid: {<entity_vals>}, ...}
module.exports.partyList = query(DBConstants.GET_PARTY, convertList('uuid', 'entity_id', module.exports.getCharacter));
// [user_id] -> [(uuid, equip_id)...] -> {uuid: {<equip_vals>}, ...}
module.exports.equipList = query(DBConstants.GET_EQUIP, convertList('uuid', 'equip_id', module.exports.getEquipment));
// [user_id] -> [user_id...] -> {id: {id, name, support: <entity_vals>}, ...}
module.exports.friendList = query(DBConstants.GET_FRIENDS, convertList('id', 'user_id', async (val) => {
  const theUser = await module.exports.getUser([val]);
  theUser.support = await module.exports.getSupport([theUser.id]);
  return theUser;
}));
// [user_id] -> [(uuid, entity_id)...] -> {uuid: {<entity_vals>}, ...}
module.exports.activeList = arr =>
  query(DBConstants.GET_ACTIVE_LIST, convertList('uuid', 'entity_id', module.exports.getCharacter))([arr[0], arr[0]]);

/* User data */

// [user_id, user_id] -> [] -> {}
module.exports.addFriend = arr => // Passes in the same arg twice so a -> b is also b -> a
  query(DBConstants.ADD_FRIEND, emptyObject)([arr[0], arr[1], arr[1], arr[0]]);
// [user_id, entity_id] -> [] -> {}
module.exports.recruitChar = query(DBConstants.RECRUIT_CHARACTER, emptyObject);
// [user_id, equip_id] -> [] -> {}
module.exports.summonEquip = query(DBConstants.RECRUIT_EQUIPMENT, emptyObject);
// [user_id] -> [(uuid, entity_id)...] -> {uuid: {<entity_vals>}, ...}
module.exports.getActive = query(DBConstants.GET_ACTIVE, convertList('uuid', 'entity_id', module.exports.getCharacter));
// [user_id] -> [uuid, entity_id] -> {uuid: {<entity_vals>}}
module.exports.getSupport = query(DBConstants.GET_SUPPORT, convertList('uuid', 'entity_id', module.exports.getCharacter));
// [update, user_id, entity_id] -> [] -> {}
module.exports.setActive = query(DBConstants.SET_ACTIVE, emptyObject);
// [update, user_id, entity_id] -> [] -> {}
module.exports.setSupport = query(DBConstants.SET_SUPPORT, emptyObject);
// [user_id] -> [user_id] -> {user_id: {<entity_vals>}}
module.exports.getActiveFriend = query(DBConstants.GET_ACTIVE_FRIEND, convertList('user_id', 'user_id', module.exports.getSupport));
// [update, user_id, friend_id] -> [] -> {}
module.exports.setActiveFriend = query(DBConstants.SET_ACTIVE_FRIEND, emptyObject);
