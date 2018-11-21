var store = require('store');
// var cookie = require('../utils/cookie.js');
var API = require('../config/api.js');
var ajax = require('ajax');
var go = require('./go.js');
var assign = require('../polyfill/assign.js');
var isEmptyObject = require('../utils/base').Base.isEmptyObject

module.exports = {
  init: function () {
    if (isEmptyObject(this.get()) || !this.get().isLogin) {
      this.update('ready');
    } else {
      wsloan
        .mediator
        .trigger('user.ready');
    }
  },
  get: function () {
    return store.get('userInfo') || {
      isLogin: 0
    };
  },
  update: function (type, cb) {
    var that = this;
    type = type || 'ready';
    return ajax({
      // TODO:替换
      url: 'http://122.228.132.78:8085/FanLiWangQian/person/getUser.do',
      success: function (data) {

        // 设置用户信息缓存
        var info = {};
        var user = data.content || {};
        that.set(data.content)
        setTimeout(() => {
          wsloan && wsloan.mediator && wsloan.mediator.$emit('user.' + type, user);
        });
        cb && cb();
      },
      error: function (data) {
        // 报错处理
        var userInfo = store.get('userInfo');
        data.status != 0 && alert('数据出错, 请联系客服');
        // console.log('user error: ' + JSON.stringify(data));
        if (window.fundebug && window.fundebug.notifyError) {
          window.fundebug.notifyError({
            name: '用户信息获取错误',
            message: JSON.stringify(data) + ',userInfo=' + JSON.stringify(userInfo),
            severity: 'warning'
          });
        }
        if (wsloan.isWap || wsloan.isApp) {
          wsloan.mediator.trigger('user.' + type, {});
        }
      }
    });
  },
  set: function (data) {
    store.set('userInfo', data, 'd1');
  },
  del: function () {
    store.set('userInfo', {}, 'd1');
  }

};