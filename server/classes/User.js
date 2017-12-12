const xxh = require('xxhashjs');

module.exports = Object.freeze({
  User: class User {
    constructor(socket) {
      // Store the user socket
      this.socket = socket;
      // Unique id for this user
      this.id = socket.hash;
      // Variable to store the room this user is in
      this.inRoom = undefined;
      // Variable to store this user's name
      this.name = undefined;
      // Variable for encounter
      this.encounter = {};
    }

    // Store the id for the room the user is in
    joinRoom(roomId) { this.inRoom = roomId; }
    // Clear the id for the room the user is in
    leaveRoom() { this.inRoom = undefined; }

    // Update this user's name
    setName(name) { this.name = name; }

    // Set encounter
    setEncounter(enemies) {
      let enemyString = '';
      let encounterExperience = 0;
      const enemyKeys = Object.keys(enemies);
      for (let i = 0; i < enemyKeys.length; i++) {
        const enemy = enemies[enemyKeys[i]];
        enemyString = `${enemyString}${JSON.stringify(enemy)}`;
        encounterExperience += (enemy.challenge * 10);
      }
      const encounterGold = Math.floor(encounterExperience * 0.5);

      const encounterId = xxh.h32(`${enemyString}${new Date().getTime()}`, 0xCAFEBABE).toString(16);

      this.encounter = {
        encounterId,
        encounterExperience,
        encounterGold,
      };

      return this.encounter;
    }
    clearEncounter() {
      this.encounter = {};
    }
  },
});
