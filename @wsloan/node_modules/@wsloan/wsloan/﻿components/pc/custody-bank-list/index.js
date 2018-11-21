module.exports = {
    render: function (el, cb) {
        return new View({
            el: el,
            data: {
                bankList: []
            },
            template: function () {
                return require('./index.html');
            },
            ready: function () {
                this.getBankList(); 
            },
            fetchs: {
                getBankList: function () {
                    var _this = this;
                    this.ajax({
                        request: 'ajax',
                        url: this.API.CustodyBankListApi,
                        success: function (data) {
                            if (data.code === 0) {
                                _this.bankList = data.content;
                                cb && cb(_this.bankList);
                                _this.$repaint();
                            }
                        }

                    })
                }
            }
        });
    }
}