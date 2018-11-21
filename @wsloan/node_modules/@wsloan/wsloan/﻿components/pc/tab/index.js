(function ($) {
    var View = require("../../../script/view.js");
    module.exports = function () {
        new View({
            el:"#C_Tab" ,
            template: function () {
                return require("./index.html")
            },
            ready(){
                "use strict";
                $("#J_Component_Tab").on("click","li",function () {
                    $(this).addClass("current")
                })
            }
        })

    }
})(window.$)