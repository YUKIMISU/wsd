var axios = require('axios');
var jsonp = require('jsonp');
var store = require('./store.js');
// var assign = require('../../../polyfill/assign.js');
var qs = require('qs');
// cookie 默认开启
// axios.defaults.withCredentials = true;
var querystring = require('querystring')

function JSONP ({url, data}) {
  return new Promise((resolve, reject) => {
    const isMark = url.indexOf('?') > -1
    isMark ? jsonp(url + '&' + querystring.encode(data), callback) :
      jsonp(url + '?' + querystring.encode(data), callback)

    function callback (err, data) {
      if (err) return reject(err)
      resolve(data)
    }
  })
}


function ajax(options) {
  var userInfo = store.get('userInfo');
  // 请求用户信息时, 带cookie请求
  if (options.data && (options.data.q === 'userInfo') || options.withCredentials == true) {
    axios.defaults.withCredentials = true;
  } else {
    axios.defaults.withCredentials = false;
  }
  const random = () => (Math.random() + '').substr(2);
  var data = {
    // TODO: APP的 userinfo 还得改改
    userid: (userInfo && userInfo.appuid2) || (userInfo && userInfo.encodeuid) || (wsloan.utils.getString('fuid')) || wsloan.utils.getString('bugUserid'),
    ffrom: wsloan.system.isApp ? 1 : 2,
    sblx: wsloan.system.isApp ? 2 : 1, // 温商贷的接口 app 2 wap 1 pc 0,
    _: random()
  };
  // data = assign(data, options.data);
  typeof options.data === 'object' ? '' : options.data = {};
  for (let key in options.data) {
    data[key] = options.data[key];
  }
  if (options.methods === 'post') {
    // post 需要序列化
    data = qs.stringify(data);
  }

  let promise
  switch (options.methods) {
    case 'jsonp':
      promise = JSONP({url: options.url, data: options.data})
      break

    case 'post':
      promise = axios({
        url: options.url,
        method: 'post',
        data
      })
      break

    default:
    promise = axios.get(options.url, {params: data,withCredentials:axios.defaults.withCredentials})
  }

  // options.methods === 'jsonp' ? 
  //   : axios[options.methods || 'get'](options.url, {
  //     params: data
  //   });

  // const promise = options.methods === 'jsonp' ?
  //   JSONP({url: options.url, data: options.data}) :
  //     options.methods === 'get' ?
  //       axios.get(options.url, {params: data}) :
  //       axios({url: options.url, method: 'post', data})


  // const promise = axios[options.methods || 'get'](options.url, {
  //   params: data
  // });
  // 不同存在的时候处理
//   if (options.success && typeof options.success === 'function' // && !options.error && typeof options.error === 'undefined'
// ) {
//     promise.then(response => options.success(response.data));
//   }

  // if (options.error && typeof options.error === 'function') {
    promise.then(response => options.success && options.success(response.data))
      .catch(response => {
       
        options.error && options.error(response);
        if (window.fundebug && window.fundebug.notifyError) {
          window.fundebug.notifyError({
              name:  '接口获取错误' + options.url + JSON.stringify(options.data),
              message: JSON.stringify(response) ,
              severity: 'warning'
          });
      }

      });
  // }
  return promise;
}

module.exports = ajax;
module.exports.default = ajax;
