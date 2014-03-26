GadgetAPI = require '../src/versal-gadget-api'
assert = require 'assert'
sinon = require 'sinon'

# Gadget API takes HTML element and exposes it as a gadget.
describe 'Versal Gadget API', ->
  gadget = null
  recipient = null

  beforeEach ->
    recipient = postMessage: sinon.spy()
    gadget = new GadgetAPI recipient, 'localhost'

  # To work with attributes we use "sendAttribute" instead of
  # "setAttribute" to avoid conflicts with native setAttribute method
  it 'one attribute shall pass', ->
    gadget.sendAttribute 'foo', 1

    message = recipient.postMessage.getCall(0).args[0]
    assert.equal message.name, 'setAttribute'
    assert.equal message.detail.foo, 1

  it 'multiple attributes shall pass', ->
    gadget.sendAttributes { foo: 2, bar: 3 }

    message1 = recipient.postMessage.getCall(0).args[0]
    assert.equal message1.name, 'setAttribute'
    assert.equal message1.detail.foo, 2

    message2 = recipient.postMessage.getCall(1).args[0]
    assert.equal message2.name, 'setAttribute'
    assert.equal message2.detail.bar, 3

  it 'attached shall pass', ->
    gadget.send 'attached'
    message = recipient.postMessage.getCall(0).args[0]
    assert.equal message.name, 'attached'

  it 'detached shall pass', ->
    gadget.send 'detached'
    message = recipient.postMessage.getCall(0).args[0]
    assert.equal message.name, 'detached'

  it 'foo shall not pass', ->
    gadget.send 'foo'
    assert !recipient.postMessage.called
