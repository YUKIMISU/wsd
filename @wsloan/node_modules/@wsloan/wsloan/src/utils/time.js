var ajax = require('ajax');
var api=require("../config/api")
// var mediator=require("../utils/mediator")
var utils = require('./mini-utils')
module.exports = function (Promise) {
  return {
    get: function () {
      return new Promise(function (resolve, reject) {
        if (location.href.indexOf('readLocalTime=1') > -1 && wsloan.isTest) {
          var data = {
            code: 1,
            message: null,
            content: new Date
          }
          resolve(data);

        } else {
          ajax({
            url: api.AppApi,
            request: 'ajax',
            data: {
              q: 'serverTime',
              testTime : decodeURIComponent(utils.getString('testTime'))
            },
            success: function (data) {
              resolve(data);
            }
          });
        }
      });
    },
    serverTime: function () {
      this.get().then(function (time) {
      }); 
    
    },
    isExpired: function (date) {
      return new Date(date).getTime() - new Date(this.serverTime).getTime() < 0;
    },

    countDown: function (time, callback) {
      var that = this;
      return new Promise(function (resolve, reject) {
        wsloan.mediator.on('getServerTime', function () {
          var milliSeconds = new Date(time).getTime() - new Date(that.serverTime).getTime();
          if (milliSeconds < 0) {
            resolve();
            return false;
          }

          var timer = setInterval(function () {
            typeof callback === 'function' ? callback(that.formatFromMilli(milliSeconds)) : '';
            milliSeconds = milliSeconds - 1000;
            if (milliSeconds < 0) {
              clearInterval(timer);
              resolve();
            }
          }, 1000);
        });
      });
    },

    timer: function (time, tween, done) {
      var timer = setInterval(function () {
        typeof tween === 'function' && tween(time);
        time--;
        if (time < 0) {
          clearInterval(timer);
          typeof done === 'function' && done();
        }
      }, 1000);
    }
  };
};
