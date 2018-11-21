//  断言库
var expect = require('chai').expect;
//  引用测试函数
var time = require('../../src/utils/time.js');
var timeObj = time(require('../../src/platforms/pc/utils/promise.js'))


describe('time', function () {
    this.timeout(2000);
    it('服务端时间', function (done) {
        timeObj.get().then(function (data) {
            var dateArr = data.content.split(" ")
            expect(dateArr[0].split("/").length).to.be.equal(3)
            expect(dateArr[1].split(":").length).to.be.equal(3)

            done()
        })
    })
})