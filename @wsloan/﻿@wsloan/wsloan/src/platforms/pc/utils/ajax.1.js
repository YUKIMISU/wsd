var path = require('../../../config/path.js');
var base = require('../../../config/base.js')
function createRequest(type, options) {
    var onError, error;
    options = $.extend(
        {},
        {
            type: "get",
            url: options.url,
            data: options.data,
            xhrFields: {
                withCredentials: true
            }
        },
        type === 'ajax'
            ? {
                dataType: options.dataType || "json",
                timeout: options.timeout || 20000,
                type: options.type,
                cache: false,
                xhrFields: {
                    withCredentials: options.withCredentials || false
                }
            } : {
                timeout: options.timeout || 2000,
                async: false,
                dataType: 'jsonp',
                jsonp: "callback",
                jsonpCallback: options.jsonpCallback,
                crossDomain: true
            }
    );
    var onSuccess = options.success;
    options.success = function (data) {
        if (onSuccess && ((typeof onSuccess) == "function")) {
            onSuccess(data);
        }
    };

    error = options.error;

    onError = once(function (data, msg) {
        if (error && typeof error === "function") {
            error(data);
        } else {
            msg && layer.alert(msg);
        }
    });


    options.error = function (data) {
        var msg = '系统异常,APIName:' + options.url + ',data:' + JSON.stringify(data) + ',status:' + data.status + ',statusText:' + data.statusText;

        (data.status !== 0 && data.status !== 200) && wsloan.toast(data.status + ':哎呦，被你发现一个bug诶，赶紧告诉客服妹妹吧~(' + options.url + ',data:' + JSON.stringify(options.data) + ',statusText:' + data.statusText + ')')

        onError(data);

        if (data.status !== 0 && data.status !== 200 && window.fundebug && window.fundebug.notifyError) {
            window.fundebug.notifyError({
                name: options.url + JSON.stringify(options.data) + '接口获取错误',
                message: JSON.stringify(data) + ',appuid0=' + (localStorage.userInfo && localStorage.userInfo.appuid0),
                severity: 'warning'
            });
        }
    };

    var onComplete = options.complete;
    options.complete = function (XMLHttpRequest, status) {
        if (status == 'timeout') {
            onError(null, '服务器请求超时');
        }
        typeof onComplete == "function" && onComplete();
    };

    return $.ajax(options);
}


function noop() { }
function once(fn) {
    var called = false;
    return function () {
        var args = [], len = arguments.length;
        while (len--) args[len] = arguments[len];

        if (called) { return }
        called = true;
        return fn.apply(this, args)
    }
}

function formatMsg() {

}

module.exports = function (options) {
    var isCross = location.host !== 'www.wsloan.com' && !base.isTest || location.port !== '';
    return options.request == 'ajax' && !isCross ? createRequest('ajax', options) : createRequest('jsonp', options);
}
