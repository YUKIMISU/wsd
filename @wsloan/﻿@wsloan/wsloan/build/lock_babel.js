const path = require('path');
const fs = require('fs');


module.exports = function (isLock) {
  let lock_file = '.babelrc.lock';
  let unlock_file = '.babelrc';
  let babel_file = path.resolve(__dirname, '../' + (!isLock ? lock_file : unlock_file));
  let babel_stats;
  try {
    babel_stats = fs.statSync(babel_file);
  } catch (e) {
    babel_stats = false;
  }
  if (babel_stats) {
    fs.renameSync(babel_file, isLock ? lock_file : unlock_file);
    console.log(isLock ? '文件锁定成功!' : '文件解锁成功!');
  }

};
