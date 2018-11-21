var ajax = require("ajax");
var path = require("./path");
var utils = require('../utils/index');
// var native = require('')
var store = require('store');
var userInfo = store.get('userInfo');
function tg() {
    ajax({
        url: path.HOST + '/m/WdServer.aspx',
        // dataType: "json",
        // api: "",
        withCredentials: true,
        data: {
            s: utils.getString('s'),
            tg_gjz: utils.getString('tg_gjz'),
            tgsub: utils.getString('tgsub')


        },
        success: function (data) {
        },
        error: function () {
        }
    })
}

function dplus() {
    if(typeof window.dplus !== 'undefined'){
        console.log('dplus引用过了不再引用')
        return false // 引用过了不再引用
    }
    var config = {
        '36.7.138.114:885': '1268153473',
        '36.7.138.114:124': '1267429993',
        'www.wsloan.com' : '1268153473',
        'active.wsloan.com' : '1267429993',
        'm.wsloan.com': '1271266854',
        'www.jinrixianbao.com': '1271577917',
        'www.zhaozhexue.com': '1271577940',
        'www.sythg.com': '1273420360',
        'static.8jielicai.com': '1273531298',
        'www.labybaby61.com': '1273420360'
    }

    var id = config[location.host] || '1267429993'

    !function (a, b) { if (!b.__SV) { var c, d, e, f; window.dplus = b, b._i = [], b.init = function (a, c, d) { function g(a, b) { var c = b.split("."); 2 == c.length && (a = a[c[0]], b = c[1]), a[b] = function () { a.push([b].concat(Array.prototype.slice.call(arguments, 0))) } } var h = b; for ("undefined" != typeof d ? h = b[d] = [] : d = "dplus", h.people = h.people || [], h.toString = function (a) { var b = "dplus"; return "dplus" !== d && (b += "." + d), a || (b += " (stub)"), b }, h.people.toString = function () { return h.toString(1) + ".people (stub)" }, e = "disable track track_links track_forms register unregister get_property identify clear set_config get_config get_distinct_id track_pageview register_once track_with_tag time_event people.set people.unset people.delete_user".split(" "), f = 0; f < e.length; f++)g(h, e[f]); b._i.push([a, c, d]) }, b.__SV = 1.1, c = a.createElement("script"), c.type = "text/javascript", c.charset = "utf-8", c.async = !0, c.src = "//w.cnzz.com/dplus.php?id="+id, d = a.getElementsByTagName("script")[0], d.parentNode.insertBefore(c, d) } }(document, window.dplus || []);
    
    window.dplus.init(id);

    
    // 查询html属性 动态绑定打点事件
    bundCnzz()
}


function bundCnzz(){

    // var event = wsloan.isPC?'mousedown':'touchdown';
    
    /* $('body').on(event,'[data-dplus]',function(e){
        var text = $(this).attr('data-dplus');
        window.dplus&&window.dplus.track(text);
    }) */

    /* $('body').on(event,'[data-czc]',function(e){
        var text = $(this).attr('data-czc');
        text = text.split(',');
        console.log(text);
        
        window._czc&&window._czc.push(['_trackEvent', text[0], text[1]]);
    }) */
    document.body.onclick = function(event){
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var attr = target.getAttribute('data-czc');
      if(attr){
        attr = attr.split(',');
        window._czc&&window._czc.push(['_trackEvent', attr[0], attr[1]]);
        console.log(attr);
      }
    }
    /* window.onload = function(){
        var dplusElems = $('[data-dplus]');
        var czcElems = $('[data-czc]');
        var traces = {};
        var event = wsloan.isPC?'mousedown':'touchdown';
        // 生成随机class
        function randomClass(text){
            var selector = 'cnzz'+Math.floor(Math.random()*1000);
            if(!traces[selector]){
                traces[selector] = text;
                return selector
            }
            randomClass(text)
        }
        // dplus
        for(var i = 0;i<dplusElems.length;i++){
            var elem = $(dplusElems[i]);
            var text = elem.attr('data-dplus');
            var selector = randomClass(text);
            elem.addClass(selector)
            $('body').on(event,'.'+selector,function(){
                console.log('dplus');
                window.dplus&&window.dplus.track(text);
            })
        }
        // _czc
        for(var i = 0;i<czcElems.length;i++){
            var elem = $(czcElems[i]);
            var text = elem.attr('data-czc');
            var selector = randomClass(text);
            elem.addClass(selector);
            text = text.split(',');
            $('body').on(event,'.'+selector,function(){
                console.log('czc');
                window._czc&&window._czc.push(['_trackEvent', text[0], text[1]])
            })
        }
        console.log(traces);
        
    } */
}


function pageLog() {

}


module.exports = function () {
    var laiYuan = utils.getString("laiyuan"),
        currentUrl = location.pathname + location.hash;

    function dapi() {
        var script = document.createElement("script");
        script.src = location.protocol + "//dapi.wsloan.com/PageLog.js";
        document.body.appendChild(script)
    } 

    function Accesslog2() {
        ajax({
            url: path.HOST + '/appapi/api.ashx?t=Accesslog2',
            // api: "",
            withCredentials: true,
            data: {
                laiyuan: laiYuan,
                fuid: userInfo.appuid0,
                flx: 1,
                currentUrl: currentUrl
            },
            success: function (data) {
            }
        })
    }


    function shareNum() {

        ajax({
            url: path.HOST + '/appapi/wap.ashx?q=shareNum',
            // api: "",
            // withCredentials: true,
            data: {
                uid: userInfo.appuid0,
                laiyuan: laiYuan, //不同入口，取url的laiyuan值
                currentUrl: currentUrl//不同活动
            },
            success: function (data) {
            }
        })
    }

    function checkTg(){
        ajax({
            url: path.HOST + '/appapi/wap.ashx?q=tg',
            withCredentials: true,
            data: {
                PageURL: escape(document.URL),
                ReferrerURL: escape(document.referrer),
                uid: userInfo.appuid0
            },
            success: function (data) {
            }
        })
    }


    //todo wsloan
    if(wsloan.openTj !== false ){

        wsloan.mediator.once("user.ready", function (data) {
            console.log('user.ready')
            userInfo = store.get('userInfo'); // 
            Accesslog2();
            shareNum();
            dapi();
            typeof window.dplus === 'undefined' && dplus(); // 避免重复引用
        })
    }

    return {
        tg: tg,
        dapi: dapi,
        dplus:dplus,
        checkTg:checkTg
    }
}



