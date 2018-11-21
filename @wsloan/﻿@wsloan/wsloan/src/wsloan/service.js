var util = require('../utils/index');
var user = require('../service/user');
var wsloanService = {};
util.Base.mix(wsloanService,
    {
        user: user
    }
);

window.wsloanService = wsloanService;
module.exports = wsloanService;