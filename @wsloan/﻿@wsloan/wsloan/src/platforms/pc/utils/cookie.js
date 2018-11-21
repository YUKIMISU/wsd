require("./JSON");

var TIME_RegExp = /^([sSmMhHdD])(\d+)$/;

var TIME_TYPE = {
    second: 's',
    minute: 'm',
    hour: 'h',
    day: 'd'
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

function isPlainObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj && obj != window;
}

module.exports = {

    secondTrans: function (str) {

        //提取时间
        var time;

        try {
            time = str.match(TIME_RegExp);

            var time_type = time[1].toLowerCase();

            var time_spread = time[2];

            switch (time_type) {

                case TIME_TYPE.second:
                    return time_spread * 1000;
                case TIME_TYPE.minute:
                    return time_spread * 60 * 1000;
                case TIME_TYPE.hour:
                    return time_spread * 60 * 60 * 1000;
                case TIME_TYPE.day:
                    return time_spread * 24 * 60 * 60 * 1000;
            }

        } catch (e) {
            new Error('请输入一个符合规定的时间格式的字符串参数!');
            return false;
        }

    },
    //获取cookie
    get: function (name) {

        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
        {
            var str = decodeURIComponent(arr[2]) ;
            try{
                return JSON.parse(str)
            }catch(e){
                return str
            }
            // return typeof str == 'object' ? JSON.parse(str) : JSON.parse(str) ;
        }
        else
            return null;


        // var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        // if (arr = document.cookie.match(reg)) {
        //     console.log(arr[2]);
        //     console.log(JSON.parse(arr[2]))
        //     return JSON.parse(arr[2]);
        //     // return JSON.parse(arr[2]);
        // }
        // else {
        //     return null;
        // }
    },
    update: function (name, value, time) {

        var exp = new Date();
        var strsec;
        //增加cookie时间
        strsec = this.secondTrans(time);
        strsec = strsec ? strsec * 1 : 0;
        exp.setTime(exp.getTime() + strsec);

        document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";expires=" + exp.toLocaleString() + ';path=/';

        
    },
    set0: function (name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            typeof value == 'object' ? value = JSON.stringify(value) : '';
            if (value === null) {
                value = '';

                options = $.extend({}, options);
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000)); 	//这里改时间，单位毫秒，默认为1天。
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },

    set: function (name, value, time) {
        var target = (this.proxy || (this.proxy = {}));

        //可以传递对象设置多个值
        var cache = name;
        if (!isPlainObject(cache)) {
            cache = {};
            name && (cache[name] = [value, time]);
        }
        for (var key in cache) {
            if (hasOwn(cache, key)) {

                if (!hasOwn(target, key)) {
                    target[key] = key;
                }
                // console.log('数据缓存键值对:', target);

                // console.warn('数据缓存' + key + '设置成功!');
                this.update(key, cache[key][0], cache[key][1]);

                // if (this.check(key)) {
                //     //todo 缓存需要更新
                //     console.warn('数据缓存' + key + '已经存在,可以直接利用缓存!');
                //
                // } else {
                //     console.warn('数据缓存' + key + '设置成功!');
                //     this.update(key, cache[key][0], cache[key][1]);
                //
                // }
            }
        }
    },

    //删除cookie
    del: function (name) {
        this.set(name, {},'s1');
        // if (this.check(name)) {
        //     var exp = new Date();
        //     exp.setTime(exp.getTime() - 24 * 60 * 60 * 1000);
        //     var cval = this.get(name);
        //     if (cval != null) {
        //         // document.cookie = name + "=" + wsloan.utils.json.stringify(cval) + ";expires=" + exp.toLocaleString();
        //         document.cookie = name + "=" + JSON.stringify(cval) + ";expires=" + exp.toLocaleString();
        //     }
        //     this.proxy && delete this.proxy[name];
        //     // console.warn('数据缓存' + name + '删除成功!');
        //     return true;
        // } else {
        //     // console.warn('数据缓存' + name + '不存在!');
        // }
    },

    //更新策略检查
    check: function (name) {
        return !!this.get(name);
    }

};