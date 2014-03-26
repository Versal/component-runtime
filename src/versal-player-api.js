// Represents player for the gadget
var VersalPlayer = function(origin){
  window.addEventListener('message', function(evt){
    if(evt.origin == origin) {
      console.log(evt);
    }
  });
};

VersalPlayer.prototype = {

  send: function(name, detail){
    var data = { name: name };
    if(detail) {
      data.detail = detail;
    }
    window.parent.postMessage(data, window.location.origin);
  }
};

module.exports = VersalPlayer;
