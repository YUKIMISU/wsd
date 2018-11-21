//  适配 promise
//  基本上没什么用，为了适配IE8兼容
//  调用：
//  new Promise () //为了跟垫片的写法一致,维护更方便,其实可以不用new,看个人喜欢
function _Promise (callback) {
  var dtd = new $.Deferred;
  typeof callback === 'function' && callback(dtd.resolve, dtd.reject)
  return dtd;
}
!window.Promise && (window.Promise = _Promise);
module.exports = _Promise;
