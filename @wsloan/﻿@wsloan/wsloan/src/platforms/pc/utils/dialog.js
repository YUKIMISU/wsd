var layer = require('../libs/layer/index.js')
require('../libs/layer/index.css')

module.exports = {
  alert: function alert(obj) {
    var _ref$message = obj.message,
        message = _ref$message === undefined ? '' : _ref$message,
        _ref$success = obj.success,
        success = _ref$success === undefined ? function () {} : _ref$success,
        _ref$title = obj.title,
        title = _ref$title === undefined ? '信息' : _ref$title;

    var index = layer.alert(message, {
      title: title
    }, function () {
      success();
      layer.close(index);
    });
  },
  confirm: function confirm(obj) {
    var _ref2$title = obj.title,
        title = _ref2$title === undefined ? '' : _ref2$title,
        _ref2$message = obj.message,
        message = _ref2$message === undefined ? '' : _ref2$message,
        _ref2$btnText = obj.btnText,
        btnText = _ref2$btnText === undefined ? '确定' : _ref2$btnText,
        _ref2$canText = obj.canText,
        canText = _ref2$canText === undefined ? '取消' : _ref2$canText,
        _ref2$success = obj.success,
        success = _ref2$success === undefined ? function () {} : _ref2$success,
        _ref2$fail = obj.fail,
        fail = _ref2$fail === undefined ? function () {} : _ref2$fail,
        _ref2$close = obj.close,
        close = _ref2$close === undefined ? function () {} : _ref2$close;

    var index = layer.open({
      title: title,
      content: message,
      btn: [btnText, canText],
      yes: function yes() {
        success();
        layer.close(index);
      },
      btn2: fail,
      cancel: close
    });
  },
  toast: function toast(msg) {
    if (typeof msg === 'string') {
      layer.msg(msg);
    } else {
      var index = 0;
      var iconArr = {
        warn: 0,
        success: 1,
        error: 2,
        cancel: 2
      };
      var icon;
      if (!msg.type || msg.type === 'text') {
        icon = {};
      } else {
        icon = {icon: iconArr[msg.type]}
      }
      layer.msg(msg.message, icon);
    }
  },
  layer: layer
};