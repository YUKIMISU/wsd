 /**
   * 截取文字的长度
   * @name {string} 参数名字
   * @lng 返回长度
   */
  function substrName  (name, lng) {
    return name.length > lng ? (name.substr(0, lng) + '...') : name;
  };
  module.exports = substrName;