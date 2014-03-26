Muni = require '../src/muni'
assert = require 'assert'
sinon = require 'sinon'

describe 'Muni', ->
  muni = null
  recipient = null

  beforeEach ->
    origin = 'localhost'
    iframe =
      contentWindow: { postMessage: sinon.spy() }
      addEventListener: (name, fn) -> null
    recipient = iframe.contentWindow
    muni = new Muni { origin, iframe }

  it 'onMessage shall emit events', ->
    listener = sinon.spy()
    muni.addListener 'foo', listener
    muni.onMessage { origin: 'localhost', data: { name: 'foo' } }
    assert listener.called

  # To work with attributes we use "sendAttribute" instead of
  # "setAttribute" to avoid conflicts with native setAttribute method
  it 'one attribute shall pass', ->
    muni.sendAttribute 'foo', 1

    message = recipient.postMessage.getCall(0).args[0]
    assert.equal message.name, 'setAttribute'
    assert.deepEqual message.detail, { name: 'foo', value: 1 }

  it 'many attributes shall pass', ->
    muni.sendAttributes { foo: 2, bar: 3 }

    message1 = recipient.postMessage.getCall(0).args[0]
    assert.equal message1.name, 'setAttribute'
    assert.deepEqual message1.detail, { name: 'foo', value: 2 }

    message2 = recipient.postMessage.getCall(1).args[0]
    assert.equal message2.name, 'setAttribute'
    assert.deepEqual message2.detail, { name: 'bar', value: 3 }

  it 'attached shall pass', ->
    muni.send 'attached'
    message = recipient.postMessage.getCall(0).args[0]
    assert.equal message.name, 'attached'

  it 'detached shall pass', ->
    muni.send 'detached'
    message = recipient.postMessage.getCall(0).args[0]
    assert.equal message.name, 'detached'

  it 'foo shall not pass', ->
    muni.send 'foo'
    assert !recipient.postMessage.called
