define([
	'jscore/core',
	'text!./sonoptmanager.html',
	'styles!./sonoptmanager.less'
], function(core, template, style) {
	
	return core.View.extend({
	
		getTemplate: function() {
			return template;
		},
		
		getStyle: function(){
			return style;
		},

		getFrameHeadder: function () {
            return this.getElement().find(".sonomdashboard-frameHeader");
        },

		getTopLeftSection: function() {
			return this.getElement().find(".sonomdashboard-topLeftSection");
		},
		
		getBottomLeftSection: function() {
			return this.getElement().find(".sonomdashboard-bottomLeftSection");
		},
		
        getSetupNavigationBar: function () {
            return this.getElement().find(".sonomdashboard-setupNavigationBar");
        },

		getAdminSection: function() {
			return this.getElement().find(".sonomdashboard-adminSection");
		},
		
        getChartWidth: function (){
            return this.getAdminSection()._getHTMLElement().clientWidth;
        },

		getAdminSectionLeft: function() {
			return this.getElement().find(".sonomdashboard-adminSectionLeft");
		},
		
		getAdminSectionRight: function() {
			return this.getElement().find(".sonomdashboard-adminSectionRight");
		}


		
		
	});
	
});