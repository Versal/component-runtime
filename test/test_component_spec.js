describe('test-component', function() {

  before(function(done) {
    //WebComponentsReady event is
    //fired only once after custom elments polyfill finished its start up tasks
    //all subequent upgrades are done by MutationObserver hence no more events
    window.addEventListener('WebComponentsReady', function() {
      done();
    });
  });

  beforeEach(function() {
    // this function is called in detachedCallback of the component
    window.detachedCallbackFromGadget = function(){};
  });

  afterEach(function(){
    delete window.detachedCallbackFromGadget;
  });

  it('renders NEW CONTENT instead of the original content', function(done){
    var div = document.createElement('div');
    div.innerHTML = '<test-component data-new-content="NEW CONTENT">Original content</test-component>';
    document.body.appendChild(div);

    setTimeout(function(){
      //need to wait for upgrade to finish
      //can set to zero for browsers with native mutation observer
      //need a longer time for browsers without native mutation observer
      var element = document.querySelector('test-component');
      expect(element.innerHTML).to.eq('NEW CONTENT');
      document.body.removeChild(div);
      done();
    }, 100);
  });

  it('fires detachedCallback when removing the custom element', function(done){
    var element = document.createElement('test-component');
    document.body.appendChild(element);

    window.detachedCallbackFromGadget = function() {
      done();
    };
    setTimeout(function(){
      document.body.removeChild(element);
    }, 100);

  });

  it('fires detachedCallback when removing the parent of the custom element', function(done){
    var div = document.createElement('div');
    div.innerHTML = '<test-component data-new-content="NEW CONTENT">Original content</test-component>';
    document.body.appendChild(div);

    window.detachedCallbackFromGadget = function() {
      done();
    };
    setTimeout(function(){
      document.body.removeChild(div);
    }, 100);

  });


  it('fires detachedCallback when removing the parents of the custom element', function(done){
    //create a custom element nested in eleven divs
    var i = 0, tempDiv;
    var walker = function(input){
      tempDiv = document.createElement('div');
      if(i >= 9) {
        tempDiv.innerHTML = '<test-component data-new-content="NEW CONTENT">Original content</test-component>';
        input.appendChild(tempDiv);
        return;
      } else {
        input.appendChild(tempDiv);
        i++;
        walker(tempDiv);
      }
    };

    var div = document.createElement('div');
    walker(div);
    document.body.appendChild(div);

    window.detachedCallbackFromGadget = function() {
      done();
    };
    setTimeout(function(){
      document.body.removeChild(div);
    }, 100);

  });

  it('fires detachedCallback when removing and adding back the custom element', function(done){
    var element = document.createElement('test-component');
    document.body.appendChild(element);

    var i = 0;
    window.detachedCallbackFromGadget = function() {
      i++;  //count number of invocations
      if(i >= 2) {
        // only done after the attachedCallback is fired twice or more
        done();
      }
    };

    setTimeout(function(){ //wait for upgrade
      document.body.removeChild(element);

      //wait for mutation observer to fire
      //if not setTimeout, then detachedCallback is not fired for the removeChild above
      setTimeout(function(){
        document.body.appendChild(element);
        setTimeout(function(){
          document.body.removeChild(element);
        }, 100);
      }, 100);

    }, 100);

  });
});
