sinon = require 'sinon'
assert = require 'assert'

Player = require '../src/versal-player-api'

describe 'Player API', ->
  player = new Player('localhost')

  it 'should re-trigger known events on player', ->
    spy = sinon.spy()
    evt = { origin: 'localhost', data: { name: 'foo', detail: 'bar' } }

    player.addEventListener 'foo', spy
    player.handleMessage evt

    assert spy.calledWith(evt.data.detail)
