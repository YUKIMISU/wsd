
var path = require('../config/path.js');
var base = require('../config/base.js')
function show(param) {
    if (base.isPC && typeof $ !== 'undefined') {
        $('#loginBox').attr('src', path.HOST + '/logintc.aspx?u=' + param + '&domain=' + location.hostname);
        document.domain = base.isTest ? document.domain : 'wsloan.com'
        $('#tcbg,#loginBox').show();
    } else {
        wsloan.confirm({
            message: '您未登录, 马上登录?',
            success: function () {
                wsloan.go('login','s='+wsloan.utils.getString('s')+'&refer='+location.href)
            }
        })
    }

}

function hide() {
    if (base.isPC && typeof $ !== 'undefined') {

        $('#loginBox').attr('src', '');
        $('#tcbg,#loginBox').hide();
    }
}

module.exports = {
    show: show,
    hide: hide
}