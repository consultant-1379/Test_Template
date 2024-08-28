define([
	'jscore/core',
	'template!./ScheduleDateSection.html',
	'styles!./ScheduleDateSection.less', 
    'widgets/Button'
	
], function(core, template, style, Button) {

	return core.View.extend({
		
		getTemplate: function(){
			return template(this.options);
		},
		
		getStyle: function(){
			return style;
		},
		
		 initialise: function(){
	                
	            this.nextButton = new Button({
	                caption: 'Save and Finish ',   // last one no more next
	                modifiers: [{
	                    name: 'color_darkBlue'
	                }],
	                enabled: false
	            });
	            
	           
	            this.nextButton.attachTo(this.getNextButtonHolder());
	          

	    },
	    
//	    addSelectedDateTimeHandler : function(handler){
//	    	 this.dateTimePickerWidget.addEventHandler ("widgetEvent", handler);
//	    },

	    getNextButtonHolder: function() {
            return this.getElement().find(".eaSonOptManager-wScheduleDateSection-nextBtnHolder");
        },
	  
		
		getSchedulerHolder: function(){
			return this.getElement().find(".eaSonOptManager-wScheduleDateSection-schedulerHolder");
		},
		
		 enableNextSectionButton: function () {
	            this.nextButton.setIcon({name:'rightArrowLargeWhite'});
	            this.nextButton.enable();
	        },
	        
	     disableNextSectionButton: function () {
	            this.nextButton.setIcon();
	            this.nextButton.setIcon({name:'rightArrowLarge'});
	            this.nextButton.disable();
	        },
	        
	        addNextButtonClickHandler: function (handler) {
	            this.nextButton.getElement().addEventHandler('click', handler);
	        },
		
	
	});
});