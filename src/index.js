require('../polyfills/polyfills');

var VersalElement = require('./versal-element');

var VersalRuntime = function(){
  this._elementDeclarations = {};
  this._customElements = {};
};

VersalRuntime.prototype = {
  GadgetAPI: require('./versal-gadget-api'),
  PlayerAPI: require('./versal-player-api'),

  registerElementDeclaration: function(elt) {
    this._elementDeclarations[elt.getAttribute('name')] = new VersalElement(elt);
  },

  registerElement: function(name, options){
    var proto = Object.create(HTMLElement.prototype);
    var elementDeclaration = this._elementDeclarations[name] || {};
    var providedPrototype = options.prototype || options;

    Object.getOwnPropertyNames(elementDeclaration).forEach(function(prop){
      Object.defineProperty(proto, prop, Object.getOwnPropertyDescriptor(elementDeclaration, prop));
    });

    Object.getOwnPropertyNames(providedPrototype).forEach(function(prop){
      Object.defineProperty(proto, prop, Object.getOwnPropertyDescriptor(providedPrototype, prop));
    });

    this._customElements[name] = document.registerElement(name, { prototype: proto });
  }
};

module.exports = new VersalRuntime();
