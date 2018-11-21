//todo 动画代码整理
(function ($) {

    require('./raphael.js');

    //循环执行会导致变量被覆盖

    // var svgCircle_default = {
    //     parent: null,
    //     w: 75,
    //     R: 30,
    //     sW: 20,
    //     color: ["#000", "#000"],
    //     perent: [100, 100],
    //     speed: 0,
    //     delay: 1000
    // };

    $.fn.svgCircle = function (i) {
        var svgCircle_default = {
            parent: null,
            w: 75,
            R: 30,
            sW: 20,
            color: ["#000", "#000"],
            perent: [100, 100],
            speed: 0,
            delay: 1000
        };
        i = $.extend(svgCircle_default, i);
        return this.each(function () {
            var e = i.parent;
            if (!e) {
                return false;
            }
            var w = i.w;
            var r = window.Raphael(e, w, w),
                R = i.R,
                hash = document.location.hash,
                marksAttr = {
                    fill: hash || "#444",
                    stroke: "none"
                };
            r.customAttributes.arc = function (b, c, R) {
                var d = 360 / c * b,
                    a = (90 - d) * Math.PI / 180,
                    x = w / 2 + R * Math.cos(a),
                    y = w / 2 - R * Math.sin(a),
                    path;
                if (c == b) { 
                    path = [
                        ["M", w / 2, w / 2 - R],
                        ["A", R, R, 0, 1, 1, w / 2 - 0.01, w / 2 - R]
                    ]
                } else {
                    path = [
                        ["M", w / 2, w / 2 - R],
                        ["A", R, R, 0, +(d > 180), 1, x, y]
                    ]
                }
                return {
                    path: path
                }
            };
            var f = r.path()
                .attr({
                    stroke: i.color[0],
                    "stroke-width": i.sW
                })
                .attr({
                    arc: [100, 100, R]
                });
            var g = r.path()
                .attr({
                    stroke: i.color[2] || i.color[1],
                    "stroke-width": i.sW
                })
                .attr({
                    arc: [0.01, i.speed, R]
                });
            var h;
            if (i.perent[1] > 0) {
                setTimeout(function () {
                    g.animate({
                        stroke: i.color[1],
                        arc: [i.perent[1], i.perent[0], R]
                    }, 900, ">")
                }, i.delay)
            } else {
                g.hide();
            }
        })
    };

}(window.$));


var pie = {
    run: function (a) {
        if (!a.id) throw new Error("must be canvas id.");
        var b = document.getElementById(a.id),
            ctx;
        if (b && (ctx = b.getContext("2d"))) {
            b.width = b.height = "200";
            var c = function () {
            };
            var d = a.onBefore || c;
            var e = a.onAfter || c;
            d(ctx);
            ctx.fillStyle = a.color || '#f1dab0';
            var f = a.step || 1;
            var g = a.delay || 10;
            var i = 0,
                rage = 360 * (a.percent || 0);
            var h = -Math.PI * 0.5;
            var j = function () {
                i = i + f;
                if (i <= rage) {
                    ctx.beginPath();
                    ctx.moveTo(100, 100);
                    ctx.arc(100, 100, 100, h, Math.PI * 2 * (i / 360) + h);
                    ctx.fill();
                    setTimeout(j, g)
                } else {
                    e(ctx)
                }
            };
            j()
        }
    }
};
