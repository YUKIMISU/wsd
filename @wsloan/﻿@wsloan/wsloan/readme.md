组件类:
规则弹窗
地址
cps
交易密码
分页


工具类
倒计时
时间格式转化
金额格式转换

### 目录结构
system: 包含系统类型判断, 打印等


### 方法
公用链接跳转
wsloan.go(path)
path 跳转目标
```
wsloan.go('login') => 跳转到登录. 
```


```
/**
 * webpack 配置
 * app: WS_DIR => _APP
 * pc:  WS_DIR => _PC
 */
/**
 * |- _PC
 * | |- utils
 * |   |- ajax
 * |   |- cookie.js => 调用$.cookie 方法. 暴露出 get set delete
 * |
 * |- _APP
 * | |- utils
 * |   |- ajax
 * |   |- cookie.js => 采用 localStorage 方法. 暴露出 get set delete
 * 
 * ========== 公共部分 ==============
 * |- business
 * |  |- achieve
 * |  |  |- user
 *          // 这里 webpack 自动选择路径, 引用对应的方法.
 *          var cookie = require('WS_SYS/utils/cookie.js');
 *          var ajax = require('WS_SYS/utils/ajax.js');
 *
 *          ajax({
 *              url: 'xxxxxxx',
 *              success: function () {
 *                  cookie.set()
 *              
 *              }
 *          })
 */
 ```
 
 
 view
 



文档分类
utils
-format
-mediator
-time
-mini-util


业务逻辑
-cps
-link
-statistics
-user
-userFund

配置类
wsloan.go
link


