var util = require('../utils/index');
var config = require('../config/index');
var user = require('../service/user-manage');
var ajax = require("ajax")
var log = function() {
    !config.isLtIE9 && config.isTest && config.isPC && console.log.apply(null, arguments)
};

var wsloan = util;
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
util.Base.mix(wsloan,
    {
        log: log,
        util: util,
        ajax:ajax,
        config: config,
        user:user
    }
);

window.wsloan = wsloan;
module.exports = wsloan;