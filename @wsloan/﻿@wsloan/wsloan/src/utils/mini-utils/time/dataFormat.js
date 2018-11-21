var dateFormat= {
    YMD: function (time) {
        var timeDate = new Date(Date.parse(time.replace(/-/g, '/')));

        function check10(num) {
        return Number(num) < 10 ? '0' + num : num;
      }

return timeDate.getFullYear() + "-" + check10(timeDate.getMonth() + 1) + "-" + check10(timeDate.getDate());
    }

  };
module.exports = dateFormat;