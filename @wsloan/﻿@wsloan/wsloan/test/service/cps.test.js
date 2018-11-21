var expect = require('chai').expect;
var ajax = require('../../src/platforms/pc/utils/ajax.js')
var cps = require('../../src/service/cps.js');

// 原先 CPS 的请求链接
var old_url = cps.url

var user = {
  isCPS: 'xrd8KexOJpqhif%2bi%2fNXEOg%3d%3d',
  notCPS: 'KJXPo2H8q3bSXcSdYfd9MA%3D%3D'
}
// 主要是判断接口是否正确
describe('cps', function () {
  this.timeout(10000)

  afterEach(function () {
    cps.url = old_url
  })


  it('判断 cps用户', function (done) {
    cps.url = old_url + 'cps&userid=' + user.isCPS + '&a='
    cps.checkIsCps().then(function (data) {
      expect(data.zt).to.be.equal('3')
      expect(data.msg).to.be.equal('0')
      setTimeout(function () {
        expect(cps.isCps).to.be.true
        expect(cps.isSaved).to.be.true
        expect(cps.isJoin).to.be.true
        done()
      })
    })
  })

  it('判断 非cps用户', function (done) {
    cps.url = old_url + 'cps&userid=' + user.notCPS + '&a='
    cps.checkIsCps().then(function (data) {
      expect(data.zt).to.be.equal('2')
      expect(data.msg).to.be.equal('不是cps')
      setTimeout(function () {
        expect(cps.isCps).to.be.false
        done()
      })
    })
  })
});