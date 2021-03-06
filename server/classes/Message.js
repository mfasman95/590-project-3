module.exports = Object.freeze({
  Message: class Message {
    constructor(eventName, data) {
      this.event = eventName;
      this.data = data || {};
      this.timestamp = new Date().getTime();
    }
  },
});
