var VersalElement = function(elt) {
  var proto = {
    manifest: elt
  };

  var attrs = elt.getAttribute('attributes');
  if(attrs) {
    this.defineProperties(proto, attrs.split(' '));
  };

  return proto;
};

VersalElement.prototype = {
  defineProperties: function(proto, attrs) {
    if(attrs) {
      attrs.forEach(function(attributeName){
        var propertyName = this.propertyFromAttribute(attributeName);
        Object.defineProperty(proto, propertyName, this.createPropertyDescriptor(attributeName));
      }.bind(this));
    }
  },

  propertyFromAttribute: function(attributeName) {
    return attributeName.replace( /-([a-z])/ig, function(all, letter) {
      return letter.toUpperCase();
    });
  },

  createPropertyDescriptor: function(attributeName) {
    return {
      get: function(){ return this.getAttribute(attributeName); },
      set: function(value) { this.setAttribute(attributeName, value); }
    };
  }
};

module.exports = VersalElement;

if(typeof document != 'undefined' && document.registerElement) {
  document.registerElement('versal-element', {
    prototype: Object.create(HTMLElement.prototype, {
      'createdCallback': {
        value: function(){
          window.VersalRuntime.registerElementDeclaration(this);
        }
      }
    })
  });
}
/*
(function(){
  'use strict'

  var VersalElementDirective = Object.create(HTMLElement.prototype);

  VersalElementDirective.createdCallback = function(){
    console.log('found definition of', this.getAttribute('name'));
    Versal.registerElementDefinition(this);
    console.log(this);
  };

  document.registerElement('versal-element', {
    prototype: VersalElementDirective
  })
})();
*/
