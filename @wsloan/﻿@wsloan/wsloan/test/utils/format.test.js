//  断言库
var expect = require('chai').expect;

//  引用测试函数
var format = require('../../src/utils/format.js');

describe('format库', function () {
  it('千位数字格式化', function () {
    expect(format.formatNumberToThousands(123456789)).to.be.equal('123,456,789')
    expect(format.formatNumberToThousands(10000)).to.be.equal('10,000')
    expect(format.formatNumberToThousands(1234.5678)).to.be.equal('1,234.5678')
    expect(format.formatNumberToThousands(999999999999999 + 1)).to.be.equal('数字太大')
  })

  it.skip('时间格式化', function () {
    var date = new Date();
    expect(format.formatFromMilli(date)).to.be.include({
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    })
  })  

  it('日期格式化', function () {
    expect(format.dateFormat.YMD('2017-1-1')).to.be.equal('2017-01-01')
    expect(format.dateFormat.YMD('2017/11/05')).to.be.equal('2017-11-05')
    // expect(format.dateFormat.YMD('2017/11/34')).to.be.equal('2017-12-04')
  })
 
  it('保留两位小数', function () {
    expect(format.toPrecise(1000)).to.be.equal('1000.00')
    expect(format.toPrecise(1000, 3)).to.be.equal('1000.000')
    expect(format.toPrecise(1000.111)).to.be.equal('1000.11')
    expect(format.toPrecise(1000.115)).to.be.equal('1000.12')
  })

  it('格式化手机号', function () {
    expect(format.phone(13333333333)).to.be.equal('1333****333')
  })

  it('格式化输入的金额', function () {
    expect(format.inputMoney('123456')).to.be.equal('123456')
    expect(format.inputMoney('123456.789')).to.be.equal('123456.78')
  })
})