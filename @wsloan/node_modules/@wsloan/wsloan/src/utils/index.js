var store = require('store');
// var cookie = require("./cookie.compatible.js");
var time = require('./time.js');
var json = require('./json/index.js');
var utils = require('./mini-utils/index.js');
// var format = require('./format.js');
var ua = require('./ua.js');
var facility = require('./base.js');

var assign = require('../polyfill/assign.js');

var helper;

String.prototype.trim = String.prototype.trim || function () {
  return this.replace(/(^\s*)|(\s*$)/g, '');
}


helper = assign(utils, {
  store: store,
  time: time(require('promise')),
  json: json,
  // format: format,
  ua: ua,
  facility: facility
});

module.exports = helper;

/**
 * 11.15更新 
 * format.phone => substrPhone
 * utils.format.*下的 移动到 mini-utils下 = utils.*
 */