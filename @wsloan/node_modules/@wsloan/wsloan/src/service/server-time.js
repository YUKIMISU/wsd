
var ajax = require('ajax');
var utils = require('../utils')
module.exports = {
  get: function (testTime) {
    return ajax({
      url: wsloan.API.AppApi,
      request: 'ajax',
      data: {
        q: 'serverTime',
        testTime: decodeURIComponent(utils.getString('testTime'))
      },
      success: function (data) {
        wsloan.mediator.trigger('getServerTime', data);
      }
    });
  }
};