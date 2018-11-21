/**
 * @desc webpack打包入口文件
 */
var arrayEqual = require('./array/arrayEqual')

var addClass = require('./class/addClass')
var hasClass = require('./class/hasClass')
var removeClass = require('./class/removeClass')

var getCookie = require('./cookie/getCookie')
var removeCookie = require('./cookie/removeCookie')
var setCookie = require('./cookie/setCookie')

var getOS = require('./device/getOS')
var getExplore = require('./device/getExplore')

var getScrollTop = require('./dom/getScrollTop')
var offset = require('./dom/offset')
var scrollTo = require('./dom/scrollTo')
var setScrollTop = require('./dom/setScrollTop')

var debounce = require('./function/debounce')
var throttle = require('./function/throttle')

var getKeyName = require('./keycode/getKeyName')

var deepClone = require('./object/deepClone')
var isEmptyObject = require('./object/isEmptyObject')

var randomColor = require('./random/randomColor')
var randomNum = require('./random/randomNum')

var isEmail = require('./regexp/isEmail')
var isIdCard = require('./regexp/isIdCard')
var isPhoneNum = require('./regexp/isPhoneNum')
var isUrl = require('./regexp/isUrl')

var digitUppercase = require('./string/digitUppercase')

var isSupportWebP = require('./support/isSupportWebP')

var formatPassTime = require('./time/formatPassTime')
var formatRemainTime = require('./time/formatRemainTime')

var parseQueryString = require('./url/parseQueryString')
var stringfyQueryString = require('./url/stringfyQueryString')

// 新增
var formatNumberToThounsands = require('./number/formatNumberToThousands')
var getString = require('./url/getString')
var substrName = require('./string/substrName')
var toPrecise = require('./number/toPrecise')
var formatFromMilli = require('./time/formatFromMilli')
var dateFormat = require('./time/dataFormat')
var substrPhone = require('./number/substrPhone')
var inputMoney = require('./number/inputMoney')
var tplBind = require('./function/tplBind')
module.exports = {
    arrayEqual:arrayEqual,

    addClass:addClass,
    hasClass:hasClass,
    removeClass:removeClass,

    getCookie:getCookie,
    removeCookie:removeCookie,
    setCookie:setCookie,

    getOS:getOS,
    getExplore:getExplore,

    getScrollTop:getScrollTop,
    offset:offset,
    scrollTo:scrollTo,
    setScrollTop:setScrollTop,

    debounce:debounce,
    throttle:throttle,

    getKeyName:getKeyName,

    deepClone:deepClone,
    isEmptyObject:isEmptyObject,

    randomColor:randomColor,
    randomNum:randomNum,

    isEmail:isEmail,
    isIdCard:isIdCard,
    isPhoneNum:isPhoneNum,
    isUrl:isUrl,

    digitUppercase:digitUppercase,

    isSupportWebP:isSupportWebP,

    formatPassTime:formatPassTime,
    formatRemainTime:formatRemainTime,
    parseQueryString:parseQueryString,
    stringfyQueryString:stringfyQueryString,
    // 新增
    formatNumberToThounsands:formatNumberToThounsands,
    formatNumberToThousands:formatNumberToThounsands,
    getString:getString,
   
    substrName:substrName,
    toPrecise:toPrecise,
    formatFromMilli:formatFromMilli,
    dateFormat:dateFormat,
    substrPhone:substrPhone,
    inputMoney:inputMoney,
    tplBind:tplBind
}