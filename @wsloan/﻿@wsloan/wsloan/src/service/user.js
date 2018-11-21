var store = require('store');
// var cookie = require('../utils/cookie.js');
var API = require('../config/api.js');
var ajax = require('ajax');
var go = require('./go.js');
var assign = require('../polyfill/assign.js');
var isEmptyObject = require('../utils/base').Base.isEmptyObject

module.exports = {
  init: function () {
    if (isEmptyObject(this.get()) || !this.get().isLogin) {
      this.update('ready');
    } else {
      wsloan
        .mediator
        .trigger('user.ready');
    }
  },
  get: function () {
    return store.get('userInfo') || {
      isLogin: 0
    };
  },
  update: function (type, cb) {
    
    var that = this;
    type = type || 'ready';
    return ajax({
      url: API.AppApi,
      request: 'ajax',
      data: {
        q: 'userInfo',
        userid: wsloan.isApp == 1 ? window.native.appuid :'',
      },
      success: function (data) {

        // 设置用户信息缓存
        var info = {};
        var user = data.content || {};
        info = assign(info, {
          isLogin: data.code === 1 ?
            1 : 0,
            code : data.code , 
            message:data.message,
          userName: user.userName, 
          vipLevel: user.lev, // vip等级
          nickName: user.cname,
          avatar: user.cTuxiang, // 头像
          securityLevel: user.wzd,
          securityProcess: user.wzd1,
          address: user.address,
          appuid0: user.userid,
          appuid: user.encodeuid2,
          appuid2: user.encodeuid,
          growthValue: user.Experience, // 经验值
          memberPoint: user.fHyjf, // 会员积分
          redPackNum: user.hbNum, // 红包数量
          availableRedPack: user.hbje, //可用红包总额
          exp: user.tyjNum, // 体验金
          messageNum: user.znxNum, // 站内信数量
          checkInDays: user.qdts, // 签到天数
          isCheckIn: user.qdzt === 0, // 签到状态
          idCard: user.cZjhm, // 身份证号码
          isSetBank: !!user.yhk, // 是否设置银行卡
          isSetBankKhh: !!(user.yhk && user.bdyh.cShen && user.bdyh.cShi && user.bdyh.cKhhmc), // 是否设置开户行信息
          isSetBankSs: !!(user.yhk && user.bdyh.cShen && user.bdyh.cShi), // 是否设置开户行省市
          isSetPwd: user.Zfmm, // 是否设置交易密码
          isNameVerify: user.fsmsh, // 是否实名
          isPhoneVerify: user.fsjsh, // 是否手机验证
          isEmailVerify: user.fyxsh, // 是否邮箱验证
          isQuestionVerify: user.dc === 1, // 是否参加问卷
          isChangeUname: user.alternick === 1, // 是否修改过用户名
          email: user.cmail, //
          phone: user.cmtel,
          regDate: user.tdate, // 注册时间
          needUpdatePwd: user.needupdatezf === 0, // 是否需要更新交易密码
          isCz: user.iscz, // 是否是财智用户
          bankInfo: user.bdyh || {},
          isBw: user.isbw,
          isCustody: user.isyhcg === 1, //是否是资金存管用户 贵州银行
          isSignTx: user.txqy === 1, //是否签约提现
          isLock: user.isLock === 1, //账户是否被锁定
          isTx: user.sftx === 1, // 只能提现不能开户,
          isNew: user.isnew === 1, // 是否为新手用户
          isTransAssign: user.zqzrqy === 1, //是否债权签约
          BankMtel: user.BankMtel,
          hasJys:user.hasJys,
          isHfCustody: user.hfcgzt === 2, // 是否开通恒丰存管 0是未开户，1是未激活，2是成功
          needActiveHf: user.hfcgzt === 1, // 是否需要激活存管
          regfrom: user.regfrom, // 注册渠道号
          isFirstRecharge : user.isshouchong === 0,
          isSpecial : user.isSpaical === 1,
          srCustodyStatus: user.srCgZT,
          isSrCustody: user.srCgZT === 1, // 0：未开户 1：开户已激活 2： 开户未激活
          needActiveSr: user.srCgZT === 2, // 是否需要激活存管
          isBindCard: user.isBindCard === 1,
          srCgZT: user.srCgZT,
          canWithdrawAmount: user.canWithdrawAmount
        });
        that.getUnusual(info.appuid);
        wsloan.mediator.on('unusual:get', function (data) {
          if (data.code == 0) {
            info.isUnusual = data.content.yc == 1;
            info.isJkr = data.content.jkr == 1;
          }
          // info.isUnusual = true;
          // info.isJkr = false;
          // info.isCustody = false;


          that.del();
          info.isLogin === 1 && that.set(info);
          wsloan.mediator.trigger('user.' + type, info);
        });
        cb && cb();
      },
      error: function (data) {
        // 报错处理
        var userInfo = store.get('userInfo');
        wsloan.mediator.trigger('user.' + type, {});
        if (window.fundebug && window.fundebug.notifyError) {
          window.fundebug.notifyError({
            name: '用户信息获取错误',
            message: JSON.stringify(data) + ',appuid0=' + (typeof userInfo === 'object' && JSON.stringify(userInfo.appuid0)),
            severity: 'warning'
          });
        }
        (data.status !== 0 && data.status !== 200) && alert('数据出错, 请联系客服(userInfo)');
        
       
      }
    });
  },
  set: function (data) {
    store.set('userInfo', data, 'd1');
  },
  del: function () {
    store.set('userInfo', {}, 'd1');
  },
  getUnusual: function (userid) {
    var that = this;
    return ajax({
      url: wsloan.path.HOST + '/centerApi/ZlxgProtocol.ashx',
      request: 'ajax',
      data: {
        t: 'CanEditAccount',
        userid: userid
      },

      success: function (data) {
        wsloan.mediator.trigger('unusual:get', data);

      },
      error:function(data){
        (data.status !== 0 && data.status !== 200) && alert('数据读取错误(CanEditAccount)')
        wsloan.mediator.trigger('unusual:get', {});
      }


    });
  }

};