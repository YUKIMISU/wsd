var _ua = navigator.userAgent.toLocaleLowerCase();
var ua = require('../utils/ua');

var isTest = location.host.match(/192|122|127|localhost|10[.]0/) != null,
  isPC = /windows|macintosh/.test(ua.os),
  isIOS = !!ua.ios,
  isAndriod = !!ua.android,
  isLtIE9 = ua.ie && ua.ie < 9,
  isApp = _ua.indexOf('wsloan') > -1,
  isWap = (isIOS || isAndriod) && !isApp,
  isWeixin = _ua.indexOf('micromessenger') > -1,
  systemType = isPC ? 'PC' : (isApp ? 'app' : 'wap'),
  platform = systemType

module.exports = {
  isPC: isPC,
  isApp: isApp,
  isWap: !isPC && !isApp,
  isWeixin: isWeixin,
  isLtIE9: isLtIE9,
  systemType: systemType,
  isIOS: isIOS,
  isAnd: isAndriod
};