/**
 * 将 app 的wsloan 接口 适配成跟PC的一样
 */

module.exports = function (wsloan) {
  wsloan.API = wsloan.config.API;
  wsloan.platform = wsloan.system.systemType;
  wsloan.service = wsloan.business;
};
