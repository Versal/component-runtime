GadgetAPI = require '../src/versal-gadget-api'
assert = require 'assert'
sinon = require 'sinon'

# Gadget API takes HTML element and exposes it as a gadget.
describe 'Versal Gadget API', ->
  gadget = null
  recipient = null

  beforeEach ->
    iframe = contentWindow: { postMessage: sinon.spy() }
    recipient = iframe.contentWindow
    gadget = new GadgetAPI iframe, 'localhost'

  # To work with attributes we use "sendAttribute" instead of
  # "setAttribute" to avoid conflicts with native setAttribute method
  it 'one attribute shall pass', ->
    gadget.sendAttribute 'foo', 1

    message = recipient.postMessage.getCall(0).args[0]
    assert.equal message.name, 'setAttribute'
    assert.deepEqual message.detail, { name: 'foo', value: 1 }

  it 'many attributes shall pass', ->
    gadget.sendAttributes { foo: 2, bar: 3 }

    message1 = recipient.postMessage.getCall(0).args[0]
    assert.equal message1.name, 'setAttribute'
    assert.deepEqual message1.detail, { name: 'foo', value: 2 }

    message2 = recipient.postMessage.getCall(1).args[0]
    assert.equal message2.name, 'setAttribute'
    assert.deepEqual message2.detail, { name: 'bar', value: 3 }

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
