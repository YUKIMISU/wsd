let install = require('../platforms/app/install.js');
let business = require('../service/index.js');
let service = require('../service/index.js');
// let system = require('../service/system.js');
let go = require('../service/go');
let config = require('../config/');
let utils = require('../utils/index.js');
let path = require('../config/path.js');
let native = require('../platforms/app/service/native.js');
let userId = require('../platforms/app/service/getUserid.js');
let adapt = require('./adapt.js');
let verify = require('../utils/verify.js')
let statistic = require('../service/statistics.js')
let debug = require('../service/debug')
const wsloan = {
  business,
  go,
  config,
  utils,
  path,
  verify
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
wsloan.extend(service);
wsloan.extend(config);
install(wsloan);

/**
 * 完毕后 触发获取用户信息
 */

window.wsloan = wsloan;

adapt(wsloan);

native(wsloan);
setTimeout(() => {
  
  
  userId(wsloan);
  statistic(); // wsloan的统计代码 
  debug();
});
console.error('已停止维护entries/app.js,请使用app.new.js')
module.exports = wsloan;


