var message = require('../service/message.js');
var go = require('../service/go.js');

function confirmSystem (str, confirm, Vue) {
  if (!message[str]) {
    throw new Error('暂无 "' + str + '" 方法');
  }
  var _message$str = message[str];
  var msg = _message$str.message;
  var btnText = _message$str.btnText;
  var link = _message$str.link;

  confirm({
    message: msg,
    btnText: btnText,
    success: function success () {
      go(link);
    }
  }, Vue);
}

module.exports = function (dialog, Vue) {
  var alert = dialog.alert;
  var confirm = dialog.confirm;
  var toast = dialog.toast;

  var $action = {
    alert: function (obj) {
      if (typeof obj === 'string') {
        confirmSystem(obj, confirm, Vue);
      } else {
        alert(obj, Vue);
      }
    },
    confirm: function (obj) {
      if (typeof obj === 'string') {
        confirmSystem(obj, confirm);
      } else {
        confirm(obj, Vue);
      }
    },
    // 信息提示
    toast: function (msg) {
      if (typeof msg === 'string' || typeof msg === 'number') {
        toast({
          message: msg,
          type: 'text'
        });
      } else {
        toast(msg, Vue);
      }

    },
    // 加载
    load: function () {

    }
  };

  dialog.layer && ($action.layer = dialog.layer);

  return $action;
};
