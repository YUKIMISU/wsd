
require('./style.scss')
module.exports = {
    template: require('./index.html'),
    data: {
        adConfig: {},
        times: 0,
        imgReady: false
    },
    ready: function () {
        this.times = Number(wsloan.utils.cookie.get(this.adConfig.cookieName));

        var currentTime = new Date();
        if (new Date(this.adConfig.startTime) <= currentTime && new Date(this.adConfig.endTime) >= currentTime) {
            this.times < 3 && this.waitLoad();
        }
        
    },
    methods: {
        waitLoad: function () {
            var that = this;
            var img = new Image();
            img.src = this.adConfig.img_src;
            img.onload = function () {
                that.imgReady = true;
                that.$repaint();
            };
            img.onerror = function () {
                console.log('首页广告图片加载失败!');
            }
        }

    },
    events: {
        'click .ws-mask-gray .J_close': function (that) {
            // console.log(that)
            wsloan.utils.cookie.set(that.adConfig.cookieName, ++that.times, 'd1');
            $(".ws-mask-gray").fadeOut(200);
        }

    }
}