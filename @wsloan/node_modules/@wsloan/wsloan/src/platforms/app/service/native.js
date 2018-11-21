var miniUtils = require('../../../utils/mini-utils.js')
module.exports = function (wsloan) {

  var native = {
    appuid: null,
    appuid0: null,
    appuid2: null,
    isApp: navigator.userAgent.toLocaleLowerCase().indexOf('wsloan') > -1 || miniUtils.getString('isApp') === '1' ? 1 : 0,
    systemtype: navigator.userAgent.toLocaleLowerCase().indexOf('ios') > -1 ? 'ios' : 'and',
    userinfo: null, // 用户信息
    userlocation: null, // 位置坐标
    urlparams: null, // url参数
    usercontact: '', // 通讯录
    version: null, // 版本号
    isWeiXin: (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) == 'micromessenger',
        /*    isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase ();
        if (ua.match (/MicroMessenger/i) == 'micromessenger') {
        return true;
        } else {
        return false;
        }
        },*/
    // 设置用户ID，页面加载后会设置，未登录不设置
    objcSetUserId (uid, nuid) {
      this.appuid = encodeURIComponent(uid);
      this.appuid0 = nuid;
      this.appuid2 = uid;
    },
        // 设置客户端系统类型，ios|and，页面加载后会设置
    objcSetSystemType (type) {
      this.systemtype = type;
    },
        // 设置用户信息， json 格式
    objcSetUserInfo (info) {
      this.userinfo = this.userjson = JSON.parse(info);
    },
        // 设置用户坐标， json 格式，例：{"latitude":"26.000000","longitude":"125.000000"}
    objcSetUserLocation (location) {
      this.userlocation = location;
    },
        // 设置URL参数， 例：userid=xxx&type=xxx
    objcSetUrlParams (params) {
      this.urlparams = params;

    },
        // 设置用户联系人， json 格式
    objcSetUserContact (contact) {
      this.usercontact = contact;
    },
    js_call_objc (api, callback) {
      var iFrame;
      iFrame = document.createElement('iframe');
      iFrame.setAttribute('src', api);
      iFrame.setAttribute('style', 'display:none;');
      iFrame.setAttribute('height', '0px');
      iFrame.setAttribute('width', '0px');
      iFrame.setAttribute('frameborder', '0');
      document.body.appendChild(iFrame);
            // 发起请求后这个iFrame就没用了，所以把它从dom上移除掉
      iFrame.parentNode.removeChild(iFrame);
      iFrame = null;
      if (typeof callback === 'function') {
        callback();
      }
    },
    objcSetSystemVersion () {

    },
        // 分享成功后通知
    objcSetShareResult (info) {

    },
        // 签到成功后
    objcSignInBtnClick () {

    },
        // 回复框的内容
    objcSendInputViewText (data) {

    },
    nativeApp (link) {
      window.location.href = 'app://interface?method=' + link;

    },
    applink (url, callback) {
            // 需要对URL的 & 进行编码. 不然会opennewwindow 只会截取到URL的第一个 & 就停止了
      // url = url.replace(/&/g, encodeURIComponent('&'));
      location.href = 'app://interface?method=opennewwindow&url=' + encodeURIComponent(url) + '&showNavigationBar=' + (url.indexOf('showNavigationBar=1') > -1 ? 1 : 0);

    },
    appCall (url, callback) {
      if (this.systemtype == 'ios' || this.systemtype == 'and20') {
        this.js_call_objc('ios://interface?' + url);
      } else {
        AppInterface.remoteCallMetod(url);
      }
      if (typeof callback === 'function') {
        callback();
      }
    },
    nativeShareSuccess () {
            // 分享成功
    },
    // 老方法 已弃用
    objcPageOnLoad () {
    },
    nativeObjcPageOnLoad (obj) {
      console.log('nativeObjcPageOnLoad',obj)

      obj = JSON.parse(obj);
      var user = {
        appuid0: obj.tjrid,
        appuid2: obj.userid,
        appuid: obj.userid,
        version: obj.CFBundleVersion,
        authCode:obj.authCode,
        JDAuthCode:obj.JDAuthCode
      };
    //   observe.trigger('objc:ready', user);
      setTimeout(() => {
        wsloan && wsloan.mediator && wsloan.mediator.$emit('objc.ready', user);
      });
    },
    // 进入
    nativeWillEnterForeground(){

    },
    // 离开
    nativeDidEnterBackground(){}
  };

  window.native = native;
  for (let key in native) {
    window[key] = native[key];
  }
  return window.native;
};
