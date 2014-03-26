HTMLElement = require('./html/element')
VersalElement = require('../src/versal-element')
assert = require 'assert'

describe 'VersalElement', ->
  htmlelement = new HTMLElement({ name: 'foo-bar', attributes: 'foo bar'})

  it 'exposes specified attributes via properties', ->
    props = Object.getOwnPropertyNames(new VersalElement(htmlelement))
    assert(props.indexOf('foo') >= 0)
    assert(props.indexOf('bar') >= 0)
