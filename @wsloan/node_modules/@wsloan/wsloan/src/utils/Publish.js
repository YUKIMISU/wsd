var mediator = require('./mediator.js')

function Publish () {
  this._events = {}
}

Publish.prototype = mediator;

module.exports = Publish;