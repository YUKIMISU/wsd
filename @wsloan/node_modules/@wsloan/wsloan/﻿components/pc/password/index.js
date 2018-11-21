var html = require('./index.html');
var $ = window.$;
var $html = $(html);
var isInit = false;

module.exports = {
  $html: $html,

  success: function () {},

  init: function (success) {
    if (isInit) return false;
    isInit = true;
    $('body').append(this.$html);
    this.$html = $('body').find('.password-mask');
    this.eventBind();
    this.success = success || function () {};
  },

  eventBind: function () {
    var that = this;

    this.$html.on('click', '.password-btn-clear, .password-close', function () {
      that.$html.fadeOut(400);
    });

    this.$html.on('click', '.password-btn-sure', function () {
      that.success($('#password').val());
    });

  },
  show: function () {
    $('#password').val('');
    this.$html.fadeIn(400);
  },
  hide: function () {
    this.$html.fadeOut(400, function () {
      $('#password').val('');
    });
  }
};
