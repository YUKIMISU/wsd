module.exports = {
    /**
     * 将数字以千位分隔 格式化
     * 1000 => 1,000
     * 12345678.9 => 12,345,678.9
     * @param {Number, String} number
     * @returns 返回格式化后的文字
     */
    // 移动到miniutils
    // formatNumberToThousands: function (num) {
    //     if (Number(num) > 999999999999999) {
    //         return '数字太大'
    //     }
    //     var integer = Math.floor(Number(num)) + ''
    //     var decimal = (num + '').substr((integer + '').length)
    //     var temp = integer.split('')
    //         .reverse()
    //     var arr = []
    //     for (var i = 0; i < temp.length; i++) {
    //         if (i % 3 === 0 && i > 0) {
    //             arr.push(',')
    //         }
    //         arr.push(temp[i])
    //     }
    //     return arr.reverse()
    //         .join('') + decimal
    // },
    /**
     * 时间格式化
     * */
    // 移动到miniutils
    
    // formatFromMilli: function (milli) {
    //     var time = milli / 1000;
    //     var day = Math.floor(time / 86400);
    //     time = time - day * 86400;
    //     var hour = Math.floor(time / 3600);
    //     time = time - hour * 3600;
    //     var minute = Math.floor(time / 60);
    //     var second = time - minute * 60;

    //     return {
    //         day: parseInt(day, 10),
    //         hour: parseInt(hour, 10),
    //         minute: parseInt(minute, 10),
    //         second: parseInt(second, 10)
    //     };
    // },
    /**
     *
     * */
    // 移动到miniutils
    
    // dateFormat: {
    //     YMD: function (time) {
    //         var timeDate = new Date(Date.parse(time.replace(/-/g, '/')));
    //         function check10(num) {
    //             return Number(num) < 10 ? '0' + num : num;
    //         }

    //         return timeDate.getFullYear() + "-" + check10(timeDate.getMonth() + 1) + "-" + check10(timeDate.getDate());
    //     }

    // },
    /**
     * 保留两位小数
     * */
    // 移动到miniutils
    
    // toPrecise: function (number, count) {
    //     number = number || 0;
    //     count = count || 2;
    //     return Number(number).toFixed(count);
    // },

    /**
     * 格式化手机号
     */
    // 移动到miniutils,重命名 formatPhone
    
    // phone: function (phone) {
    //     phone = phone + '';
    //     return phone.substr(0, 4) + '****' + phone.substr(8);
    // },
    // 移动到miniutils
    
    // inputMoney: function(money){
    //     money = (money.match(/\d+(\.\d{0,2})?/) || [])[0] ; 
    //     return isNaN(money) ? '' : money
    // }
}