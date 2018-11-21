var $ = require('../../test/test-libs/jquery');
var _ = require('../../test/test-libs/underscore');
window.$ = $;
window._ = _;
var View = require('../view/index.js');
window.View = View;
var laydate = require('../platforms/pc/libs/layer/laydate.dev');
window.laydate = laydate;
var layer = require('../platforms/pc/libs/layer/index');
window.layer = layer;

var wsloan = require('./pc');

window.wsloan = wsloan;
module.exports = wsloan;
