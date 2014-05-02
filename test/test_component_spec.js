describe('test-component', function() {
  it('renders NEW CONTENT instead of the original content', function(done){
    var div = document.createElement('div');
    div.innerHTML = '<test-component data-new-content="NEW CONTENT">Original content</test-component>';
    document.body.appendChild(div);

    setTimeout(function(){
      chai.expect(div.children[0].innerHTML).to.eq('NEW CONTENT');
      done();
    }, 100);
  });
});
