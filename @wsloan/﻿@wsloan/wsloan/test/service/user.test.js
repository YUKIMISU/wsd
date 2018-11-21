var $ = require('../test-libs/jquery')
var _ = require('../test-libs/underscore')

window.$ = $
window._ = _

var wsloan = require('../../src/entries/pc')

var expect = require('chai').expect

describe('user', function () {
  this.timeout(10000)

  it.skip('未登录时, 获取用户信息:', function (done) {
    wsloan.user.init()
    wsloan.mediator.on('user.ready', function (data) {
      expect(data.isLogin).to.be.equal(0)
      done()
    })
  })

  it.skip('登录后, 获取用户信息:', function (done) {
    $('body').html('<img src="http://192.168.3.36/tpcode.ashx"/>')
    $('img')[0].onload = function () {
      setTimeout(() => {
        var result = prompt('输入验证码')

        // TODO:没法请求. 要么跨域. 要么需要验证码
        $.ajax({
          url: 'http://192.168.3.36/APPapi/wap.ashx',
          type: 'post',
          crossDomain: true,
          xhrFields: {withCredentials: true},
          data: {
            q: 'login',
            yhm: 13100000003,
            pass: 123456,
            code: result,
            bc: 3,
            from: 2
          },
          success: function (data) {
            console.log(data)
            done()
          },
          error: function () {
            done()
          }
        })
      }, 500)

    }

  })
})
