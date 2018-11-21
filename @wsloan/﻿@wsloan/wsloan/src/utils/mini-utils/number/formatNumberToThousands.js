 /**
   * 将数字以千位分隔 格式化
   * 1000 => 1,000
   * 12345678.9 => 12,345,678.9
   * @param {Number, String} number
   * @returns 返回格式化后的文字
   */
  function formatNumberToThousands(num) {
    if (Number(num) > 999999999999999) {
      return '数字太大';
    }
    var integer = Math.floor(Number(num)) + '';
    var decimal = (num + '').substr((integer + '').length);
    var temp = integer.split('')
      .reverse();
    var arr = [];
    for (var i = 0; i < temp.length; i++) {
      if (i % 3 === 0 && i > 0) {
        arr.push(',');
      }
      arr.push(temp[i]);
    }
    return arr.reverse()
      .join('') + decimal;
  };

  module.exports = formatNumberToThousands;