
require("./select.scss");

module.exports = {
    template: require("./select.html"),
    data: {
        kind: null,
        cpsSelectType: null

    },
    events: {
        'click #J_select li': function (context) {
            var $this = $(this);
            context.cpsSelectType = $this.data('kind');
            context.text = $this.text();
            $this.addClass("current").siblings("li").removeClass("current");
        },
        'click .J_sure': function (context) {
            if (context.cpsSelectType == null) {
                layer.msg("请选择其中一个选项");
                return false
            }
            layer.confirm(context.text, {
                btn: ['确定', '取消'] //按钮
            }, function (index) {
                layer.close(index);

                context.saveCps();
            }, function (index) {
                layer.close(index);
            });


        },
        'click .address': function () {
        },
        'click .J_close': function () {
            $(".J_alert_cps").hide();

        }
    },
    ready: function () {
        
        $.extend(this, wsloan.cps);
        var that = this;

        wsloan.mediator.on("user.ready", function () {
            wsloan.user.get().isLogin == 1 ? that.checkIsCps('select') : "";


        })
    },
    methods: {
        cpsPopupShow: function () {
            layer.alert(this.text);
        },
        cpsSelectShow: function () {
            $(".J_alert_cps").show();
            // events.init();
            // layer.open({
            //     type: 1,
            //     shade: false,
            //     title: false, //不显示标题
            //     area: ['516px', '286px'],
            //     content: require("./select.html"), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            //     cancel: function () {

            //     }
            // });

        },
        cpsSelectSaved: function () {
            layer.alert(
                !this.isJoin ?
                    '您已选择继续参与投资返现活动' :
                    '您已选择参与' + this.activeName || '该活动',
                {
                    icon: 1,
                    skin: 'layer-ext-moon'
                })

        },
        saveCpsSuccess: function () {
            layer.alert(this.text);
            $(".J_alert_cps").hide();
        }
    }
}