//  断言库
var expect = require('chai').expect;

var base = require('../../src/config/base');

describe('base: ', function () {
  it('属性查看', function () {
    expect(base.isTest).to.a('boolean')
    expect(base.isPC).to.a('boolean')
    expect(base.isIOS).to.a('boolean')
    expect(base.isAndriod).to.a('boolean')

    expect(base.isWap).to.a('boolean')
    expect(base.isApp).to.a('boolean')
    expect(base.platform).to.a('string')
    expect(base.mix).to.a('function')
  })

  it('mix', function () {
    var obj1 = {
      a: 1
    }
    var obj2 = {
      b: 1
    }
    base.mix(obj1, obj2)

    expect(obj1.b).to.be.equal(1)
  })
})