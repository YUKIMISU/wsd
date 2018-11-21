require('./index.scss');
require('./new-index.scss');
var upgrade = require('components/upgrade');
var header = new View({
  el: "#J_header",
  data: {

    isReady: false,
    isMall: !!location.pathname.match('/mall'),
    isDuoBao: !!location.pathname.match('/duobao'),
    info: {
      isLogin: 0
    },
    link: {
      register: wsloan.path.HOSTS + wsloan.path.dirname + 'register/',
      login: wsloan.path.HOSTS +'/login.aspx',
      memb: wsloan.path.HOSTS + wsloan.path.dirname + "memb/",
      vip: wsloan.path.HOSTS + wsloan.path.dirname + "vip/index.html",
      membSafe: wsloan.path.HOSTS + wsloan.path.dirname + "memb/#safe",
      membMessage: wsloan.path.HOSTS + wsloan.path.dirname + "memb/#message-record/0",
      mall: wsloan.path.HOSTS + wsloan.path.dirname + "mall/",
      help: wsloan.path.HTML + "guide/index.html#help",
      about: wsloan.path.HTML + "guide/index.html#about",
      bankSet: wsloan.path.HOSTS + wsloan.path.dirname + "memb/index.html#safe",
      // club: wsloan.path.HTML + "club/",
      club: wsloan.path.HOSTS + wsloan.path.dirname + "club/",
      bbs: '//bbs.wsloan.com/'
    },
    tips: {
      bank: ['<p class="p1">为确保账户安全，请尽快完成</p><a href="/memb/#safe"><p class="p2">银行卡绑定</p></a>', '<p class="p1">您已绑定银行卡</p>', '16px'],
      phone: ['<p class="p1">为确保账户安全，请尽快完成</p><a href="/memb/#safe"><p class="p2">手机号码验证</p></a>', '<p class="p1">您已完成手机号码验证</p>', '66px'],
      email: ['<p class="p1">为确保账户安全，请尽快完成</p><a href="/memb/#safe-email-edit"><p class="p2">电子邮箱验证</p></a>', '<p class="p1">您已完成电子邮箱验证</p>', '116px'],
      pwd: ['<p class="p1">为确保账户安全，请尽快完成</p><a href="/memb/#safe"><p class="p2">设置交易密码</p></a>', '<p class="p1">您已设置交易密码</p>', '166px']
    },
    menu: {}

  },
  template: function () {
    return require("./index.html");
  },
  ready: function () {
    // this.checkOpenIp();

    wsloan.user.update('ready');
    wsloan.userFund.update();

    this.getUserInfo();
    // setTimeout(()=>{
    this.getMenuList();
    // },1000)
    // this.appendWsloanStatistic(); // 重复引用了
    this.appendBaiduStatistic();
    this.appendThirdStatistic();
    this.recordingBaiduParams();
    // this.checkTg();
    var _this = this;
    wsloan.mediator.on('user.ready', function (data) {
      if(data&&data.code === 2){
        layer.alert(data.message,function(){
          wsloan.go('login');
        });
      }
      _this.firstTip();
    });

  },
  fetchs: {
    checkTg: function () {
      this.ajax({
        url: wsloan.path.HOST + '/appapi/api.ashx?t=tg',
        api: "",
        withCredentials: true,
        data: {
          PageURL: escape(document.URL),
          ReferrerURL: escape(document.referrer)
        }
      })
    },
    checkOpenIp: function () {
      this.ajax({
        url: wsloan.path.HOST + '/centerApi/ZlxgProtocol.ashx',
        request: 'ajax',
        data: {
          t: 'Maintain'
        },
        success: function (data) {
          if (data.code != 0) {
            location.href = 'http://www.wsloan.com/simple/notice/index.html'
          }

        },
        error: function () {
          // location.href = 'http://www.wsloan.com/simple/notice/index.html'

        }
      });

    },
    getMenuList: function () {
        var that = this;
        this.ajax({
            url: this.API.FeData,
            data:{
                query:wsloan.isTest ? 'topMenu' : 'topMenuOnline'
            },
            success: function (data) {
                that.menu = data;
                //增加存管策略
                wsloan.strategy || (wsloan.strategy = {});
                wsloan.strategy.isOpenCustody = data.isOpenCustody; // 必须在 用户信息和头部信息获取到后才能用
                wsloan.upgrade = upgrade;
                // that.getUserInfo();
                that.$repaint();
                wsloan
                    .mediator
                    .trigger("top-menu:get", data);




                $("body").on("click", '*[checkCustody]', function (event) {
                    if (!upgrade.checkHasCustody()) {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        });
    },
    // getMenuList: function () {
    //   var that = this;
    //   this.ajax({
    //     url: this.API.TopMenuJson,
    //     jsonpCallback: "topMenuData",
    //     success: function (data) {
    //       that.menu = data;
    //       //增加存管策略
    //       wsloan.strategy || (wsloan.strategy = {});
    //       wsloan.strategy.isOpenCustody = data.isOpenCustody; // 必须在 用户信息和头部信息获取到后才能用
    //       wsloan.upgrade = upgrade;
    //       // that.getUserInfo();
    //       that.$repaint();
    //       wsloan
    //         .mediator
    //         .trigger("top-menu:get", data);




    //       $("body").on("click", '*[checkCustody]', function (event) {
    //         if (!upgrade.checkHasCustody({}, event)) {
    //           return false;
    //         }
    //       });
    //     }
    //   });
    // },
    getUserInfo: function () {
      var that = this;
      // wsloan.user.update();
      wsloan
        .mediator
        .on("user.ready", function () {

          that.info = wsloan
            .user
            .get();
          that.isReady = true;
          that.$repaint();
          that.custodyCountdown();
          wsloan.strategy || (wsloan.strategy = {});
          wsloan.strategy.isOpenCustody = true; // 头部和用户信息加载顺序
          wsloan.upgrade = upgrade;
          // that.checkUnusual();
        });
      // wsloan.userFund.init();
    },
    custodyCountdown: function () {
      // this.getServerTime();
      wsloan
        .serverTime
        .get()
      wsloan
        .mediator
        .on('getServerTime', function (time) {
          wsloan.time = time.content;

          var restTime = 1 - new Date(time.content).getDate();
          $(".bank-time-box p").html(restTime < 10 ?
            '0' + restTime :
            restTime);
          restTime <= 0 ?
            $(".bank-time-box")
            .hide()
            .siblings('.bank-online-box')
            .show() :
            $(".bank-time-box")
            .show()
            .siblings('.bank-online-box')
            .hide();
        });

    },
    getServerTime: function () {
      wsloan.ajax({
        url: wsloan.API.AppApi,
        request: 'ajax',
        data: {
          q: 'serverTime',
          testTime : decodeURIComponent(wsloan.utils.getString('testTime'))
        },
        success: function (data) {
          wsloan
            .mediator
            .trigger('getServerTime', data);

        }
      });
    }
  },
  methods: {
    // 记录百度参数
    recordingBaiduParams: function () {
      var search = location.search;
      search && wsloan.utils.setCookie('searchParams', search);
      search && (sessionStorage['searchParams'] = search);
    },
    //添加百度统计
    appendBaiduStatistic: function () {
      window._hmt = window._hmt || [];
      (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?07dcfc5a6c1c21863b59921ad0ce80d1";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode
          .insertBefore(hm, s);
      })();
    },
    appendWsloanStatistic: function () {
      // window._pagelog = window._pagelog || [];
      (function () {
        var hm = document.createElement("script");
        hm.src = "//dapi.wsloan.com/PageLog.js";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode
          .insertBefore(hm, s);
      })();
    },
    appendThirdStatistic: function () {
      var _vds = _vds || [];
      window._vds = _vds;
      (function () {
        _vds.push(['setAccountId', '9a3287d97af3aef4']);
        (function () {
          var vds = document.createElement('script');
          vds.type = 'text/javascript';
          vds.async = true;
          vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(vds, s);
        })();
      })();

    },
    firstTip: function () {
      var list = $('.rbottom>a');
      for (var i = 0; i < list.length; i++) {
        var el = $(list[i]);
        if (el.hasClass('false')) {
          var target = el.attr('data-id');
          $('.tips-box').html(this.tips[target][0]);
          $('.arrow').css('left', this.tips[target][2]);
          break;
        }
      }
    }

  },
  events: {
    // 'mouseenter .rbottom>a': function(_this){
    //     var target = $(this).attr('data-id');
    //     var tip = null;
    //     if($(this).hasClass('false')){
    //         tip = _this.tips[target][0]
    //     }else{
    //         tip = _this.tips[target][1]
    //     }
    //     $('.tips-box').html(tip);
    //     $('.arrow').css('left',_this.tips[target][2]);
    // },
    'mouseenter .J_qrcode_item': function () {
      $(this)
        .find('.J_qrcode')
        .show();
    },

    'mouseleave .J_qrcode_item': function () {
      $(this)
        .find('.J_qrcode')
        .hide();
    },
    'click #header-lgout': function ($vm) {
      wsloan
        .user
        .del();
      location.href = $vm.path.HOSTS + '/login.aspx?act=exit';

    }

  }

});

module.exports = header;