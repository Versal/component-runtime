// Represents player for the gadget
var VersalPlayer = function(origin){
  this.attributes = {};

  window.addEventListener('message', function(evt){
    if(evt.origin == origin) {
      switch(evt.data.name) {
        case 'setAttribute':
          this.onAttributeChanged(evt.data.detail);
          break;

        case 'attached':
          this.onAttached();
          break;
      }
    }
  }.bind(this));
};

VersalPlayer.prototype = {
  onAttributeChanged: function(detail){
    Object.getOwnPropertyNames(detail).forEach(function(key){
      var old = this.attributes[key];
      var current = detail[key];

      if(this.attributeChangedCallback) {
        this.attributeChangedCallback(key, old, current);
      }
    }.bind(this));
  },

  onAttached: function(){
    if(this.attachedCallback) {
      this.attachedCallback();
    }
  },

  send: function(name, detail){
    var data = { name: name };
    if(detail) {
      data.detail = detail;
    }
    window.parent.postMessage(data, window.location.origin);
  }
};

module.exports = VersalPlayer;
