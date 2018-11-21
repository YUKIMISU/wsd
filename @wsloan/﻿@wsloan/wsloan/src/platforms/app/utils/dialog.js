
function alert (obj, Vue) {
  let btn;
  Vue.$vux.alert.show({
    title: obj.title,
    content: obj.message,
    onShow () {
      btn = document.querySelector('.vux-alert .weui-dialog__btn_primary');
      (obj.success && typeof obj.success === 'function') && btn.addEventListener('click', obj.success);
    },
    onHide () {
      setTimeout(() => {
        (obj.success && typeof obj.success === 'function') && btn.removeEventListener('click', obj.success);
      });
    }
  });
}

function confirm (obj, Vue) {
  Vue.$vux.confirm.show({
    title: obj.title,
    content: obj.message,
    onConfirm: obj.success ? obj.success : () => {},
    onCancel: obj.fail ? obj.fail : () => {},
    confirmText: obj.btnText,
    cancelText: obj.canText
  });
}

function toast (obj, Vue) {
  Vue.$vux.toast.show({
    text: obj.message,
    type: obj.type || 'text'
  });
}

let dialog = {
  alert,
  confirm,
  toast
};

module.exports = dialog;
module.exports.default = dialog;
