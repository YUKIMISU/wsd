require('./index.scss');
var userInfo = wsloan.user.get() || {};

// //弹窗关闭按钮事件
// $(document).on('click', '.J_pop_close', function () {
//     upgradePop.popIndex && layer.close(upgradePop.popIndex);
// }); 
var upgradePop = {
    popIndex: null, 
    //跳转提示
    redirectText: {
        'open-account': '为保护您的账户安全，将跳转至存管银行网站，<br> 请根据提示完成开户',
        invest: '为保护您的账户安全，将跳转至存管银行网站，<br> 请根据提示继续完成投资'
    },
    //检查是否已经开通存管账户
    checkHasCustody: function () {
        //关闭所有弹窗
        // layer.closeAll();
        //登录状态下不是存管账户则弹窗提示升级存管账户
        if (userInfo.isLogin && wsloan.strategy.isOpenCustody && !userInfo.isCustody) {
            //升级存管账号弹窗展示
            // this.popIndex = layer.open({
            //     type: 1,
            //     title: false,
            //     scrollbar: false,
            //     shadeClose: false,
            //     closeBtn: false,
            //     area: ['430px', '340px'], //宽高
            //     content: require('./upgrade.html')
            // });
            // //绑定立即升级按钮事件
            // $(document).on('click', '#J_do_upgrade', function () {
            //     window.location.href = '/account-set/';
            // });
            return false;
        }
        return true;
    },

    //立即跳转弹窗
    popBeforeRedirect: function (textType, cb, ctx) {

        //关闭所有弹窗
        layer.closeAll();

        this.popIndex = layer.open({
            type: 1,
            title: false,
            scrollbar: false,
            shadeClose: false,
            closeBtn: false,
            area: ['430px', '275px'], //宽高
            content: require('./redirect.html')
        });

        $('#J_redirect_text').html(this.redirectText[textType]);

        //绑定立即升级按钮事件
        $(document).on('click', '#J_do_redirect', function () {
            cb ? ctx ? cb.call(ctx) : cb() : '';
        });

    }
};



module.exports = upgradePop;