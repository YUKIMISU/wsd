var base = require('REPO/base.js');
var business = require('REPO/src/service/index.js');
var system = require('REPO/src/system/index.js');
var utils = require('REPO/src/utils/index.js');
var go = require('REPO/src/service/go');
var config = require('REPO/src/config');



var dialog = require('REPO/src/service/dialog');
var verify = require('REPO/src/utils/verify');
var install = require('WS_DIR/install.js');
dialog = dialog(require('./src/platforms/pc/utils/dialog.js'));
// PC 引用 JSON2.js
require('WS_DIR/utils/JSON.js');

var wsloan = {
  business: business,
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
wsloan.extend(business);
wsloan.extend({
  config:config
})
wsloan.extend(config);
wsloan.extend(system);
wsloan.extend(base);
wsloan.extend({go: go});
wsloan.extend(dialog);
wsloan.extend({verify: verify});
wsloan.extend(utils);

install(wsloan);

module.exports = wsloan;
