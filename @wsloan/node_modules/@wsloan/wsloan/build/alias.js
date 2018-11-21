const path = require('path');

module.exports = {
  pc: {
    alias: {
      ajax: path.resolve(__dirname, '../src/platforms/pc/utils/ajax.js'),
      store: path.resolve(__dirname, '../src/platforms/pc/utils/cookie.js'),
      WS_DIR: path.resolve(__dirname, '../src/platforms/pc'),
      jquery: path.resolve(__dirname, '../test/test-libs/jquery.js'),
      components: path.resolve(__dirname, '../components/pc/'),
      underscore: path.resolve(__dirname, '../test/test-libs/underscore.js')
    }
  },
  app: {
    alias: {
      ajax: path.resolve(__dirname, '../src/platforms/app/utils/ajax.js'),
      store: path.resolve(__dirname, '../src/platforms/app/utils/store.js')
    }
  }
};
