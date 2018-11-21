var wsloan = require('../wsloan');

wsloan.log('1', {a: 2});

wsloan.log(wsloan);

wsloan.util.Json.stringify({"a": 1});

var b = wsloan.util.Json.parse(wsloan.util.Json.stringify({"a": 1}));

wsloan.log('测试Json工具:', b)
//todo scss样式文件中如何防止多次引用













