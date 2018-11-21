var expect = require('chai').expect;

var calcEarn = require('../../src/service/calc-earn.js');

describe('calcEarn', function () {
  it('计算收益', function () {
    expect(calcEarn(10000, 12)).to.equal('1200.00');
    expect(calcEarn(10000, 6)).to.equal('570.00');
    expect(calcEarn(3333, 6)).to.equal('189.96');
    expect(calcEarn(321, 6)).to.equal('18.30');
    expect(calcEarn(1000, 10)).to.equal('0.00');
    expect(calcEarn(1000, 10, 10)).to.equal('83.30');
    // expect(calcEarn('sger', 'd', 10)).to.throw(Error,'');
  });
});