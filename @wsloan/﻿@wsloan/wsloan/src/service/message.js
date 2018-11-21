/**
 * 弹窗 信息, 以及对应链接跳转
 */

var message = {
  // 登录
  login: {
    message: '您未登录, 马上登录?',
    btnText: '登录',
    link: 'login'
  },
  // 绑卡
  bank: {
    message: '请先绑卡！',
    btnText: '立即绑卡',
    link: 'addbankcard'
  },
  // 充值
  recharge: {
    message: '账户余额不足',
    btnText: '立即充值',
    link: 'setJymm'
  },
  // 设置交易密码
  setJymm: {
    message: '请先设置交易密码',
    btnText: '立即设置',
    link: 'setJymm'
  },
  // 设置交易密码. 错误次数未超过限制
  changeJymm: {
    message: '是否前去更改密码',
    btnText: '立即更改',
    link: 'setJymmByJymm'
  },
  // 设置交易密码 错误次数超过限制
  changeJymmById: {
    message: '您输入的密码错误次数已超过限制，是否前去更换密码？',
    btnText: '立即更换',
    link: 'changetradepasswordByID'
  }
};

module.exports = message;