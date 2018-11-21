let statistics = require('../service/statistics.js')
let debug = require('../service/debug')

let wsloan = require('./app.common')
// let userId = require('../platforms/app/service/getUserid');
let userId = require('../platforms/app/service/userId');
console.log(typeof userId ,'userId')
// let getNativeUserid = require('../platforms/app/service/getNativeUserid')
wsloan.set = function(config){
    debug() // 先于执行
    setTimeout(()=>{
        config.needUserid && userId(wsloan);
        // todo:native下有bug,需要等待触发
        if(!config.needUserid && window.native.isApp === 1) {
            userId(wsloan)
            // getNativeUserid(wsloan)
        } 
        if(!config.needUserid && window.native.isApp === 0 ) {
            
            wsloan.mediator.$emit('user.ready') // 不需要用户ID就直接触发生效
        } 
        config.needTj && statistics()
    })
}
module.exports = wsloan;