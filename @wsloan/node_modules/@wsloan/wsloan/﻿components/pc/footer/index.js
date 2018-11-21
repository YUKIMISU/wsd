require('./index.scss');
new View({
  el: "#J_footer",
  data: {

    phoneLink: wsloan.isTest ? 'http://192.168.3.36:124/app/2017/wap/#/' : "http://m.wsloan.com",
    link: {
      help: wsloan.path.HTML + 'guide/index.html#help',
      about: wsloan.path.HTML + 'guide/index.html#about',
      safe: wsloan.path.HTML + 'safe/index.html',
      xszy: wsloan.path.HOST + '/xszy/index.aspx',
      media: wsloan.path.HTML + 'guide/index.html#news',
      news: wsloan.path.HTML + 'guide/index.html#news',
      customService: wsloan.path.HTML +'custom-service/index.html',
    },
    online: [],
    qqListOn: []
  },
  template: function () {
    return require("./index.html")
  },
  ready: function () {
    var that = this;
    // this.dsfStatic();
    wsloan.statistic();
    !wsloan.isTest && (window.onload = this.dsfStatic())



  },
  fetchs: {},
  events: {

    'click #J_online': function (_this) {

      wsloan.mediator.on('qq-online:get', function (qqList) {
        var kf = wsloan.service.qqService.randomGet();
        window.open(kf);
      })

    },

    'contextmenu #___szfw_logo___': function () {
      return false;
    }
  },
  methods: {
    dsfStatic: function () {

      // 广点通
      (function (d) {
        try {
          if (location.protocol === 'http:') {
            var s = d.createElement('script'),
              e = d.body.getElementsByTagName('script')[0];
            e.parentNode.insertBefore(s, e),
              s.src = "//tajs.qq.com/gdt.php?sId=43260982"
          }

        } catch (e) {
          typeof console == 'object' && console.log('tajs.qq.com有报错', e)
        }
      })(document);

      //品友







      try {


        window._py = window._py || [];
        _py.push(['a', 'MVs..9B5CuXdhiGG4pOkv7oFjp_']);
        _py.push(['domain', 'stats.ipinyou.com']);
        _py.push(['e', '']); -
        function (d) {
          var s = d.createElement('script'),
            e = d.body.getElementsByTagName('script')[0];
          e.parentNode.insertBefore(s, e),
            f = 'https:' == location.protocol;
          s.src = (f ? 'https' : 'http') + '://' + (f ? 'fm.ipinyou.com' : 'fm.p0y.cn') + '/j/adv.js';
        }(document);




      } catch (e) {
        typeof console == 'object' && console.log('ipinyou 有报错', e)
      }

      // 百度友盟

      try {
        (function (d) {
          (window.bd_cpro_rtid = window.bd_cpro_rtid || []).push({
            id: "nWc1rjnv"
          });
          var s = d.createElement("script");
          s.type = "text/javascript";
          s.async = true;
          s.src = location.protocol + "//cpro.baidu.com/cpro/ui/rt.js";
          var s0 = d.getElementsByTagName("script")[0];
          s0.parentNode.insertBefore(s, s0);
        })(document);
      } catch (e) {
        typeof console == 'object' && console.log('cpro.baidu 有报错', e)
      }
    }


  }
});