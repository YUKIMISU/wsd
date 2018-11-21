/**
 * 验证
 */
var isPhoneNum = require('./mini-utils/regexp/isPhoneNum')
var TYPE = {
  user: '用户名',
  name: '名字',
  phone: '手机号',
  address: '地址',
  email: '邮箱',
  zfmm: '交易密码',
  oldZfmm: '原交易密码',
  newZfmm: '新交易密码',
  oldPass: '原密码',
  newPass: '新密码',
  confirmPass: '确认密码',
  card: '身份证',
  verifyPhone: '手机验证码',
  verify: '验证码',
  bankname: '银行名称',
  bankno: '银行卡号',
  password: '密码'
};

function zfmmCheckInit (field) {
  return function (val) {
    if (val.length !== 6) {
      return '请输入6位纯数字' + field + '交易密码';
            // return '请输入正确的' + field + '交易密码';
    }
    if ((parseInt(val, 10) + '').length !== 6) {
      return '请输入6位纯数字' + field + '交易密码';
            // return '请输入正确的' + field + '交易密码';
    }
  };
}
var rule = {
  phone: function (val) {
    if(!isPhoneNum(val)){
      return '请输入正确的手机号码';
      
    }

    // if (new RegExp('^((13[0-9])|(15[^,\\D])|(17[0-9])|(14[0-9])|16[3-9]|(18[0-9]))\\d{8}$').test(val) === false) {
    //   return '请输入正确的手机号码';
    // }
  },
  zfmm: zfmmCheckInit(''),
  oldZfmm: zfmmCheckInit('旧'),
  newZfmm: zfmmCheckInit('新'),
  password: function (val) {
    if (val.length < 6 || val.length > 16) {
      return '请输入6-16位密码';
    }
  },
  oldPass: function (val) {
    if (val.length < 6 || val.length > 16) {
      return '请输入6-16位旧密码';
    }
  },
  newPass: function (val) {
    if (val.length < 8 || val.length > 16) {
      return '密码长度错误';
    }
    // 密码类型数量
    var types = 0;
    if (/[a-zA-Z]+/.test(val)) types++;
    if ((/[\.\-\_\!\@\#\$\%\^\&\*\(\)\=\+\[\]\{\}\;\:\"\'\,\/\<\>\?]+/).test(val)) types++;
    if (/[0-9]+/.test(val)) types++;
    if (types === 1) {
      return '密码不符合规则,请重新输入'
    }
  },
  confirmPass: function (bool) {
    if (!bool) {
      return '确认密码错误';
    }
  },
  card: function (val) {
    if (new RegExp(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/).test(val) === false) {
      return '请输入正确的身份证';
    }
  },
  verify: function (val) {
    if (val.length !== 4) {
      return '请输入正确的验证码';
    }
  },
  verifyPhone: function (val) {
    if (val.length !== 6) {
      return '请输入正确的手机验证码';
    }
  },
  email: function (val) {
    if (new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(val) === false) {
      return '请输入正确的邮箱';
    }
  }
};

/**
 * 验证
 *
 * @param {string} key 类型
 * @param {string} value 值
 * @returns {object}
 */
function verify (key, value) {
  var result = {
    value: '',  //  返回的错误值
    done: true  //  返回的状态
  };
  if (value === '') {
    result.done = false;
    result.value = '请输入' + TYPE[key];
    return result;
  }
  if (typeof rule[key] === 'function') {

    var verify = rule[key](value);
    if (typeof verify === 'string') {
      result.done = false;
      result.value = verify;
    }
  }
  return result;
}
// 添加验证方法
verify.add = function (key, value, verify) {
  changeTYPE(key, value);
  var oldVerify = rule[key];
  rule[key] = function (val) {
    var result = oldVerify(val);
    if (result) {
      return result;
    } else {
      return verify(val);
    }
  };
};

// 覆盖原先的验证方法
verify.cover = function (key, value, verify) {
  changeTYPE(key, value);
  rule[key] = verify;
};

function changeTYPE (key, value) {
  TYPE[key] = value;
}


module.exports = verify;
