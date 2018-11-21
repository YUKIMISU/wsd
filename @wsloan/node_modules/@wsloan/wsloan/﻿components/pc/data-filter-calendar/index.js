var Calendar = require('WS_DIR/libs/calendar/Calendar.js');

module.exports = new View ({
    el: "#C_data_filter_calendar" ,
    template: "" ,
    data: {
        showType: true ,
        type: "" ,
        startTime: "" ,
        endTime: "" ,
        selectData: [] ,
        searchCallback: function () {

        }

    } ,
    props:{
        showType:{
            type:Boolean
        },
        searchCallback:{
            type:Function
        }
    },
    ready:function () {

    },

    methods: {
        init: function () {
            var that = this;
            this.template = require ("./index.html");
            this.$repaint ();

            setTimeout(function () {
                that.calendar();
            },0)
        } ,
        calendar: function (){
            var cdr = new Calendar("cdr");
            window.cdr = cdr;
            $("body").append(cdr.toString());
            cdr.showMoreDay = true;
            $(".J_calendar")
                .focus(function () {
                    cdr.show($(this)[0])
                });

        }
    } ,
    events: {
        "click .J_search": function (context) {
            context.type = $ (".J_type").val ();
            context.startTime = $ (".J_start_time").val ();
            context.endTime = $ (".J_end_time").val ();
            if(new Date(context.startTime) > new Date(context.endTime)){
                layer.msg('截止时间不能小于起始时间！');
                return false
            }
            if(context.oldType != context.type || context.oldStartTime != context.startTime || context.oldEndTime != context.endTime){
                typeof context.searchCallback == "function" ? context.searchCallback (context) : "";
                context.oldType = context.type;
                context.oldStartTime = context.startTime;
                context.oldEndTime = context.endTime;

            }
        }
    },
    listenEvent:{
       /* "init":function () {
            this.template = require ("./index.html");
            var that = this ;
            setTimeout(function () {
                that.$repaint ();
            },1000)
        }*/
    }
})
