//  断言库
var expect = require('chai').expect;
var _ = require('../test-libs/underscore.js')
window._ = _;
//  引用测试函数
var mediator = require('../../src/utils/mediator.js');

describe('mediator', function () {

  it('on时, 里面的方法不执行', function () {
    var num = 0
    mediator.on('test1', function (val) {
      num = val || 1
    })
    expect(num).to.be.equal(0)
  })

  it('trigger后, on监听的方法执行了', function () {
    var num = 0
    mediator.on('test1', function (val) {
      num = val || 1
    })
    mediator.trigger('test1')
    expect(num).to.be.equal(1)
  })

  it('trigger后, 监听的方法能拿到值', function () {
    var num = 0
    mediator.on('test1', function (val) {
      num = val || 1
    })
    mediator.trigger('test1', 2)
    expect(num).to.be.equal(2)
  })


  it('off后, trigger会触发不了', function () {
    var num = 0
    mediator.on('test1', function (val) {
      num = val || 1
    })
    mediator.off('test1')
    mediator.trigger('test1', 3)
    expect(num).to.be.equal(1)
  })

  it('在off后, 再进行on绑定, 会马上执行', function () {
    var num = 0
    mediator.on('test1', function (val) {
      num = val || 1
    })
    mediator.off('test1')
    mediator.trigger('test1', 3)
    mediator.on('test1', function () {
      num = 4
    })
    expect(num).to.be.equal(4)
  })

  it('on监听后, 再trigger, 然后再on的时, 里面的代码应该立即执行, 且能拿到值', function () {
    var num = 0;
    mediator.on('test2', function () {
      num = 1;
    })
    mediator.trigger('test2', 3)
    mediator.on('test2', function (val) {
      num = val;
    })
    expect(num).to.be.equal(3)
  })

  it('once只能接受一次 trigger', function () {
    var num = 0
    mediator.once('test4', function () {
      num ++
    })
    mediator.trigger('test4')
    expect(num).to.be.equal(1)
    mediator.trigger('test4')
    mediator.trigger('test4')
    expect(num).to.be.equal(1)
  })

  it('once在触发一次后, 再进行一次once, 会马上触发', function () {
    var num = 0
    mediator.once('test5', function () {
      num ++
    })
    mediator.trigger('test5')
    mediator.once('test5', function () {
      num = 3
    })
    expect(num).to.be.equal(3)
  })

  it.skip('以下的方法均跳过测试. 目前还没有使用到.', function () {
    // mediator.listenTo
    // mediator.listenToOnce
    // mediator.stopListening
  })

})