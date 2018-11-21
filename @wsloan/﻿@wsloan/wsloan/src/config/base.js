// var util = require('../utils/base');

var mix = function (to, from) {
    for (var key in from) {
        to[key] = from[key];
        /*if ( !!to[key] ) {
            // throw new Error('属性名重复');
        }else{
            to[key] = from[key];
        }*/
    }
    return to;
};

var ua = require('../utils/ua');
var isTest = require('./isTest'),
    isPC = /windows|macintosh/.test(ua.os),
    // isIOS = /(iphone|ipad|ipod|ios)/i.test(ua),
    isIOS = ua.os === 'ios',
    isAndriod = ua.os === 'android',
    isWeixin = /micromessenger/.test(ua.os),
    // isAndriod = /(android)/i.test(ua),
    isLtIE9 = ua.ie && ua.ie < 9,
    isApp = navigator.userAgent.toLocaleLowerCase().indexOf('wsloan') > -1,
    isWap = (isIOS || isAndriod) && !isApp,
    platform = isPC ? 'pc' : 'app';

var config = {
    isTest: isTest,
    isPC: isPC,
    isIOS: isIOS,
    isAndriod: isAndriod,
    isLtIE9: isLtIE9,
    isWap: isWap,
    isApp: isApp,
    platform: platform,
    mix: mix
    // mix: util.Base.mix
    // link: link
};
module.exports = config;