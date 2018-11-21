require('./index.scss');
var userInfo = wsloan.user.get() || {};
module.exports = {
    issign: false,
    //检查是否开通自动签约授权
    checkHasSign: function (callback) {
        var issign;
        wsloan.ajax({
            request: 'ajax',
            url: wsloan.path.HOST + '/ajaxapi/fqjh.ashx',
            data: {
                t: 'cgqy'
            },
            success: function (data) {
                issign = true;
                if (data.zt != 0) {
                    //关闭所有弹窗
                    layer.closeAll();
                    // layer.open({
                    //     type: 1,
                    //     title: false,
                    //     scrollbar: false,
                    //     shadeClose: false,
                    //     closeBtn: true,
                    //     area: ['500px', '350px'], //宽高
                    //     content: require('./autosign.html')
                    // });
                    // // TODO: 恒丰存管自动投标签约
                    // $("#J_join").html('<a id="J_join_a" href="javascript:;" target="_blank">立即加入</a>')
                    // $("#J_join_a").click(function () {
                    //     layer.closeAll();
                    //     wsloan.ajax({
                    //       url: wsloan.path.HFHOST + '/Getways/Do',
                    //       request: 'ajax',
                    //       data: {
                    //         action: 'AutoTenderPlan',
                    //         pageType: 0,
                    //         returnUrl: encodeURIComponent(window.location.href)
                    //       },
                    //       success: function (data) {
                    //         if (data.code === 0) {
                    //           location.href = data.content;
                    //         } else {
                    //           layer.msg(data.message);
                    //         }
                    //       },
                    //       error: function () {
                    //         layer.alert('数据交互失败(AutoTenderPlan)');
                    //       }
                    //     });
                    // })
                    wsloan.upgrade.autoSignPop();
                    issign = false;
                }

                typeof callback == "function" ? callback(issign) : "";
            }
        })
    }
}