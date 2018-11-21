function getNativeUserInfo() {

  // 处理有bug的webview，用户ID从URL上获取
  let appuid2 = wsloan.utils.getString('bugUserid');
  if (appuid2) {
    window.native.appuid2 = appuid2;
    window.native.appuid = (appuid2);
    window.native.isApp = 1;
  }

  wsloan.mediator.$on('objc.ready', function (user) {
    console.log('on.objc.ready', user)
    window.native.appuid0 = user.appuid0;
    window.native.appuid2 = user.appuid2;
    window.native.appuid = user.appuid;
    window.native.version = user.version;
    window.native.isLogin = !!window.native.appuid2;

    window.native.authCode = user.authCode ;
    window.native.JDAuthCode = user.JDAuthCode;
    
    localStorage.userInfo = JSON.stringify(user);

    wsloan.mediator.$emit('user.ready', function (callback) {
      typeof callback === 'function' ? callback() : '';
    });
  });

}



function setWapAppuid() {
  try {
    sessionStorage['returnUrl'] = location.toString();
  } catch (e) {
    console.log(e);

  }
  let user;
  try {
    user = localStorage['userInfo'];
  } catch (e) {
    user = false;
    // alert('您处于无痕模式或者未允许网站cookies,无法登录');
  }

  if (user) {
    const userinfo = JSON.parse(user);
    window.native.appuid0 = userinfo.appuid0;
    window.native.appuid = userinfo.appuid;
    window.native.appuid2 = userinfo.appuid2;
    window.native.isLogin = !!window.native.appuid2;
    window.native.authCode = userinfo.authCode ;
  } else {
    window.native.appuid0 = window.native.appuid2 = window.native.appuid = void 0;
    //微信端不需要用户信息  直接放一个空对象 让后面方法可以继续执行
    localStorage['userInfo'] = JSON.stringify({});
  }
  wsloan.mediator.$emit('user.ready', function (callback) {

    typeof callback === 'function' ? callback() : '';
  });
}


function getWapUserInfo() {
  !wsloan.config.isTest && location.host == 'active.wsloan.com' && (document.domain = 'wsloan.com');
  setWapAppuid();

}


module.exports = function (wsloan) {
  if (wsloan.isApp) {
    getNativeUserInfo()
  } else {
    getWapUserInfo();
  }

  return {
    appuid0: window.native.appuid0,
    appuid2: window.native.appuid2,
    appuid: window.native.appuid,
    authCode : window.native.authCode 
  };
};
