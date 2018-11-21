var path = require('../config/link.js');
var system = require('./system.js');

/**
 * 设置地址里对应系统的序号 [PC地址, wap地址, app地址]
 */
var index = system.isPC ? 0 : system.isWap ? 1 : 2;


/**
 * 跳转
 * @param {string} name 链接名
 * @param {string} id ID号
 * @param {boolean} isNew 是否新窗口
 */
function go(name, id, isNew) {
  // var link = path[name][index];
  // if (id && typeof id === 'number') {
  //   link = link.replace('$0', id);
  // }
  var link = getRealPath(name, id);
  location.href = index < 2 ?
    link :
    'app://interface?method=' + link;
}
go.getRealPath = getRealPath;
/**
 * 对 传入的 字符串做判断. 返回真实路径
 * @param {str} name 跳转字符串
 */
function getRealPath(name, id) {
  var link = path[name][index];
  if (id && typeof id === 'number') {
    link = link.replace('$0', id);
  }
  if(id && typeof id === 'string'){
    link = link.replace('$param', id);    
  }
  return link;
}

module.exports = go;