// let msg = '您的浏览器的设置了禁用cookie或处于无痕模式，无法获取您的账户信息'

module.exports = {
  get(name) {
    let cache;
    try {
      cache = localStorage[name];
      return cache && JSON.parse(cache);
    } catch (e) {
      // alert(msg);
      return cache
    }
    // return cache && JSON.parse(cache);
  },
  update(name, value) {
    // TODO:value 有字符串和json两种
    try {
      value = JSON.stringify(value || {})
    }
    catch (e) {
      // value = value
    }

    try {
      localStorage[name] = value;
    } catch (e) {
      // alert(msg);
    }

  },
  set(name, value) {
    this.update(name, value);
  },
  del(name) {
    try {
      localStorage[name] && delete localStorage[name];
    } catch (e) {
      // alert(msg);
    }
  }
};
