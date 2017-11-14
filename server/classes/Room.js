const childProcess = require('child_process');
const path = require('path');

const xxh = require('xxhashjs');
const chalk = require('chalk');

const { Message } = require('./Message');

const { log } = console;

module.exports = Object.freeze({
  Room: class Room {
    constructor(name) {
      // A name for this room
      this.name = name;
      // A unique ID for this room
      this.id = xxh.h32(`${name}${new Date().getTime()}`, 0xCAFEBABE).toString(16);
      // Container for room occupant lookup
      this.occupants = [];

      // Store the current occupancy of the room
      this.currentOccupancy = this.occupants.length;

      // The set of keys to pick off this object when sending it over socket io
      // This avoids sending any excess data
      this.keysToPick = ['name', 'id', 'occupants', 'currentOccupancy'];
    }

    addUser(user) {
      // Tell that user that they joined a room
      user.joinRoom(this.id);
      // Add that user to the object containing occupants of the room
      this.occupants.push({
        id: user.id,
        name: user.name,
      });
      // Update the occupancy count of this room
      this.currentOccupancy = this.occupants.length;
    }

    removeUser(user) {
      // Tell the user that they left the room
      user.leaveRoom();

      // Delete the user from the occupants object on this room
      for (let i = 0; i < this.occupants.length; i++) {
        if (this.occupants[i].id === user.id) {
          this.occupants.splice(i, 1);
        }
      }
      // Update the occupancy count of this room
      this.currentOccupancy = this.occupants.length;
    }
  },
});
