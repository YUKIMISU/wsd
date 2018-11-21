var system = require('../service/system.js');
var utils = require('../utils/index.js');

var verify = require('../utils/verify');

var dialog = require('../utils/dialog.js');
dialog = dialog(require('../platforms/pc/utils/dialog.js'));
var path = require('../config/path');
var mediator = require('../utils/mediator');
var ajax = require('../platforms/pc/utils/ajax.js');
var service = require('../service/index.js');
require('./console.js');

var config = require('../config');
var store = require('store');
utils.cookie = store;
var RB = {
  business: service,
  service: service,
  utils: utils,
  mediator: mediator,
  ajax: ajax,
  verify: verify
};

RB.extend = function (obj) {
  var key;
  for (key in obj) {
    if (this[key]) {
      // throw new Error('属性名重复');
    } else {
      this[key] = obj[key];
    }
  }
};
// RB.extend(system);
// RB.extend({ go: go });
RB.extend(dialog);
RB.extend(service);
RB.extend(config);
// RB.extend({
//   config:config
// });
window.RB = RB;


module.exports = RB;
