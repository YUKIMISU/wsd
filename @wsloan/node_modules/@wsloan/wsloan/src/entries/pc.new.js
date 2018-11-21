var system = require('../service/system.js');
var utils = require('../utils/index.js');
var go = require('../service/go');

var verify = require('../utils/verify');
var install = require('../platforms/pc/install.js');

var dialog = require('../utils/dialog.js');
dialog = dialog(require('../platforms/pc/utils/dialog.js'));
var API = require('../config/api');
var path = require('../config/path');
var mediator = require('../utils/mediator');
var ajax = require('../platforms/pc/utils/ajax.js');
var service = require('../service/index.js');
var statistic = require('../service/statistics.js')
require('./console.js');
var config = require('../config');
var store = require('store');
utils.cookie = store;
var wsloan = {
  business: service,
  service: service,
  API: API,
  mediator: mediator,
  ajax: ajax,
  verify: verify,
  path: path,
  utils: utils
};

wsloan.extend = function (obj) {
  var key;
  for (key in obj) {
    if (this[key]) {
      // throw new Error('属性名重复');
    } else {
      this[key] = obj[key];
    }
  }
};
// wsloan.extend(system);
wsloan.extend({go: go});
wsloan.extend(dialog);
wsloan.extend(service);
wsloan.extend(config);
// wsloan.extend({
//   config:config
// });
install(wsloan);
// statistic(); // wsloan的统计代码

module.exports = wsloan;
