EventEmitter = require('events').EventEmitter

# This Player thing should be used inside gadget
# as a convenience API over postMessage.
#
# Supported events:
#   https://github.com/Versal/gadget-api-spec
#
module.exports = class PlayerAPI extends EventEmitter

  constructor: ->
    if typeof window != 'undefined'
      # Re-trigger all incoming messages as events
      window.addEventListener 'message', this.handleMessage.bind(this)

  handleMessage: (evt) ->
    data = evt.data
    this.emit 'message', data
    if data && data.name
      switch data.name
        when 'setAttribute' then this.emit 'setAttribute', data.detail.name, data.detail.value
        else this.emit data.name, data.detail

  on: ->
    this.addListener.apply(this, arguments)

  off: ->
    this.removeListener.apply(this, arguments)

  addEventListener: ->
    this.addListener.apply(this, arguments)

  removeEventListener: ->
    this.removeListener.apply(this, arguments)

  sendMessage: (name, detail) ->
    window.parent.postMessage { name, detail }, window.location.origin
