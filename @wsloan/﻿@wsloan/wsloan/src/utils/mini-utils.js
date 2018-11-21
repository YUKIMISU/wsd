var path = require('../config/path.js'),
base = require('../config/base.js')
function Utils() {
  /**
   * 查询URL中的参数
   * @param {string} 参数名字
   * @returns 返回参数内容
   */
  // this.getString = function (name) {
  //   var urlparams = location.search;
  //   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  //   var r = urlparams.substr(1)
  //     .match(reg);
  //   if (r != null) return r[2];
  //   return null;
  // };

  /**
   * 编译模版并填充内容
   * @param {string} tmp  模版ID
   * @param {string} cont 被注入的DIV ID
   * @param {obj} data    注入的内容
   * @returns
   */

   // 暂时没用到，还没移到miniutils
  // this.tplBind = function (tmp, cont, data) {
  //   if (!document.getElementById(tmp)) {
  //     return false;
  //   }
  //   var tem = _.template(document.getElementById(tmp).innerHTML);
  //   var result = tem({
  //     datas: data
  //   });
  //   // document.getElementById(cont).innerHTML = result;
  //   $('#' + cont)
  //     .html(result);
  // };

  /**
   * 将数字以千位分隔 格式化
   * 1000 => 1,000
   * 12345678.9 => 12,345,678.9
   * @param {Number, String} number
   * @returns 返回格式化后的文字
   */
  // this.formatNumberToThousands = function (num) {
  //   if (Number(num) > 999999999999999) {
  //     return '数字太大';
  //   }
  //   var integer = Math.floor(Number(num)) + '';
  //   var decimal = (num + '').substr((integer + '').length);
  //   var temp = integer.split('')
  //     .reverse();
  //   var arr = [];
  //   for (var i = 0; i < temp.length; i++) {
  //     if (i % 3 === 0 && i > 0) {
  //       arr.push(',');
  //     }
  //     arr.push(temp[i]);
  //   }
  //   return arr.reverse()
  //     .join('') + decimal;
  // };
  /**
   * 截取文字的长度
   * @name {string} 参数名字
   * @lng 返回长度
   */
  // this.substrName = function (name, lng) {
  //   return name.length > lng ? (name.substr(0, lng) + '...') : name;
  // };
  // 登录弹框 TODO:上传后可以去掉了
  // this.showLoginBox = function (param) {
  //   $('#loginBox').attr('src', path.HOST + '/logintc.aspx?u=' + param);
  //  document.domain =  base.isTest ? document.domain : 'wsloan.com'
  //   // if (document.domain.indexOf('wsloan') > -1) {
  //   //   document.domain = 'wsloan.com';
  //   // } else {
  //   //   document.domain = document.domain;
  //   // }
  //   $('#tcbg,#loginBox').show();
  // };
  // // TODO:上传后可以去掉了
  // this.hideLoginBox = function () {
  //   $('#loginBox').attr('src', '');
  //   $('#tcbg,#loginBox').hide();
  // };
  // 暂时没用到，还没移入miniutils
  // this.clearInput = function (el) {
  //   this.$inputGold = $(el);
  //   this.$inputGold.val('');
  // };


  // this.dateFormat = {
  //   YMD: function (time) {
  //     var timeDate = new Date(Date.parse(time.replace(/-/g, '/')));

  //     function check10(num) {
  //       return Number(num) < 10 ? '0' + num : num;
  //     }

  //     return timeDate.getFullYear() + "-" + check10(timeDate.getMonth() + 1) + "-" + check10(timeDate.getDate());
  //   }

  // };
  // this.toPrecise = function (number, count) {
  //   number = number || 0;
  //   count = count || 2;
  //   return Number(number).toFixed(count);
  // };
}

// var utils = new Utils();
// module.exports = utils;
module.exports = require('./mini-utils/index.js')