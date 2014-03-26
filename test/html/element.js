var HTMLElement = function(attrs){
  this.attributes = attrs || {};
};

HTMLElement.prototype = {
  setAttribute: function(key, value) {
    this.attributes[key] = value;
  },

  getAttribute: function(key) {
    return this.attributes[key];
  },

  hasAttribute: function(key) {
    return this.attributes.hasOwnProperty(key);
  }
};

module.exports = HTMLElement;
