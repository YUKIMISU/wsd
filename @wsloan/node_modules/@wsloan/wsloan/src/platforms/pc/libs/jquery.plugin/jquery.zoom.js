var $ = window.$;
var opacityPng = require('./opacity.png')
$.fn.extend({
  zoom: function () {
    var _self = this;
    if (this.length === 0) {
      return false;
    }
    // 一开始头部并没有高度, 需要给他添加固定高度
    var OFFSET_TOP = 120;
    var WIDTH = _self.width();
    var HEIGHT = _self.height();
    var TOP = _self.offset().top;
    var LEFT = _self.offset().left;
    var IMG_WIDTH = 0;
    // var IMG_HEIGHT = 0;
    var IMG_SCALE = 1;
    var img = new Image();
    img.onload = function () {
      IMG_WIDTH = this.width;
      // IMG_HEIGHT = this.height;
      IMG_SCALE = IMG_WIDTH / WIDTH * 100 / 2;
      calcPosition();
    };
    img.src = _self.attr('src');
    // this.offset();
    var $wrap = $('<div/>').appendTo('body');
    // 活动区域
    var $activity = $('<div/>').appendTo($wrap);
    // 放大镜
    var $zoomGlass = $('<div/>').appendTo($activity);
    // 放大区域
    var $zoom = $('<div/>').appendTo($wrap);

    // 计算位置
    function calcPosition () {
      WIDTH = _self.width();
      HEIGHT = _self.height();
      TOP = _self.offset().top;
      LEFT = _self.offset().left;
      setTimeout(function () {

        $activity.css({
          width: WIDTH,
          height: HEIGHT,
          top: TOP + OFFSET_TOP,
          left: LEFT,
          position: 'absolute',
          zIndex: 10,
          overflow: 'hidden',
          display: 'none',
          background: 'url(' + opacityPng + ')'
        });

        $zoom.css({
          width: 2 * WIDTH,
          height: 2 * HEIGHT,
          top: TOP + OFFSET_TOP - HEIGHT / 2,
          left: 8 + LEFT + WIDTH,
          position: 'absolute',
          display: 'none',
          background: 'url(' + _self.attr('src') + ')',
          zIndex: 10,
          backgroundSize: IMG_SCALE + '%'
        });

        $zoomGlass.css({
          position: 'absolute',
          width: WIDTH / 2,
          height: HEIGHT / 2,
          top: 0,
          left: 0,
          zIndex: 11,
          background: '#fff',
          opacity: 0.4,
          display: 'none',
          border: '1px solid #232323'
        });
      }, 500)

      // 执行一次后, 能够正确获得元素的高度了
      TOP = OFFSET_TOP + TOP;
      OFFSET_TOP = 0;
    }
    calcPosition();
    // 窗口变化时, 也新创建的窗口也跟着变化位置
    $(window).on('resize', calcPosition);
    this.off('mouseenter');
    this.on('mouseenter', function () {
      $activity.show();
    });

    $activity.on('mouseenter', function () {
      $zoomGlass.show();
      $zoom.show();
    }).on('mouseleave', function () {
      $zoomGlass.hide();
      $zoom.hide();
      $activity.hide();
    }).on('mousemove', function (e) {
      $zoomGlass.css({
        left: getPositionX(e.pageX),
        top: getPositionY(e.pageY)
      });
      $zoom.css({
        backgroundPosition: (getPositionX(e.pageX) / WIDTH * 100 * 2) + '% ' + (getPositionY(e.pageY) / HEIGHT * 100 * 2) + '%'
      });
    });

    //  获取坐标X
    function getPositionX (x) {
      // 判断左边是否超出
      if (x - LEFT < WIDTH / 4) {
        return 0;
      }
      // 判断右边是否超出
      if (x - LEFT > WIDTH * 3 / 4) {
        return WIDTH / 2;
      }
      return x - LEFT - WIDTH / 4;
    }

    //  获取坐标Y
    function getPositionY (y) {
      // 判断左边是否超出
      if (y - TOP < HEIGHT / 4) {
        return 0;
      }
      // 判断右边是否超出
      if (y - TOP > HEIGHT * 3 / 4) {
        return HEIGHT / 2;
      }
      return y - TOP - HEIGHT / 4;
    }
  }
});

