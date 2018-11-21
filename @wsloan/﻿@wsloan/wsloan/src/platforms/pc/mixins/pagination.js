var Pagination = require('WS_DIR/libs/pagination/pagination.js');
module.exports = {
    createPagination: function (options) {
        var _this = this;
        this.pagination || (this.pagination = new Pagination({
            step: 2,
            activeCls: 'current',
            container: '#J_pagination',
            callback: function (page_id) {
                _this.page = page_id;
                typeof options.callback === 'function' ? options.callback.call(_this) : '';
            }
        }));
    },
    renderPagination: function (list_len, page) {
        this.pagination.isRendered || this.pagination.render(list_len, page);
    }
};
