// module.exports = function (callback) {
//     function QQfilter(fType) {
//         return _.map(_.filter(qqList, function (item) {
//             return item.fType === fType;
//         }), function (it) {
//             return it.qq;
//         });
//     }
//     window.online = [];
//     var qqList = [],
//         qqOnList = [];
//     wsloan.mediator.on("top-menu:get", function (data) {
//         qqList = data.qqService.list
//         var onlineQQList = QQfilter('online'),
//             dutyQQList = QQfilter('duty'),
//             qqStr = onlineQQList.concat(dutyQQList).join(':') + ':';


//         $.getScript(data.qqService.api + '&' + qqStr, function (data) {
//             online = window.online;
//             for (var i = 0; i < qqList.length; i++) {
//                 if (online[i] !== 0) {
//                     qqOnList.push(qqList[i])
//                 }
//             }
//             callback({
//                 list: qqList,
//                 onList: qqOnList,
//                 open: function (qq) {
//                     window.open("http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&site=qq&menu=yes");
//                 }
//             })
//         })
//     });
// }



window.online = [];
module.exports = {
    online: [],
    qqList: [],
    QQfilter: function (fType) {
        return _.map(_.filter(this.qqList, function (item) {
            return item.fType === fType;
        }), function (it) {
            return it.qq;
        });
    },
    qqStr: function () {
        var onlineQQList = this.QQfilter('online'),
            dutyQQList = this.QQfilter('duty'),
            qqStr = onlineQQList.concat(dutyQQList).join(':') + ':';

        return qqStr
    },
    getScript: function () {
        window.online = [];
        var that = this;


        wsloan.mediator.on("top-menu:get", function (data) {
            that.qqList = data.qqService.list;

            $.getScript(data.qqService.api + '&' + that.qqStr(), function (data) {
                that.online = online;
                wsloan.mediator.trigger('qq-online:get', that.qqList);


            })

        })

    },
    randomGet: function () {
        var that = this;

       
            that.qqListOn = [];


            for (var i = 0; i < that.online.length; i++) {
                if (that.online[i] !== 0) {
                    that.qqListOn.push(that.qqList[i])
                }
            }

            var qqObj = that.qqListOn[Math.floor((Math.random() * that.qqListOn.length))];
            if (!qqObj) {
                layer.alert("工作时间 8:30-21:00，周日及节假日晚上无客服值班");
                return false;
            }
            return "http://wpa.qq.com/msgrd?v=3&uin=" + qqObj.qq + "&site=qq&menu=yes";
       

    }
}

