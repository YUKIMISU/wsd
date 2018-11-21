let install = require('../platforms/app/install.js');
let system = require('../service/system.js');
let go = require('../service/go');
let config = require('../config/');
let utils = require('../utils/index.js');
let path = require('../config/path.js');
let native = require('../platforms/app/service/native.js');
let userId = require('../platforms/app/service/getUserid.normal.js');
let adapt = require('./adapt.js');
let verify = require('../utils/verify.js')
let statistic = require('../service/statistics.js')

const wsloan = {
  system,
  go,
  config,
  utils,
  path,
  verify,
  statistic
  // user
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


wsloan.extend({go: go});
wsloan.extend(config);
install(wsloan);

/**
 * 完毕后 触发获取用户信息
 */

window.wsloan = wsloan;

adapt(wsloan);

native(wsloan);
setTimeout(() => {
  statistic();
  userId(wsloan);
});
console.error('已停止维护entries/app.normal.js,请使用app.new.js')
module.exports = wsloan;


