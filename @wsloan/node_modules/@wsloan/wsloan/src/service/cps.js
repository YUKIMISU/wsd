var ajax = require("ajax");
var path = require("../config/path");

module.exports = {
    url: path.HOST + "/toub12.aspx?q=",
    checkIsCps: function (type) {
        var that = this;
        return ajax({
            url: that.url + "cps1",
            request: 'ajax',
            success: function (data) {
                // data = { "zt": "0", "msg": "1" }
                if (data.zt == 0) {
                    that.isCps = true;
                    that.isSaved = false;
                }
                if (data.zt == 3) {
                    that.isCps = true;
                    that.isSaved = true;
                    data.msg == 0 ? that.isJoin = true : that.isJoin = false;
                }
                if (data.zt == 2) {
                    that.isCps = false;
                }
                if (data.zt == 1) {
                }
                that.getCpsStatus && that.getCpsStatus();
                type != "popup" ? that.cpsSelectCallback() : that.cpsPopupCallback();
            }
        })
    },
    cpsPopupCallback: function (callback) {
        "use strict";
        //csp用户，未选择，弹出选择框
        if (this.isCps && !this.isSaved || (this.isSaved && !this.isJoin)) {
            this.cpsPopupShow && this.cpsPopupShow();
        } else {
             typeof callback == "function" ? callback() : this.cpsCallbak && this.cpsCallbak()
        }
    },
    cpsSelectCallback: function (callback) {

        "use strict";
        //csp用户，未选择，弹出选择框
        if (this.isCps && !this.isSaved) {
            this.cpsSelectShow();
        }
        else if (this.isCps && this.isSaved && !this.isJoin) {

            this.cpsSelectSaved();
        } else {
            typeof callback == "function" ? callback() : this.cpsCallbak && this.cpsCallbak()
        }
    },
    saveCps: function () {
        "use strict";
        var that = this;
        ajax({
            url: this.url + "svcps",
            data: {
                lx: that.cpsSelectType // l放弃 2参与
            },
            success: function (data) {
                if (data.zt == 0) {
                    that.text = that.cpsSelectType === 1 ? '您已选择继续参与投资返现活动' : '您已选择参与' + that.activeName;
                    that.isSaved = true;
                    that.isJoin = that.cpsSelectType != 1;
                    that.saveCpsSuccess();
                } else {
                    wsloan.alert(data.msg);
                }

            }
        })
    }
}
