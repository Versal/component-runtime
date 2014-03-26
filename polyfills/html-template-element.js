(function(){
  'use strict'
  // If `content` is in HTMLTemplateElement.prototype,
  // then polyfill is not required
  if(window.HTMLTemplateElement && 'content' in window.HTMLTemplateElement.prototype){ return; }

  setTemplateDisplayToNone();
  createHTMLTemplateElementPrototype();
  createTemplateHostDocument();
  polyfillContentProperty();
  upgradeExistingElements();
  setUpObserver();

  function createHTMLTemplateElementPrototype() {
    window.HTMLTemplateElement = function(){
      throw new TypeError('Illegal constructor');
    };
    HTMLTemplateElement.prototype = Object.create(HTMLElement.prototype);
  };

  function setTemplateDisplayToNone(){
    var style = document.createElement('style');
    style.textContent = 'template { display: none; }';
    document.head.appendChild(style);
  };

  function createTemplateHostDocument() {
    // Create inert document to host template's document fragments
    HTMLTemplateElement.prototype._templateHostDocument = document.implementation.createHTMLDocument();
  };

  function polyfillContentProperty() {
    Object.defineProperty(HTMLTemplateElement.prototype, 'content', {
      get: function(){
        if(!this._contentFragment) {
          this._createContentFragment();
        };
        return this._contentFragment;
      }
    });

    // If HTMLTemplateElement is unknown, then
    HTMLTemplateElement.prototype._createContentFragment = function(){
      this._contentFragment = this._templateHostDocument.createDocumentFragment();
      while(this.firstChild) {
        this._contentFragment.appendChild(this.removeChild(this.firstChild));
      }
    };
  };

  function applyPolyfill(template){
    if(template.htmlTemplatePolyfillApplied) { return; }

    template.htmlTemplatePolyfillApplied = true;
    // TODO: or mixin?
    template.__proto__ = HTMLTemplateElement.prototype;
    template._createContentFragment();
  };

  function upgradeExistingElements() {
    Array.prototype.forEach.call(document.querySelectorAll('template'), applyPolyfill);
  };

  function setUpObserver(){
    function childListCallback(mutations){
      Array.prototype.forEach.call(mutations, function(mx){
        if(mx.addedNodes) {
          Array.prototype.forEach.call(mx.addedNodes, function(node) {
            if(node.tagName && node.tagName == 'TEMPLATE') {
              applyPolyfill(node);
            }
          });
        };
      });
    };

    new MutationObserver(childListCallback).observe(document, { subtree: true, childList: true });
  };

})();
