var API = require('./src/config/api.js');
var path = require('./src/config/path.js');
var mediator = require('./src/utils/mediator.js');
var observe = require('./src/utils/observe.js');
var ajax = require('./src/platforms/pc/utils/ajax'); 

module.exports = {
  API: API,
  path: path,
  mediator: mediator,
  observe: observe,
  ajax: ajax
};
