define([
    "jscore/core",
    "text!./Schedule.html",
    "styles!./Schedule.less"

 ], function(core, template, style) {

	return core.View.extend({

      
        getTemplate : function() {
            return template;
        },

        getStyle : function() {
            return style;
        }

    });

});