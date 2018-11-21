
module.exports = function (wsloan) {
  
   
  
    /* app端在objcpageonload返回后执行*/
    wsloan.mediator.$on('objc.ready', function (user) {
      console.log('objc.ready',user)
      window.native.appuid0 = user.appuid0;
      window.native.appuid2 = user.appuid2;
      window.native.appuid = encodeURIComponent(user.appuid2 || '');
      window.native.isLogin = !!user.appuid0
      window.native.version = user.version;
      window.native.authCode = user.authCode ;
      window.native.JDAuthCode = user.JDAuthCode;
       try{
        localStorage['userInfo'] = JSON.stringify(user); //暂时禁用
       }catch(e){
  
       }
  
      // alert(window.native.version)
      wsloan.mediator.$emit('user.ready', function (callback) {
        typeof callback === 'function' ? callback() : '';
      });
    });
  
    // 处理APP 的bug
    let appuid2 = wsloan.utils.getString('bugUserid');
    if (appuid2) {
      window.native.appuid2 = appuid2;
      window.native.appuid = encodeURIComponent(appuid2);
      window.native.isApp = 1;
      
      wsloan.mediator.$emit('objc.ready',{
        appuid0:null,
        appuid2:appuid2,
        version:0
      });
    }
    //
  
    const isCross = (!wsloan.isTest && location.host != wsloan.path.HOST) || location.port != '' ;
  
  
    function setAppuid() {
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
        // window.native.isApp == 0 && alert('您处于无痕模式或者未允许网站cookies,无法登录');
      }
      
  
      if (user) {
        const userinfo = JSON.parse(user);
        window.native.appuid0 = userinfo.appuid0;
        window.native.appuid2 = userinfo.appuid2;
        window.native.appuid = encodeURIComponent(window.native.appuid2);
        window.native.isLogin = !!  window.native.appuid0
        window.native.authCode = userinfo.authCode ;
        
      } else {
        window.native.appuid0 = window.native.appuid2 = window.native.appuid = window.native.isLogin =  void 0;
      }
      wsloan.mediator.$on('user.ready', function (callback) {
        if (wsloan.utils.getString('isneedlogin')) {
          if (!window.native.appuid) {
            wsloan.go('login');
            // window.location.href = wsloan.path.HOSTS + '/m/newsWeb/login.html';
          }
        }
        typeof callback === 'function' ? callback() : '';
      });
    }
  
    /* wap端,无跨域*/
    if (native.isApp != 1 && !isCross) {
      setAppuid();
    }
    
    /* wap端,跨域*/
    if (native.isApp != 1 && isCross) {
      let user;
      try {
        user = localStorage['userInfo'];
      } catch (e) {
        // window.native.isApp == 0 && alert('您处于无痕模式或者未允许网站cookies,无法登录');
      }
      if (user) {
        setAppuid();
      } else {
      
      }
      getUserinfo();
  
    }
  
    function getUserinfo() {
      !wsloan.config.isTest && location.host == 'active.wsloan.com' ? document.domain = 'wsloan.com' : '';
      wsloan.user.update('ready');
  
      wsloan.mediator.on('user.ready', (info) => {
        setAppuid();
  
      })
    }
  
    return {
      appuid0: window.native.appuid0,
      appuid2: window.native.appuid2,
      appuid: window.native.appuid,
      authCode:window.native.authCode
    };
  };
  