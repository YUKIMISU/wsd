function getNativeUserInfo(wsloan) {

    /* app端在nativeobjcpageonload返回后执行*/
    wsloan.mediator.$on('objc.ready', function (user) {
        console.log('objc.ready', user)
        window.native.appuid0 = user.appuid0;
        window.native.appuid2 = user.appuid2;
        window.native.appuid = encodeURIComponent(user.appuid2 || '');
        window.native.isLogin = !!user.appuid0
        window.native.version = user.version;
        window.native.authCode = user.authCode;
        window.native.JDAuthCode = user.JDAuthCode;
        try {
            localStorage['userInfo'] = JSON.stringify(user); //暂时禁用
        } catch (e) {
            console.log(e)

        }

        wsloan.mediator.$emit('user.ready', function (callback) {
            typeof callback === 'function' ? callback() : '';
        });
    });

    // 处理有bug的webview，用户ID从URL上获取

    let appuid2 = wsloan.utils.getString('bugUserid');
    if (appuid2) {
        window.native.appuid2 = appuid2;
        window.native.appuid = encodeURIComponent(appuid2);
        window.native.isApp = 1;
        // 模拟nativeObjcpageload方式再触发一遍
        wsloan.mediator.$emit('objc.ready', {
            appuid0: null,
            appuid2: appuid2,
            version: 0
        });
    }

}

module.exports = getNativeUserInfo