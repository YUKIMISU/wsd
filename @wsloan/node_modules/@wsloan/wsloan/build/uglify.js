const UglifyJS = require('uglify-js');

const fs = require('fs');
const path = require('path');

const isMAC = process.platform === 'darwin';

module.exports = function () {
  return new Promise(resolve => {

    let DIST_DIR = path.resolve(__dirname, '../dist');
    let dirs = fs.readdirSync(DIST_DIR);

    const ie8 = true;
    const start = new Date();

    /**
     * @param {array} files 文件列表数组
     * @param {string} basePATH 基本路径
     */
    function scanDir (files, basePATH) {
      // console.log(basePATH);
      // console.log(files, basePATH);
      files.map(name => {
        let DIR = path.resolve(basePATH, name);
        let file = fs.statSync(DIR);
        if (file.isDirectory()) {
          scanDir(fs.readdirSync(path.resolve(basePATH, name)), DIR);
        }

        if (file.isFile()) {
          if (name.indexOf('.js') > 0) {
            let file_path = basePATH + (isMAC ? '/' : '\\') + name;
            uglify(file_path);
          }
        }
      });
    }

    function uglify (path) {
      const start = new Date();
      let content = fs.readFileSync(path, 'utf8');
      let result = UglifyJS.minify(content, {
        compress: {
          ie8
        },
        mangle: {
          ie8
        },
        output: {
          ie8
        }
      });
      if (!result.code) {
        console.log(`${path}, 压缩失败!`);
      } else {
        write(path, result.code);
        console.log(`${path}, 压缩成功! 用时: ${getTime(start)} ms`);
      }
    }

    function write (path, content) {
      fs.writeFileSync(path, content, 'utf8');
    }

    scanDir(dirs, DIST_DIR);


    function getTime (start) {
      const end = new Date();
      return (end.getTime() - start.getTime());
    };

    console.log(`压缩完成: 用时: ${Math.round(getTime(start) / 1000)} s`);
    resolve();
  });
};
