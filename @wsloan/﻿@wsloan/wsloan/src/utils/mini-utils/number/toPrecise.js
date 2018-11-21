/**
 * 
 * @param {*} number 
 * @param {*} count 
 */
function toPrecise  (number, count) {
    number = number || 0;
    count = count || 2;
    return Number(number).toFixed(count);
  };

  module.exports = toPrecise;