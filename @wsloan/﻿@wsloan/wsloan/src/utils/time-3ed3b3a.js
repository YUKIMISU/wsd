module.exports = function (Promise, wsloan, observe) {
  return {
    get: function () {
      return new Promise(function (resolve, reject) {
        wsloan.ajax({
          url: wsloan.API.AppApi,
          request: 'ajax',
          data: {
            q: 'serverTime'
          },
          success: function (data) {
            wsloan.mediator.trigger('getServerTime', data);
            resolve(data);
          }
        });
      });
    },
    serverTime: function () {
      this.get().then(function (time) {
      });

      /* return observe.on("getServerTime", function (data) {
           return data ? data : console.error("serverTime in undefined");
       });*/
    },
    isExpired: function (date) {
      return new Date(date).getTime() - new Date(this.serverTime).getTime() < 0;
    },

    countDown: function (time, callback) {
      var that = this;
      return new Promise(function (resolve, reject) {
        observe.on('getServerTime', function () {
          var milliSeconds = new Date(time).getTime() - new Date(that.serverTime).getTime();
          if (milliSeconds < 0) {
            resolve();
            return false;
          }

          var timer = setInterval(function () {
            typeof callback === 'function' ? callback(that.formatFromMilli(milliSeconds)) : '';
            milliSeconds = milliSeconds - 1000;
            if (milliSeconds < 0) {
              clearInterval(timer);
              resolve();
            }
          }, 1000);
        });
      });
    },

    timer: function (time, tween, done) {
      var timer = setInterval(function () {
        typeof tween === 'function' && tween(time);
        time--;
        if (time < 0) {
          clearInterval(timer);
          typeof done === 'function' && done();
        }
      }, 1000);
    }
  };
};
