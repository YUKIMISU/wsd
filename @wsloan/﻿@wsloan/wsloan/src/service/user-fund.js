var mediator = require("../utils/mediator");
var store = require('store');
module.exports = {
    init: function () {

        if (wsloan.utils.facility.Base.isEmptyObject(this.get())) {
            this.update();
        }
        else {
            // console.log('通过缓存获取账户信息');
            wsloan.mediator.trigger("fund.ready");
        }
    },
    get: function () {
        // return wsloan.utils.cookie.get('fundInfo');
        return store.get('fundInfo');
    },
    update: function (type) {
        type =  type || 'ready';
        wsloan.ajax({
            request: 'ajax',
            url: wsloan.API.AppApi,
            data: {
                q: "GetGrzh"
            },
            success: function (data) {


                // console.log('通过请求获取账户信息:',data);

                store.del('fundInfo');

                data.code === 0 && store.set('fundInfo', data.content, 'd1');


                wsloan.mediator.trigger('fund.' + type, data.content);
            }
        })
    },
    set: function () {

    },
    del: function () {

    }
}