var path = require('../../../config/path.js');
var base = require('../../../config/base.js')
function creatRequest(type, options){
    var ajaxOptions = $.extend({
        type: "get",
        url: options.url,
        timeout : options.timeout || 20000,
        
    },
    type === 'ajax' ? {
        dataType: options.dataType || "json",
        url: options.url,
        type: options.type,
        data: options.data,
        cache: false ,
        xhrFields: {
            withCredentials: options.withCredentials || false
        },
    } : {
        async: false,
        dataType: 'jsonp',
        jsonp: "callback",
        jsonpCallback: options.jsonpCallback,
        data: options.data,
       
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    }
    )
    ajaxOptions.success = function(data){
        typeof options.success === 'function'  && options.success(data);
    }
    ajaxOptions.error = function(data){
        options.errorText && wsloan.toast(options.errorText); // 提示话术
        typeof options.error === 'function'  && options.error(data);
        var msg = '接口获取错误,url:' + options.url + ',data:' + JSON.stringify(data) + ',status:' + data.status + ',statusText:' + data.statusText;
        (data.status !== 0 && data.status !== 200) &&  wsloan.toast(data.status + ':哎呦，被你发现一个bug诶，赶紧告诉客服妹妹吧~(' + options.url + ',data:' + JSON.stringify(options.data) + ',statusText:' + data.statusText + ')')
     
        if ((data.status !== 0 && data.status !== 200) && window.fundebug && window.fundebug.notifyError) {
            window.fundebug.notifyError({
                name:  options.url + JSON.stringify(options.data) + '接口获取错误',
                message: JSON.stringify(data) + ',appuid0=' + (localStorage.userInfo && localStorage.userInfo.appuid0),
                severity: 'warning'
            });
        }

    }
    ajaxOptions.complete = function(XMLHttpRequest,status){
        typeof options.complete === 'function'  && options.complete(XMLHttpRequest,status);
        
        if(status === 'timeout'){
            if(window.fundebug && window.fundebug.notifyError){
                window.fundebug.notifyError({
                    name:  '服务器请求超时:' + options.url + JSON.stringify(options.data) ,
                    message: '服务器请求超时' + ',appuid0=' + (localStorage.userInfo && localStorage.userInfo.appuid0),
                    severity: 'warning'
                });
            }
            wsloan.alert({message : '服务器超时'});
        }
    }
    return $.ajax(ajaxOptions)
}
// function ajax(options) {
   

//     options = $.extend({
//         type: "get"
//     }, options);
   
//     return $.ajax({
//         dataType: options.dataType || "json",
//         url: options.url,
//         timeout : options.timeout || 20000,
//         type: options.type,
//         data: options.data,
//         cache: false ,
//         xhrFields: {
//             withCredentials: options.withCredentials || false
//         },
//         success: function (data) {
//             var callback = options.success;
//             if (callback && ((typeof callback) == "function")) {
//                 callback(data);
//             }
//         },
//         error: function (data) {
//             var msg = '系统异常,APIName:' + options.url + ',data:' + JSON.stringify(data) + ',status:' + data.status + ',statusText:' + data.statusText;
//             (data.status !== 0 && data.status !== 200) &&  wsloan.toast(data.status + ':哎呦，被你发现一个bug诶，赶紧告诉客服妹妹吧~(' + options.url + ',data:' + JSON.stringify(options.data) + ',statusText:' + data.statusText + ')')
//             var callback = options.error;
//             if (callback && ((typeof callback) == "function")) {
//                 callback(data);
//             }
//             if ((data.status !== 0 && data.status !== 200) && window.fundebug && window.fundebug.notifyError) {
//                 window.fundebug.notifyError({
//                     name:  options.url + JSON.stringify(options.data) + '接口获取错误',
//                     message: JSON.stringify(data) + ',appuid0=' + (localStorage.userInfo && localStorage.userInfo.appuid0),
//                     severity: 'warning'
//                 });
//             }
//         },
//         complete:function (XMLHttpRequest,status) {
//             if(status=='timeout'){//超时,status还有success,error等值的情况
//                 typeof options.error == "function" ? options.error() : "";
//                 alert("服务器请求超时");
//             }
//             typeof options.complete == "function" ? options.complete() : "";
//         }
//     })
// }
// function jsonp(options) {
   


//     return  $.ajax({
//         url: options.url,
//         type: "get",
//         timeout : options.timeout || 2000,
//         async: false,
//         dataType: 'jsonp',
//         jsonp: "callback",
//         jsonpCallback: options.jsonpCallback,
//         data: options.data,
       
//         xhrFields: {
//             withCredentials: true
//         },
//         crossDomain: true,
//         success: function (data) {
//             typeof options.success == "function" ? options.success(data) : "";
//         },
//         error: function (data) {
//             var msg = '系统异常,APIName:' + options.url + ',data:' + JSON.stringify(data) + ',status:' + data.status + ',statusText:' + data.statusText;
//             // layer.msg(msg);

//             var callback = options.error;
//             if (callback && ((typeof callback) == "function")) {
//                 callback(data);
//             }
//             if (window.fundebug && window.fundebug.notifyError) {
//                 window.fundebug.notifyError({
//                     name: options.url + JSON.stringify(options.data) + '接口获取错误jsonp',
//                     message: JSON.stringify(data) + ',appuid0=' + (localStorage.userInfo && localStorage.userInfo.appuid0),
//                     severity: 'warning'
//                 });
//             }
//         },
//         complete:function (XMLHttpRequest,status) {
//             if(status=='timeout'){//超时,status还有success,error等值的情况
//                 typeof options.error == "function" ? options.error() : "";
//                 alert("服务器请求超时");
//             }
//             typeof options.complete == "function" ? options.complete() : "";
//         }
//     });



// }

module.exports = function (options) {
    var isCross = location.host !== 'www.wsloan.com' && !base.isTest || location.port !== '885' ;
  
    return options.request === 'test' || (typeof isDev != 'boolean' && options.request == 'ajax' && !isCross) ? creatRequest('ajax',options) : creatRequest('jsonp',options);
}
