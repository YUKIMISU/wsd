var Pagination = require('../../libs/pagination/pagination.js');
module.exports = {
    createPagination(options){
        var _this = this;
        this.pagination || (this.pagination = new Pagination({
            step: 2,
            activeCls: 'cur',
            container: '#J_Pagination',
            callback: function (page_id) {
                _this.page = page_id;
                typeof options.callback == "function" ? options.callback.call(_this) : "";
            }
        }));
    },
    renderPagination(list_len, page){
        this.pagination.isRendered || this.pagination.render(list_len, page);

    }

};