// Represents gadget for the player
var VersalGadget = function(recipient, origin){
  this.recipient = recipient;
  this.origin = origin;
};

var SUPPORTED_MESSAGES = ['setAttribute', 'attached', 'detached'];

VersalGadget.prototype = {

  sendAttributes: function(attrs) {
    Object.getOwnPropertyNames(attrs).forEach(function(name){
      this.sendAttribute(name, attrs[name]);
    }.bind(this));
  },

  sendAttribute: function(name, value) {
    if(name) {
      var attr = {};
      attr[name] = value;
      this.send('setAttribute', attr);
    }
  },

  send: function(name, detail){
    if(this.isKnownMessage(name)) {
      // We don't need to JSON.stringfy our messages.
      // postMessage handles that for us.
      this.recipient.postMessage(this.createMessage(name, detail), this.origin);
    }
  },

  isKnownMessage: function(name){
    return SUPPORTED_MESSAGES.indexOf(name) >= 0;
  },

  createMessage: function(name, detail) {
    var message = { name: name };
    if(detail) {
      message.detail = detail;
    }
    return message;
  }
};

module.exports = VersalGadget;
