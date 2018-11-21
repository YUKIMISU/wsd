/**
   * 查询URL中的参数
   * @param {name} 参数名字
   * @returns 返回参数内容
 */
function getString(name) {
  var urlparams = location.search  + '&' + (location.hash.split('?')[1]);
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = urlparams.substr(1)
      .match(reg);
    if (r != null) return r[2];
    return '';
 
}



module.exports = getString;