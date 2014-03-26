// Represents player for the gadget
var VersalPlayerAPI = function(origin) {
  window.addEventListener('message', this.onMessage.bind(this, origin));
};

VersalPlayerAPI.prototype = {

  onMessage: function(origin, evt) {
    // Only react to the known messages and from the player origin
    if(evt.origin == origin && evt.data && evt.data.name){

    var callback = this[this.getCallbackName(evt.data)];
    if(callback) {
      callback(evt.data.detail);
    }
  },

  callbackName: function(message) {
    return 'on' + message.name[0].toUpperCase() + messageName.slice(1);
  },

  // Send arbitrary message. Name has to be in KNOWN_MESSAGES
  send: function(name, detail){
    if(this.isKnownMessage(name)) {
      // We don't need to JSON.stringfy our messages
      // since postMessage handles that for us
      this.messageTarget.postMessage(this.createMessage(name, detail), this.origin);
    }
  },

  isKnownMessage: function(name){
    return OUTGOING_MESSAGES.indexOf(name) >= 0;
  },

  // Wrap name and detail in envelope
  createMessage: function(name, detail) {
    var message = { name: name };
    if(detail) {
      message.detail = detail;
    }
    return message;
  }
};

module.exports = VersalPlayerAPI;
