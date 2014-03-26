/*
VersalGadget provides a wrapper over iframe.contentWindow so player
can send updates to the gadget.

{@recipient} - something, that supports postMessage
  For the case of iframe, it is iframe.contentWindow.
{@origin} - optional. Defaults to window.location.origin

*/

var VersalGadget = function(recipient, origin){
  // iframe can be provided as a recipient
  if(recipient && recipient.localName == 'iframe') {
    recipient = recipient.contentWindow;
  };

  if(recipient && recipient.postMessage) {
    this.recipient = recipient;
  } else {
    throw new Error('Gadget API: Provided recipient does not support postMessage');
  };

  this.origin = origin || window.location.origin;
};

var KNOWN_MESSAGES = ['setAttribute', 'attached', 'detached'];

VersalGadget.prototype = {

  // Send all the attributes on initialization
  // or when gadget is modified by a collaborator
  sendAttributes: function(attrs) {
    Object.getOwnPropertyNames(attrs).forEach(function(name){
      this.sendAttribute(name, attrs[name]);
    }.bind(this));
  },

  // Send attribute updates when individual property sheet fields change
  sendAttribute: function(name, value) {
    if(name) {
      var attr = {};
      attr[name] = value;
      this.send('setAttribute', attr);
    }
  },

  // Send arbitrary message. Name has to be in KNOWN_MESSAGES
  send: function(name, detail){
    if(this.isKnownMessage(name)) {
      // We don't need to JSON.stringfy our messages
      // since postMessage handles that for us
      this.recipient.postMessage(this.createMessage(name, detail), this.origin);
    }
  },

  isKnownMessage: function(name){
    return KNOWN_MESSAGES.indexOf(name) >= 0;
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

module.exports = VersalGadget;
