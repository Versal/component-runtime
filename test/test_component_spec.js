describe('test-component', function() {
  //WebComponentsReady event is
  //fired only once after custom elments polyfill finished its start up tasks
  //all subequent upgrades are done by MutationObserver hence no more events
  var promise = new Promise(function(resolve, reject){
    window.addEventListener('WebComponentsReady', function() {
      resolve();
    });
  });

  beforeEach(function(done) {
    promise.then(function(){
      done();
    });
  });

  it('renders NEW CONTENT instead of the original content', function(done){
    var div = document.createElement('div');
    div.innerHTML = '<test-component data-new-content="NEW CONTENT">Original content</test-component>';
    document.body.appendChild(div);

    setTimeout(function(){
      //need to wait for upgrade to finish
      var element = document.querySelector('test-component');
      chai.expect(element.innerHTML).to.eq('NEW CONTENT');
      document.body.removeChild(div);
      done();
    }, 0);
  });

  it('fires detachedCallback', function(done){
    var div = document.createElement('div');
    div.innerHTML = '<test-component data-new-content="NEW CONTENT">Original content</test-component>';
    document.body.appendChild(div);

    setTimeout(function(){
      //need to wait for upgrade to finish
      var element = document.querySelector('test-component');
      element.detachedCallback = function(){
        chai.expect(true).to.eq(true);
        done();
      };
      document.body.removeChild(div);
    }, 0);

  });
});
