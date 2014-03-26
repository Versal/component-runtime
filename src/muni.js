var EventEmitter = require('events').EventEmitter;

// Target must be either iframe or window
// - If target is iframe, we are going to talk to gadget
// - If target is window, we are going to talk to player
var Muni = function(options){
  options = options || {};
  this.origin = options.origin || window.location.origin;

  // muni over iframe
  if(options.iframe) {
    this.messageTarget = options.iframe.contentWindow;
    // send messages from window to the appropriate iframe
    Muni.setupMessageRetranslationOnce();
    options.iframe.addEventListener('message', this.onMessage.bind(this));
  } else {
    this.messageTarget = window.parent;
    window.addEventListener('message', this.onMessage.bind(this));
  }

  EventEmitter.call(this);
};

var OUTGOING_MESSAGES = ['setAttribute', 'attached', 'detached'];

Muni.setupMessageRetranslationOnce = function(origin){
  if(Muni.messageRetranslationSetUp) { return; }
  Muni.messageRetranslationSetUp = true;

  if(typeof(window) != 'undefined') {
    window.addEventListener('message', function(evt){
      // Only if event is named and coming from player origin
      if(evt.data && evt.data.name) {
        if(evt.source.frameElement) {
          evt.source.frameElement.dispatchEvent(new CustomEvent('message', { detail: evt.data }));
        }
      }
    });
  }
};

Muni.prototype = {

  onMessage: function(evt) {
    var data = evt.data || evt.detail;
    if(data && data.name){
      this.emit(data.name, data.detail);
    }
  },

  addEventListener: function(){
    this.addListener.apply(this, arguments);
  },

  removeEventListener: function(){
    this.removeListener.apply(this, arguments);
  },

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
      this.send('setAttribute', { name: name, value: value });
    }
  },

  // Send arbitrary message. Name has to be in KNOWN_MESSAGES
  send: function(name, detail){
    if(this.isKnownMessage(name)) {
      var message = this.createMessage(name, detail);
      // We don't need to JSON.stringfy our messages
      // since postMessage handles that for us
      this.messageTarget.postMessage(message, this.origin);
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

Object.getOwnPropertyNames(EventEmitter.prototype).forEach(function(name){
  var prop = Object.getOwnPropertyDescriptor(EventEmitter.prototype, name);
  Object.defineProperty(Muni.prototype, name, prop);
});

module.exports = Muni;
/*
if(typeof(window) != 'undefined') {
  // Listen for messages from iframes and re-trigger them on iframe itself
  window.addEventListener('message', function(evt){
    var iframe = evt.source.frameElement;

    //TODO: Maybe check origin?
    if(iframe) {
      if(evt.data && evt.data.name) {
        iframe.dispatchEvent(new CustomEvent('message', evt.data))
      };
    }
  });
};
*/
