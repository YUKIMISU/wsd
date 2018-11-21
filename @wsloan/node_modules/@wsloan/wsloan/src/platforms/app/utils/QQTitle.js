module.exports = function (title) {
  // 兼容微信，QQ内置浏览器不监听title的问题
  var i = document.createElement('iframe');
  i.src = '//m.baidu.com/favicon.ico';
  i.style.display = 'none';
  i.onload = function () {
    setTimeout(function () {
      i.remove();
    }, 9);
  }
  document.title = title;
  document.body.appendChild(i);
}