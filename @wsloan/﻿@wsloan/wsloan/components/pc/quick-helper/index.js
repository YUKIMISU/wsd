(function () {
  require('./index.scss');
  // require('./birthday.scss');
  new View({
    el: '#J_quick_helper',
    template: function () {
      var template = require('./index.html');
      var type = $(this.el).attr('data-type');
      if (type == 'mall') {
        template = require('./mall.html');
      }
      return template;
    },
    ready: function () {
      if($(window).width()<=1280){
        this.isShow = false;
        this.$repaint();
      }
      var that = this;
      // wsloan.qqService.getScript();
      // wsloan.mediator.on('qq-online:get', function (qqList) {
      //     that.online = online;
      //     that.qqList = qqList;
      //     that.zbQQ = qqList
      //     that.$repaint();
      // });

      wsloan.mediator.on('top-menu:get', function (data) {
        // this.getTopImg(data.adRight);
        this.getTopImgNew();
      }, this);
      setTimeout(function () {
        that.bottomBtnBind();
      }, 1000)

      wsloan.mediator.on('user.ready', function () {
        this.isLogin = wsloan.user.get().isLogin;
        this.$repaint();
      }, this);

     
    },
    data: {
      online: [],
      qqList: [],
      isLogin: false,
      isShow: true
    },
    fetchs: {
      //创建qq客服列表
      createQQList: function () {

      },
      getTopImgNew: function () {
        var _this = this;
        this.getAdsByNumber('sy_licai_yfd', function (data) {
          if (data) {
            var config = _this.adsKeyTrans(data);
            if (config.show) {
              _this.waitLoad(config);
            }
          }
          wsloan.mediator.trigger('quick_helper:ready');
        })
      },
      getTopImg: function (adGroupNumber) {
        var _this = this;
        this.ajax({
          url: this.API.IndexApi,
          data: {
            t: 'GetGGwGl',
            number: adGroupNumber
          },
          success: function (data) {
            // var topImg = _.filter(_this.mapObject(data || []), function (ad) {
            //     return ad.category === 2;
            // });
            var topImg = _this.mapObject(data || []);
            topImg.length && new View({
              el: '#J_top_img',
              template: require('./template-top-img.html'),
              data: {
                topImg: topImg[0]
              }
            })
          }
        });
      }
    },
    events: {
      'click .J_login': function (_this) {
        _this.checkLogin();
      },
      'click #kefu a': function ($vm) {
        // var $this = $(this);
        // $vm.openQQ($this.data('qq'))
        window.open("http://wpa.qq.com/msgrd?v=3&uin=" + $(this).data('qq') + "&site=qq&menu=yes")
        // wsloan.mediator.on('qq-online:get', function (qqList) {
        //     var kf = wsloan.service.qqService.randomGet();
        //     window.open(kf);
        // })
      },
      'click .J_openQQ': function (_this) {
        // wsloan.mediator.on('qq-online:get', function (qqList) {
        //     var kf = wsloan.service.qqService.randomGet();
        //     if(kf){
        //         window.open(kf);
        //     }

        // })
        window.open(wsloan.path.HTML + 'custom-service/index.html');
      }
    },
    methods: {
      checkLogin: function () {
        if (this.isLogin != 1) {
          // layer.alert('请先登录', function (index) {
          // layer.close(index);
          wsloan.loginDialog.show();
          // });
          return false;
        } else {
          return true;
        }
      },
      waitLoad: function (config) {
        var _this = this;

        var img = new Image();
        img.src = config.imgUrl;

        img.onload = function () {
          config.width = img.width;
          config.height = img.height;

          config.imgReady = true;
          new View({
            el: '#J_top_img',
            template: require('./template-top-img.html'),
            data: {
              topImg: config
            }
          })

        };
        img.onerror = function () {
          console.log('广告图片加载失败! : ' + config.imgUrl);
        };
      },
      getAdsByNumber: function (number, cb) {
        this.ajax({
          url: wsloan.path.HOST + '/ajaxapi/index.ashx',
          data: {
            t: 'Getggwgl_new',
            number: number
          },
          success: function (data) {
            cb && cb(data);
          },
          error: function (err) {
            layer.alert('GetGGwGl-' + number + ' 服务器异常');
          }
        });
      },
      adsKeyTrans: function (ad) {
        return {
          times: 0,
          imgReady: false,
          blx: ad.blx,
          title: ad.msg,
          showCount: ad.cishu,
          show: !!ad.imgUrl,
          imgUrl: wsloan.path.STATIC_IMG_PATH + ad.imgUrl,
          href: ad.ctzlj,
          startTime: ad.tstTime && new Date(ad.tstTime).getTime(),
          endTime: ad.tetTime && new Date(ad.tetTime).getTime(),
          isBtnShow: ad.isgb,
          cookieName: ad.imgUrl,
          width: 0,
          height: 0
        };
      },
      mapObject: function (list) {
        var _this = this;
        return _.map(list, function (ad) {
          return {
            title: ad.cmc,
            showCount: ad.cishu,
            show: ad.iskq,
            img_src: _this.path.STATIC_IMG_PATH + ad.imgUrl,
            href: ad.ctzlj ? ad.ctzlj : 'javascript:void(0)',
            startTime: ad.tstTime && new Date(ad.tstTime).getTime(),
            endTime: ad.tetTime && new Date(ad.tetTime).getTime(),
            width: ad.ftk,
            height: ad.ftg,
            btnHeight: ad.ftg,
            btnWidth: ad.ftk,
            btnBottom: 0,
            isBtnShow: ad.isgb,
            closeTop: 0,
            closeRight: 0,
            category: ad.fcategory
          };
        });
      },

      bottom_template_init: function () {

        this.bottomBtnBind();
      },
      bottomBtnBind: function () {
        //  禁用诚信网站右键菜单
        $('#___szfw_logo___')
          .on('contextmenu', function () {
            return false;
          });

        var cal = this.fljsj();

        $('.float-jsj-fl .btn72, .float-jsj-fl .btn72h')
          .on('keyup', cal);

        //  投资金额 和 年利率绑定
        $('.fl_inc_cal')
          .on('keyup', cal);
        //  计算绑定
        $('#fl_cal')
          .on('click', cal);
        // 重置绑定
        $('#rest_cal').on('click', this.rest)
        //  投资期限绑定
        $('#fl_tzqx')
          .on('keyup', this.jsq_yf);
        $('#fl_tzje, #fl_tzqx, #fl_nhl')
          .on('keyup', cal);
        //  回到顶部
        $('.scrolltop, #scrolltop')
          .click(function () {
            $('body,html')
              .animate({
                scrollTop: 0
              }, 500);
          });
        //  浮动窗口初始化
        this.float_init();
      },
      rest: function () {
        //  总收益
        $('#val_zsy').text(0);
        //  月收益
        $('#val_my').text(0);
        //  本息合计
        $('#val_hj').text(0);
      },
      fljsj: function () {
        //  投资金额
        var $gold = $('#fl_tzje');
        //  投资期限
        var $days = $('#fl_tzqx');
        //  年化率
        var $rate = $('#fl_nhl');

        var gold;
        var days;
        var rate;

        //  总收益
        var $total = $('#val_zsy');
        //  月收益
        var $month = $('#val_my');
        //  本息合计
        var $all = $('#val_hj');

        return function () {
          // 金额限制
          if (!/^\d+\.?\d*$/g.test($gold.val())) {
            $gold.val('');
          }
          if ($gold.val().split('.')[0].length > 10) {
            $gold.val('');
          }
          if ($gold.val().split('.')[1] && $gold.val().split('.')[1].length > 2) {
            $gold.val('');
          }
          // 期限限制
          if (!/^\d+$/g.test($days.val())) {
            $days.val('');
          }
          if ($days.val() * 1 > 12) {
            $days.val('');
          }
          // 利率限制
          if (!/^\d+\.?\d*$/g.test($rate.val())) {
            $rate.val('');
          }
          if ($rate.val() * 1 > 100) {
            $rate.val('');
          }
          if ($rate.val().split('.')[1] && $rate.val().split('.')[1].length > 2) {
            $rate.val('');
          }
          gold = parseFloat($gold.val() === '' ? 0 : $gold.val());
          days = parseFloat($days.val() === '' ? 0 : $days.val());
          rate = parseFloat($rate.val() === '' ? 0 : $rate.val());

          $total.text((gold * rate * days / 1200).toFixed(2));
          $month.text((gold * rate / 1200).toFixed(2));
          $all.text((gold * rate * days / 1200 + gold).toFixed(2));
        };
      },
      jsq_yf: function () {
        var val = $.trim($('#fl_tzqx').val());
        switch (val) {
          case '1':
            $('#fl_nhl')
              .val('9.6');
            break;
          case '3':
            $('#fl_nhl')
              .val('10.2');
            break;
          case '6':
            $('#fl_nhl')
              .val('11.4');
            break;
          case '12':
            $('#fl_nhl')
              .val('12');
            break;
          case '':
            $('#fl_nhl')
              .val('');
            break;
          default:
            $('#fl_nhl')
              .val('');
        }
        this.fljsj();
      },
      floatrig: function () {
        var cright;
        if ($(window)
          .width() > 1450) {
          cright = $(window)
            .width() / 2 - 850;
        }
        if ($(window)
          .width() < 1450) {
          cright = $(window)
            .width() / 2 - 690;
        }
        if ($(window)
          .width() < 1350) {
          cright = '30px';
        }
        if ($(window)
          .width() < 1210) {
          cright = '-120px';
        }
        $('#floatrig')
          .css('right', cright).show();
      },
      float_init: function () {

        var that = this;
        // 右侧悬浮菜单
        $(window)
          .resize(function () {
            that.floatrig();
          });
        $(function () {
          that.floatrig();

          $('.float-rig li')
            .hover(function () {
              $(this)
                .addClass('h');
            }, function () {
              $(this)
                .removeClass('h');
            });
          $('.float-rig li.f1')
            .hover(function () {
              $(this)
                // .addClass('h1');
                .addClass('h');
            }, function () {
              $(this)
                // .removeClass('h1');
                .removeClass('h');
            });
          $('.float-rig li.f2')
            .hover(function () {
              $(this)
                // .addClass('h2');
                .addClass('h');
            }, function () {
              $(this)
                // .removeClass('h2');
                .removeClass('h');
            });
          // $('.float-rig li.f3')
          //     .hover(function () {
          //         $(this)
          //             .addClass('h3');
          //         $('.kefu-num')
          //             .addClass('kefu1')
          //     }, function () {
          //         $(this)
          //             .removeClass('h3');
          //         $('.kefu-num')
          //             .removeClass('kefu1')
          //     });
          $('.float-rig li.f4')
            .hover(function () {
              $(this)
                .addClass('h4');
            }, function () {
              $(this)
                .removeClass('h4');
            });
          $('.float-rig li.f6')
            .hover(function () {
              $('#float_jsj')
                .addClass('float_jsjh');
            }, function () {
              $('#float_jsj')
                .removeClass('float_jsjh');
            });
          $('.float-rig li.f0')
            .hover(function () {
              $('#f_wx1')
                .show();
            }, function () {
              $('#f_wx1')
                .hide();
            });
        });
      }
    }
  });
}());
