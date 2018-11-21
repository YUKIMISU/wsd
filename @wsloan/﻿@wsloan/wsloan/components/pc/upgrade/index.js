require('./index.scss');
// var userInfo = wsloan.user.get() || {};

var auto = require('./auto.html'),
  redirect = require('./redirect.html');
//弹窗关闭按钮事件
$(document).on('click', '.J_pop_close', function () {
  layer.closeAll('page');
  // upgradePop.popIndex && layer.close(upgradePop.popIndex);
  upgradePop.cancel && upgradePop
    .cancel
    .call(upgradePop);
});
// 异常用户点击确认事件
$(document).on('click', '.J_pop_close_un', function () {
  layer.closeAll('page');
  // upgradePop.popIndex && layer.close(upgradePop.popIndex);
  upgradePop.cancelUn && upgradePop
    .cancelUn
    .call(upgradePop);
});
// 开户
$(document).on('click', '#J_do_upgrade', function () {
  location.href = wsloan.path.HOST+wsloan.path.dirname+'account-guide'
});
// 绑卡 激活
$(document).on('click', '#J_do_bind', function () {
  location.href = wsloan.path.HOST+wsloan.path.dirname+'account-guide'
});
// 自动投标签约
$(document).on('click', '#J_do_autosign', function () {
  layer.load(1, {
    shade: [0.3, '#000']
  });
  wsloan.ajax({
    url: wsloan.path.HFHOST + '/Getways/Do',
    request: 'ajax',
    data: {
      userid: wsloan.user.get().appuid2,
      action: 'AutoTenderPlan',
      pageType: 0,
      returnUrl: encodeURIComponent(window.location.href)
    },
    success: function (data) {
      if (data.code === 0) {
        location.href = data.content;
      } else {
        layer.closeAll();
        layer.msg(data.message);
      }
    },
    error: function () {
      layer.closeAll();
      layer.alert('数据交互失败(AutoTenderPlan)');
    }
  });
});
// 债权转让签约
$(document).on('click', '#J_do_transsign', function () {
  layer.load(1, {
    shade: [0.3, '#000']
  });
  wsloan.ajax({
    url: wsloan.path.HFHOST + '/Getways/Do',
    request: 'ajax',
    data: {
      userid: wsloan.user.get().appuid2,
      action: 'DebentureSalePlan',
      pageType: 0,
      returnUrl: encodeURIComponent(window.location.href)
    },
    success: function (data) {
      if (data.code === 0) {
        location.href = data.content;
      } else {
        layer.closeAll();
        layer.msg(data.message);
      }
    },
    error: function () {
      layer.closeAll();
      layer.alert('数据交互失败(DebentureSalePlan)');
    }
  });
});
var upgradePop = {
  userInfo: wsloan.user.get() || {},
  popIndex: null,
  //跳转提示
  redirectText: {
    'open-account': '为保护您的账户安全，将跳转至上饶银行网站，<br> 请根据提示完成开户',
    invest: '为保护您的账户安全，将跳转至上饶银行网站，<br> 请根据提示继续完成投资'
  },
  redirectTpl: {
    auto: auto,
    redirect: redirect
  },
  checkGoRecharge: function (event) {
    return event && $(event.target).html().indexOf('充值') > -1
  },
  checkUnusual: function (event, hidePop) {
    if (this.userInfo.isUnusual) {
      if (hidePop) {
        return false;
      }
      event && event.preventDefault();
      this.popIndex = layer.open({
        type: 1,
        title: false,
        scrollbar: false,
        shadeClose: false,
        closeBtn: false,
        skin: 'custody-pop',
        area: [
          '404px', '343px'
        ],
        content: require('./unusual.html')
      });
      return false
    }
    return true;
  },
  /* //检测上饶银行是否在正常，维护状态
  checkUsable: function (options, cb) {
    var _this = this;
    var time = wsloan.time;
    // 1.19-2.21贵州服务器搬迁
    // var unUse = new Date(time) >= new Date('2018/1/19 20:00:00') && new Date(time) < new Date('2018/1/21 20:00:00')
    var unUse = false;
    // default 1默认不给提示，继续执行
    if (((options && options.default !== 1) || !options) && unUse) {
      _this.event && _this.event.preventDefault();
      layer.alert('重要提醒：因存管行数据迁移将暂停办理所有服务类交易，当前操作暂时无法进行，预计于1月21日20:00后恢复正常。具体详情见平台公告。')
      return false

    }
    cb && cb();
    return true;
  }, */
  checkUsableStatus: function (type, cb, ct) {
    var _this = this;
    var typeMap = {
      'all': 1,
      'account-set': 2,
      'recharge': 3,
      'invest': 4,
      'draw-cash': 5,
      'change-bank': 6,
      'change-bank-phone': 7,
      'change-pwd': 8,
      'reward': 9
    };
    // 新增存管开关状态
    wsloan.ajax({
      url: wsloan.path.HFHOST + '/Users/GetThirdPartyDepositorySwitchStatus',
      // request: 'ajax',
      data: {
        switchType: typeMap[type]
      },
      success: function (data) {
        if (data.code === 0) {
          if (data.content.switchStatus === 0) {
            layer.msg(data.content.description)
            return
          } else if (data.content.switchStatus === 1) {
            cb && cb.apply(ct || _this);
          }
        } else {
          layer.msg(data.message);
        }
      },
      error: function () {
        layer.alert('数据交互失败（GetThirdPartyDepositorySwitchStatus）');
      }
    });
  },
  checkParameter: function (dataList, cb, ct) {
    var _this = this;
    wsloan.ajax({
      url: wsloan.path.HFHOST + '/hfbank/CheckParameter',
      // request: 'ajax',
      data: _.extend({
        userid: wsloan.user.get().appuid2
      }, dataList),
      success: function (data) {
        if (data.code === 0) {
          cb && cb.call(ct || _this, data.content);
        } else {
          layer.msg(data.message);
        }
      },
      error: function () {
        layer.alert('数据交互失败（CheckParameter）');
      }
    });
  },
  checkAutoSign: function (fn) {
    wsloan.ajax({
      url: wsloan.path.HOST + '/ajaxapi/fqjh.ashx',
      data: {
        t: 'cgqy'
      },
      success: function (data) {
        if (data.zt === '0') {
          // 已签约
        } else {
          wsloan.upgrade.autoSignPop();
        }
        fn && fn(data.zt);
      },
      error: function () {
        layer.alert('数据交互失败(cgqy)');
      }
    });
  },
  autoSignPop: function () {
    layer.open({
      type: 1,
      title: false,
      scrollbar: false,
      shadeClose: false,
      closeBtn: false,
      skin: 'custody-pop',
      area: [
        '404px', '343px'
      ],
      content: require('./auto-sign.html')
    });

  },
  transSignPop: function () {
    layer.open({
      type: 1,
      title: false,
      scrollbar: false,
      shadeClose: false,
      closeBtn: false,
      skin: 'custody-pop',
      area: [
        '404px', '343px'
      ],
      content: require('./trans-sign.html')
    });

  },
  popUpgrade: function(template){
    this.popIndex = layer.open({
      type: 1,
      title: false,
      scrollbar: false,
      shadeClose: false,
      closeBtn: false,
      skin: 'custody-pop',
      area: [
        '404px', '343px'
      ],
      content: require('./upgrade.html')
    });
  },
  popBindCard: function(){
    this.popIndex = layer.open({
      type: 1,
      title: false,
      scrollbar: false,
      shadeClose: false,
      closeBtn: false,
      skin: 'custody-pop',
      area: [
        '404px', '343px'
      ],
      content: require('./upgrade-active.html')
    });
  },
  popSetPwd: function(){
    var _this = this;
    layer.confirm("您未设置交易密码!", {
      btn: ["立即设置", "稍后再说"]
    },
    function (index) {
      _this.doSetPwd();
    });
  },
  //检查是否已经开通存管账户
  checkHasCustody: function (options, event) {
    // event && event.preventDefault();
    var _this = this;
    // 确保取到最新用户信息
    this.userInfo = wsloan.user.get();

    //关闭所有弹窗
    layer.closeAll();
    options && options.cancel && (this.cancel = options.cancel);
    options && options.cancelUn && (this.cancelUn = options.cancelUn);

    if (!this.checkUnusual(event)) {
      return false;
    }
    
    // 登录状态下不是存管账户则弹窗提示升级存管账户或者激活
    if (_this.userInfo.isLogin) {
      if(_this.userInfo.srCustodyStatus===0){
        _this.popUpgrade();
        return false;
      }
      if(!_this.userInfo.isBindCard){
        _this.popBindCard();
        return false;
      }
      if(_this.userInfo.needActiveSr&&_this.userInfo.isBindCard){
        _this.popSetPwd();
        return false;
      }
    }
    return true;
  },
  doUpgrade: function(){
    layer.load(1, {
      shade: [0.3, '#000']
    });
    wsloan.ajax({
      url: wsloan.path.HFHOST + '/Getways/Do',
      request: 'ajax',
      data: {
        userid: wsloan.user.get().appuid2,
        action: 'PersonalReg',
        pageType: 0,
        returnUrl: wsloan.path.HOST+wsloan.path.dirname+'memb/#index'
      },
      success: function (data) {
        if (data.code === 0) {
          location.href = data.content;
        } else {
          layer.closeAll();
          layer.msg(data.message);
        }
      },
      error: function () {
        layer.closeAll();
        layer.alert('数据交互失败(PersonalReg)');
      }
    });
  },
  doBindCard: function(){
    layer.load(1, {
      shade: [0.3, '#000']
    });
    wsloan.ajax({
      url: wsloan.path.HFHOST + '/Getways/Do',
      request: 'ajax',
      data: {
        userid: wsloan.user.get().appuid2,
        action: 'PersonalBindCard',
        pageType: 0,
        returnUrl: wsloan.path.HOST+wsloan.path.dirname+'memb/#index'
      },
      success: function (data) {
        if (data.code === 0) {
          location.href = data.content;
        } else {
          layer.closeAll();
          layer.msg(data.message);
        }
      },
      error: function () {
        layer.closeAll();
        layer.alert('数据交互失败(PersonalBindCard)');
      }
    });
  },
  doSetPwd: function(){
    layer.load(1, {
      shade: [0.3, '#000']
    });
    wsloan.ajax({
      url: wsloan.path.HFHOST + '/Getways/Do',
      request: 'ajax',
      data: {
        userid: wsloan.user.get().appuid2,
        action: 'ResetPassword',
        pageType: 0,
        returnUrl: wsloan.path.HOST+wsloan.path.dirname+'memb/#index'
      },
      success: function (data) {
        layer.closeAll();
        if (data.code === 0) {
          location.href = data.content;
        } else {
          layer.msg(data.message);
        }
      },
      error: function () {
        layer.closeAll();
        layer.alert('数据交互失败(ResetPassword)');
      }
    });
  },
  //立即跳转弹窗
  popBeforeRedirect: function (options) {
    var _this = this,
      content = this.redirectTpl[options.tplType];
    //关闭所有弹窗 layer.closeAll();

    this.popIndex = layer.open({
      type: 1,
      id: 'J_pop_redirect_layer',
      title: false,
      scrollbar: false,
      shadeClose: false,
      closeBtn: false,
      area: [
        '430px', '275px'
      ], //宽高
      content: content
    });

    $('#J_redirect_text').html(this.redirectText[options.textType]);

    if (options.tplType === 'auto') {
      options.cb && options
        .cb
        .call(options.ctx || _this);
    }
    //绑定立即升级按钮事件
    $(document)
      .off('click', '#J_do_redirect')
      .on('click', '#J_do_redirect', function () {
        options.cb && options
          .cb
          .call(options.ctx || _this);
      });

  }
};
module.exports = upgradePop;