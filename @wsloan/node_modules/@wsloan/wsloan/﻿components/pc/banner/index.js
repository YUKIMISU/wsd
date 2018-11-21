require("./index.scss");
var $ = window.$;

require('WS_DIR/libs/jquery.plugin/jquery.touchSlider');

function Slider(options) {

    this.container = $(options.container);
    this.interval = options.interval || 5000;

}

Slider.prototype = {

    init: function () {

        this.prev = this.container.find('.prev');
        this.next = this.container.find('.next');
        this.navigatorLine = this.container.closest('.slider-container')
                                 .find('.slider-navigator-inner');

        for (var i = 0; i < this.container.find('.slider').length; i++) {
            this.navigatorLine.append('<li class="slider-navigator-item"></li>');
        }
        this.navigators = this.navigatorLine.find('.slider-navigator-item');

        var $dragBln = false;
        var _this = this;
        this.container
            .touchSlider({
                flexible: true,
                speed: 200,
                btn_prev: this.prev,
                btn_next: this.next,
                paging: this.navigators,
                counter: function (e) {
                    _this.navigators
                         .removeClass("on")
                         .eq(e.current - 1)
                         .addClass("on");
                }
            });

        this.start();
        this.container
            .hover(function () {
                _this.stop();
            }, function () {
                _this.start();
            })

    },
    start: function () {
        var _this = this;
        this.timer || (this.timer = setInterval(function () {
            _this.next.click();
        }, _this.interval));
    },
    stop: function () {
        clearInterval(this.timer);
        this.timer = null
    }

}

module.exports = Slider
