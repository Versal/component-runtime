class HTMLElement
  constructor: (attrs) ->
    @attributes = attrs || {}

  setAttribute: (name, value) ->
    @attributes[name] = value

  getAttribute: (name) ->
    @attributes[name]

  hasAttribute: (name) ->
    @attributes.hasOwnProperty(name)

module.exports = HTMLElement
