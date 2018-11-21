/**
 * 输入框转换金额保留两位小数
 * @param {*输入金额} money 
 */
function inputMoney(money){
    money = (money.match(/\d+(\.\d{0,2})?/) || [])[0] ; 
    return isNaN(money) ? '' : money
}
module.exports = inputMoney;