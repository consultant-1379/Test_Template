define([ 'jscore/core', 
        'text!./SystemConfig.html', 
        'styles!./SystemConfig.less' ], 
    
    function(core, template, style) {

	return core.View.extend({

		getTemplate : function() {
			return template;
		},

		getStyle : function() {
			return style;
		},
		getIsAliveButtonHolder : function() {
			return this.getElement().find(".eaSonOptManager-rSystemConfig-isAliveButtonHolder");
		},

        getStartSASButtonHolder : function() {
            return this.getElement().find(".eaSonOptManager-rSystemConfig-startSASButtonHolder");
        },

		getTextBoxArea : function() {
			return this.getElement().find(".eaSonOptManager-rSystemConfig-textOutputHolder");
		}

	});

});
