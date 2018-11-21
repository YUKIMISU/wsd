var API = require('../config/api.js');
var path = require('../config/path.js');
var mediator = require('../utils/mediator.js');
var observe = require('../utils/observe.js');
var ajax = require('../platforms/pc/utils/ajax'); 

module.exports = {
  API: API,
  path: path,
  mediator: mediator,
  observe: observe,
  ajax: ajax
};
