require('./index.scss');
//默认分页参数配置
Pagination.configs = {
    pageIndex: 1, //默认分页起始
    pageSize: 10, //默认单页数量
    step: 2, //分页页码步长
    isNumShow: true, //默认显示分页数字
    isSkipShow: true, //默认分页跳码显示
    disabledCls: 'disabled', //上下页按钮失效样式及功能类名
    activeCls: 'cur', //分页数字高亮样式类
    container: '#J_Pagination', //分页dom容器 参数形式为一个选择器字符串
    shiftText: ['上页', '下页'],
    amountLayout: 'string',
    templateName: 'default',
    paginationCls: 'ws-pagination',
    callback: function () { //分页上下页回调
    },
    strategy: function () { //分页策略
        if (this.amount < this.options.step) {
            this.start = 1;
            this.end = this.amount;
        } else {
            //计算分页步阶开始位置
            this.start = (this.current - this.options.step < 1) ?
                1 :
                this.current - this.options.step;
            //计算当前步阶结束位置
            this.end = (this.current + this.options.step > this.amount) ?
                this.amount :
                this.current + this.options.step;
        }
    },
    control: function () { //分页渲染控制

        this.pages.removeClass(this.options.activeCls);
        this.forward.removeClass(this.options.disabledCls);
        this.backward.removeClass(this.options.disabledCls);

        this.container.find('a[data-page-index=' + this.current + ']')
            .addClass(this.options.activeCls);

        if (!this.isPrevAble()) {
            this.forward.addClass(this.options.disabledCls);
        }

        if (!this.isNextAble()) {
            this.backward.addClass(this.options.disabledCls);
        }
    }
};
//分页构造器
function Pagination() {

    var option;
    if (0 in arguments) {
        option = arguments[0];
    } else {
        option = {};
    }
    if (!(this instanceof Pagination)) return new Pagination(option);
    this.options = $.extend(true, {}, Pagination.configs, option);
    this.container = $(this.options.container);
    this.current = this.options.pageIndex;
    this.isRendered = false;
    this.delegated = false;

    //设置节流之后的分页处理函数

    var _this = this;
    this.handler = _.throttle(function () {
        _this.options.callback && _this.options.callback.call(_this, _this.current);
    }, 1000);
}

//事件代理
Pagination.prototype = {
    //获取数据
    fetch: function (isRefreshing) {

        isRefreshing || this.repaint();

        // todo 节流 防止分页快速点击,但是分页页码始终跟随点击,然后数据请求也能拿到当前的currentPgae进行准确请求
        this.options.callback && this.options.callback.call(this, this.current);
        // this.handler();
    },
    //跳转页码
    goto: function (num) {
        num > this.amount ?
            this.current = this.amount :
            this.current = num;
        this.fetch();
    },

    //上一页
    isPrevAble: function () {
        return this.current != 1;
    },

    prev: function () {
        if (this.isPrevAble()) {
            this.current = this.current - 1;
            this.fetch();

        }
    },
    //下一页
    isNextAble: function () {
        return this.amount != 0 && this.current != this.amount;
    },
    next: function () {
        if (this.isNextAble()) {
            this.current = this.current + 1;
            this.fetch();

        }
    },
    //分页模板
    tpl: function () {
        var template = _.template(require('./template-' + this.options.templateName + '.html'))
        this.container.html(template(this));
        this.forward = this.container.find('.J_PagePrev');
        this.backward = this.container.find('.J_PageNext');
        this.pages = this.container.find('.J_PerPage');
        if (this.amount == 0) {
            this.container.hide();
        } else {
            this.container.show();
        }
    },

    //渲染分页
    render: function (count, current, amount) {
        this.options.count = count;
        this.amount = amount ? amount : Math.ceil(count / this.options.pageSize);
        current && (this.current = current);
        this.current > 1 ? this.goto(this.current) : this.repaint();
        this.delegate();
        this.isRendered = true;
    },
    delegate: function () {
        var self = this;
        if (!this.delegated) {
            this.delegated = true;
            this.container.on('click', '.J_PagePrev', function () {
                if ($(this)
                    .hasClass(self.options.disabledCls)) {
                    return !1
                }
                self.prev();
            });
            this.container.on('click', '.J_PageNext', function () {
                if ($(this)
                    .hasClass(self.options.disabledCls)) {
                    return !1
                }
                self.next();
            });
            this.container.on('click', '.J_PerPage', function () {
                var index = $(this)
                    .data('pageIndex');
                self.goto(index);
            });
            this.container.on('click', '.J_PageSkip', function () {
                var pageReadyToGo = self.container.find('.J_page_num_input')
                    .val().trim();
                (!pageReadyToGo || Number(pageReadyToGo) <= 0) && (pageReadyToGo = 1);
                var pageGoto = parseInt(pageReadyToGo, 10);
                self.goto(pageGoto);
            });
        }
    },
    //重置分页外观
    repaint: function () {
        this.options.strategy.call(this);
        this.tpl();
        this.options.control.call(this);
    },

    //刷新分页
    refresh: function (current) {
        this.current = current || 1;
        this.isRendered = false;
        this.fetch(true);
    },
    //销毁分页
    destroy: function () {
        this.container.html('');
        this.isRendered = false;
    }

};

module.exports = Pagination;