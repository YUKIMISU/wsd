const execa = require('execa');
const path = require('path');
const lockBabel = require('./lock_babel.js');

const jsonfile = require('jsonfile');
jsonfile.spaces = 2;

let file = path.resolve(__dirname, '../package.json');

let obj = jsonfile.readFileSync(file);

let version = obj.version;
// 版本递增
obj.version = versionAdd(version);

jsonfile.writeFileSync(file, obj);



function versionAdd (version) {
  let arr = version.split('.');
  arr[arr.length - 1] = Number(arr[arr.length - 1]) + 1;
  return arr.join('.');
}

lockBabel(false);

(async function exec () {
  try {
    await execa.shell('npm publish');
  } catch (e) {
    throw ('发布失败, 请检查版本或切换源');
  }
  console.log(`发布成功, 当前版本号为:${obj.version}`);

})();



