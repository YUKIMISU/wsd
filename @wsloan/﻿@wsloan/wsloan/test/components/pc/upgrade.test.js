var $ = require('../../test-libs/jquery')
var _ = require('../../test-libs/underscore')

window.$ = $
window._ = _

var userInfo = require('../../test-libs/userInfo')

var wsloan = require('../../../src/entries/pc')
var store = require('store')
var upgrade = require('../../../components/pc/upgrade/index.js')

var expect = require('chai').expect

// 目前还测试不了用户登录状态. 所以全部都通过自己手动赋值了
describe('PC组件: Upgrade', function () {
  this.timeout(1000)

  beforeEach(function () {
    window.wsloan = wsloan
    store.set('userInfo', userInfo, 'd1')
    // upgrade.userInfo = userInfo
  })

  afterEach(function () {
    window.wsloan = wsloan
    store.set('userInfo', {}, 'd1')
  })

  // it('初始化', function () {
    
  // })

  it('checkUnusual', function (done) {
    var result = upgrade.checkUnusual()

    expect(result).to.be.true

    upgrade.userInfo.isUnusual = true

    result = upgrade.checkUnusual()

    setTimeout(function () {
      // 保证弹窗
      expect($('.layui-layer').length).to.be.equal(1)
      // 弹窗内容正确
      expect($('.draw-cash-tip').text()).to.have.string('由于你的账户信息不符合银行存管开户条件')
      $('.J_pop_close').trigger('click')
      setTimeout(function () {
        expect($('.layui-layer').length).to.be.equal(0)
        done()
      }, 300)
    }, 300)
  })

  it('checkGoRecharge', function () {
    var isRecharge = false
    $('body').append('<div class="ceshi"></div>')
    $('.ceshi').on('click', function (event) {
      expect(upgrade.checkGoRecharge(event)).to.be.equal(isRecharge)
    })
    $('.ceshi').trigger('click')

    $('.ceshi').text('充值')
    isRecharge = true
    $('.ceshi').trigger('click')
  })

  it('checkHasCustody', function (done) {
    window.wsloan.strategy = {
      isOpenCustody: true
    }
    userInfo.isCustody = false
    // 设置满足条件
    store.set('userInfo', userInfo, 'd1')
    let result = upgrade.checkHasCustody()

    setTimeout(function () {
      expect($('.layui-layer').length).to.be.equal(1)
      expect($('.upgrade-pop-body-subtitle').text()).to.have.string('温商贷个人账户全面升级为银行存管账户')
      $('.J_pop_close').trigger('click')

      setTimeout(function () {
        expect($('.layui-layer').length).to.be.equal(0)
        done()
      }, 300)
    }, 300)
  })
  
  it('popBeforeRedirect', function (done) {
    var num1 = 0
    var num2 = 0
    upgrade.popBeforeRedirect({
      tplType: 'auto',
      cb: function () {
        num1++
      }
    })
    expect(num1).to.be.equal(1)

    layer.closeAll()
    setTimeout(function () {
      upgrade.popBeforeRedirect({
        tplType: 'redirect',
        cb: function () {
          num2++
        }
      })
      expect(num2).to.be.equal(0)
      $('#J_do_redirect').trigger('click')
      expect(num2).to.be.equal(1)
      layer.closeAll()
      done()
    }, 300)
  })
})

