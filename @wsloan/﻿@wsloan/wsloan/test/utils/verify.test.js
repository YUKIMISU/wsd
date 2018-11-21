//  断言库
var expect = require('chai').expect;

//  引用测试函数
var verify = require('../../src/utils/verify.js');
/*  eslint-disable */
describe('验证库', function () {
  it('验证库', function () {
    /*  eslint-enable */
    function test (key, value, done, str) {
      expect(verify(key, value)).to.be.include({done: done, value: str});
    };

    test('phone', 133377, false, '请输入正确的手机号码');
    test('phone', 13336951177, true, '');
    test('phone', 133369511771, false, '请输入正确的手机号码');
    test('phone', 11111111111, false, '请输入正确的手机号码');
    test('phone', '', false, '请输入手机号');
    test('phone', '13fdsadsaf', false, '请输入正确的手机号码');
    test('phone', 33221233456, false, '请输入正确的手机号码');

    test('name', '测试名字', true, '');
    test('name', '', false, '请输入名字');

    test('address', '测试地址', true, '');
    test('address', '', false, '请输入地址');

    test('zfmm', '123456', true, '');
    test('zfmm', '', false, '请输入交易密码');
    test('zfmm', '12345', false, '请输入6位纯数字交易密码');
    test('zfmm', '12345a', false, '请输入6位纯数字交易密码');

    test('oldPass', '123456', true, '');
    test('oldPass', '', false, '请输入原密码');
    test('oldPass', '12345', false, '请输入6-16位旧密码');
    test('oldPass', '12345678910111213141516', false, '请输入6-16位旧密码');

    test('newPass', '123456', false, '密码长度错误');
    test('newPass', '', false, '请输入新密码');
    test('newPass', '12345', false, '密码长度错误');
    test('newPass', '12345678910111213141516', false, '密码长度错误');
    test('newPass', 'a123456', false, '密码长度错误');
    test('newPass', 'a1234567', true, '');
    test('newPass', '01234567', false, '密码不符合规则,请重新输入');
    test('newPass', 'abcdefgh', false, '密码不符合规则,请重新输入');
    test('newPass', 'abcdefg,', true, '');

    test('confirmPass', false, false, '确认密码错误');
    test('confirmPass', true, true, '');

    test('card', '33038119990111111X', true, '');
    test('card', '', false, '请输入身份证');
    test('card', '1234567890', false, '请输入正确的身份证');

    test('verify', '1234', true, '');
    test('verify', '', false, '请输入验证码');
    test('verify', '125', false, '请输入正确的验证码');
    test('verify', '12345', false, '请输入正确的验证码');

    test('verifyPhone', '123456', true, '');
    test('verifyPhone', '', false, '请输入手机验证码');
    test('verifyPhone', '125', false, '请输入正确的手机验证码');
    test('verifyPhone', '12347', false, '请输入正确的手机验证码');

    test('email', 'test@te.com', true, '');
    test('email', '', false, '请输入邮箱');
    test('email', 'fdsfa', false, '请输入正确的邮箱');
    test('email', 'test@test', false, '请输入正确的邮箱');

    test('bankno', '', false, '请输入银行卡号');
  });
});