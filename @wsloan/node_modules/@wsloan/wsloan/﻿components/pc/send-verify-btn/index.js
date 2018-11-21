var template = '<a href="javascript:;">发送验证码</a>';

module.exports = {
  template: template,
  data: {
    timer: '',
    isCountdown: false,
    time: 60,
    api: ''
  },
  events: {
    'click a': function ($vm) {
      var $this = $(this)
      if ($vm.isCountdown) {
        wsloan.alert({
          message: '请过一分钟后再点击'
        })
        return false
      }
      $vm.send()
    }
  },
  methods: {
    count: function () {
      if (this.isCountdown) return false
      var that = this
      var $a = this.$el.find('a')
      this.time = 60
      this.isCountdown = true
      $a.text(that.time + '秒后重新发送')
      this.timer = setInterval(function () {
        that.time--
        $a.text(that.time + '秒后重新发送')
        if (that.time < 0) {
          $a.text('重新发送验证码')
          clearInterval(that.timer)
          that.isCountdown = false
        }
      }, 1000)
    }
  },
  fetchs: {
    send: function () {
      if (this.isCountdown) return false
      var that = this
      this.ajax({
        request: 'ajax',
        url: this.api,
        success: function () {
          that.count()
        }
      })
    }
  }
}
