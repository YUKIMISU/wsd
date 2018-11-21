function calcEarn (gold, month, rate) {
  gold = Number(gold);
  month = Number(month);
  rate = Number(rate);
  var rateArr = [9.6, 10.2, 11.4, 12, 0];
  rate = rate || rateArr[month === 1 ? 0 : month === 3 ? 1 : month === 6 ? 2 : month === 12 ? 3 : 4];
  return ((gold * rate / 1200).toFixed(2) * month).toFixed(2);
}

module.exports = calcEarn;
