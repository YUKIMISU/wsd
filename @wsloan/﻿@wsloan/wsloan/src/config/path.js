var config = require('./base');
var isTest = config.isTest;
// var testHOST = config.isWeixin ? 'wsloan-stg.wsloan.com' :  '122.228.132.78'
var currentHost = isTest ? '36.7.138.114' : location.host; // 36.7.138.114
var isLocal = !!location.host.match(/localhost|192\.168/);

var realHost = '//www.wsloan.com';
var path = {
  HOST: isTest ? location.protocol + "//" + currentHost + ":885" : realHost,
  HFHOST: isTest ? location.protocol + '//' + currentHost + ':8016/WSSrBank' : location.protocol + '//cgapi.wsloan.com',
  HOSTS: isTest ? location.protocol + "//" + currentHost + ":885" : "https:" + realHost,
  HTML: isTest ? location.protocol + "//" + currentHost + ":885" : "https://static.wsloan.com/html/",
  BBS_HOST_PC: isTest ? location.protocol + "//" + currentHost + ":126" : "http://bbs.wsloan.com",
  ACTIVE_HOST: isTest ? location.protocol + "//" + currentHost + ":124" : location.protocol + "//active.wsloan.com",
  BBS_API: isTest ? location.protocol + "//" + currentHost + ":8754" : location.protocol + "//sq2.wsloan.com",
  BBS_HOST: isTest ? location.protocol + "//" + currentHost + ":85" : location.protocol + "//sq2.wsloan.com",
  BBS_HOST_OLD: isTest ? location.protocol + "//" + currentHost + ":85" : location.protocol + "//sq1.wsloan.com",
  EX_HOST: isTest ? location.protocol + "//" + currentHost + ":1080" : location.protocol + "//www.tianjiushicai.com",
  PATH_QZTP: location.protocol + '//bbsstatic.wsloan.com/picfile/qztp/',
  PATH_YHTX: location.protocol + '//bbsstatic.wsloan.com/picfile/yhtx/',
  PATH_FILE: location.protocol + '//bbsstatic.wsloan.com/picfile/',
  PATH_IMAGES: location.protocol + '//bbsstatic.wsloan.com/images/',
  PATH_PIC: location.protocol + '//sq1.wsloan.com/AppV2/source/pic/',
  STATIC_IMG_PATH: location.protocol + '//static.wsloan.com/picfile/',
  MOBILE: isTest ? location.protocol + '//' + currentHost + ':124/app/wap' : location.protocol + '//m.wsloan.com/index.html',
  dirname: isLocal ? '/' : isTest ? '/ws.pc/dist/' : '/',
  Fe: isTest ? location.protocol + '//' + currentHost + ':8880' : location.protocol + '//fe.wsloan.com',
  ACTIVE: isTest ? location.protocol + "//" + currentHost + ":222" : location.protocol + "//1212.wsloan.com",
  WXACTIVE: isTest ? location.protocol + "//" + '192.168.3.26' + ":5001" : location.protocol + "//wx.wsloan.com",
  CG: isTest ? location.protocol + '//' + currentHost + ':8016/WSSrBank' : location.protocol + '//cgapi.wsloan.com',
  EIGHT: isTest ? location.protocol + "//" + currentHost + ":8076" : location.protocol + "//www.8jielicai.com"

};
// 交叉引用导致出错. 调整
// config.mix(config, {
//     path: path
// });
config.path = path
module.exports = path;