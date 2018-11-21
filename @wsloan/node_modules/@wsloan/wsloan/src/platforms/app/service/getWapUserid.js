let isTest = require('../../../config/isTest')
function getWapUserid(wsloan) {

    // 设置domain
    isTest && location.host == 'active.wsloan.com' ? document.domain = 'wsloan.com' : '';
    // 获取用户信息
    wsloan.user.update('ready');
    wsloan.mediator.$on('user.ready', (userinfo) => {
        window.native.appuid0 = userinfo.appuid0;
        window.native.appuid2 = userinfo.appuid2;
        window.native.appuid = encodeURIComponent(window.native.appuid2);
        window.native.isLogin = !!window.native.appuid0
        window.native.authCode = userinfo.authCode;

    })

    
}
module.exports = getWapUserid;