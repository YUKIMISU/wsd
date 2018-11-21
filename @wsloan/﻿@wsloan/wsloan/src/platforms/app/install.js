/**
 * 这里添加需要添加的方法
 */

require('./utils/rem.js');
require('./styles/reset.less');

var ajax = require('./utils/ajax.js');
var dialog = require('../../utils/dialog');
var dialogActions = require('./utils/dialog.js');
// var statistic= require('./')

module.exports = function (wsloan) {
  wsloan.ajax = ajax;
  // 需要从 wsloan 添加到 Vue实例 的列表
  let add_lists = ['alert', 'confirm', 'toast'];

  function add (lists, Vue) {
    lists.forEach(list => {
      Vue.prototype['$' + list] = wsloan[list];
    });
  }
  wsloan.install = function (Vue, payload) {
    // 安装监听
    wsloan.mediator = new Vue();
    mediatorInstall(wsloan);
    wsloan.vue = Vue;
    Vue.prototype.$wsloan = wsloan;
    Vue.prototype.$ajax = ajax;


    // Vue.config.silent = !wsloan.business.isTest;
    // Vue.config.devtools = wsloan.business.isTest;

    // ======================================================
    // 安装弹窗组件
    // 按需安装
    payload.AlertPlugin && Vue.use(payload.AlertPlugin);
    payload.ConfirmPlugin && Vue.use(payload.ConfirmPlugin);
    payload.ToastPlugin && Vue.use(payload.ToastPlugin);
    payload.LoadingPlugin && Vue.use(payload.LoadingPlugin);
    // 安装对话框
    dialog = dialog(dialogActions, Vue);
    wsloan.extend(dialog);
    add(add_lists, Vue);
    // 封装 warn success text 方法
    payload.ToastPlugin && ['success', 'warn', 'cancel', 'text'].forEach(type => {
      Vue.prototype[`$${type}`] = message => {
        wsloan.toast({
          message,
          type
        });
      };
    });
    // ======================================================

    window.wsloan = wsloan;
  };
};

function mediatorInstall (wsloan) {
  ['on', 'off', 'once'].forEach(key => {
    wsloan.mediator[key] = wsloan.mediator['$' + key];
  });
  wsloan.mediator.trigger = wsloan.mediator.$emit;
}
