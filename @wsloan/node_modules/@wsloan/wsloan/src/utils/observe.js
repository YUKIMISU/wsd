function observe() {
  this.server = []
  this.wait = []
}

observe.prototype.listen = function (key, fn) {
  if (!this.server[key]) {
    this.server[key] = [];
  }
  this.server[key].push(fn);
}
observe.prototype.on = function (key, fn) {
  if (!this.server[key]) {
    this.server[key] = [];
  }
  for (var i = 0; i < this.wait.length; i++) {
    this.wait[i].key == key ?
      fn.apply(this, this.wait[i].arr) :
      "";
  }
  /*  this.wait.forEach(function (item) {
      item.key == key ?
        fn.apply(this, item.arr) :
        "";
    });*/
  this.server[key].push(fn);
}

observe.prototype.trigger = function (key) {

  var fns = this.server[key];
  if (!fns || fns.length == 0) {
    var arr = Array.prototype.slice.call(arguments, 1);
    var proto = {};
    proto.key = key;
    proto.arr = arr;
    this.wait.push(proto);
    return false
  }
  // var i = fns.length-1, fn; fn = fns[i];//取最后一个元素，防止同名触发多次，多次获取用户id
  var arr = Array.prototype.slice.call(arguments, 1);
  // fn.apply(this, arr);
  for (var i = 0, fn; i < fns.length; i++) {
    fn = fns[i];
    fn.apply(this, arr);
  }
}


var publish = new observe()

module.exports = publish