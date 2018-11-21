require("./index.scss");
module.exports = new View({
    el:"",
    template:"",
    data:{
        width:"610px",
        height:"600px",
        ruleList:[],
        loading:false
    },
    ready:function () {

    },
    methods:{
        init:function () {
            var $html = $(_.template(require("./template.html"))({ruleList : this.ruleList, loading:this.loading}))
            layer.open({
                type: 1,
                title: false,
                // scrollbar:false ,
                area: [this.width, this.height], //宽高
                content: _.template(require("./template.html"))({ruleList : this.ruleList, loading:this.loading})
            });
        },
        repaint: function (){

        }
    }
})
