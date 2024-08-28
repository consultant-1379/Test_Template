define([ 'jscore/core', 
         './ScheduleDateSectionView', 
         './ScheduleDateModel', 
         'widgets/DateTimePicker'
         ], 
		function(core, View, ScheduleDateModel, DateTimePicker) {

		return core.Widget.extend({

			// TODO eeicmsy messed up views and controllers
		View: View,
		
		onViewReady : function(options) {
						
			  this.view.initialise();
			  this.model = new ScheduleDateModel();
			  
			  
			  this.dateTimePickerWidget = new DateTimePicker();
			  this.dateTimePickerWidget.attachTo(this.view.getSchedulerHolder());
			  
			  // TODO know idea why eventHandler is not working
			  // this.addDateTimePickerSelectionHandler(this.dateTimeSelectedHandler.bind(this));
			  
			  this.setNextButtonEnabled();
	          this.addNextButtonClickHandler(this.dateTimeSelectionNextTrigger.bind(this));
	          
	            
		},
	
//	    addDateTimePickerSelectionHandler : function (handler) {
//		///	this.dateTimePickerWidget.addEventHandler ('click', handler);
//	    	
//	    	// needed getElement baaaa documentation !!!
//	    	this.dateTimePickerWidget.addEventHandler("widgetEvent", handler);
//			this.dateTimePickerWidget.getElement().addEventHandler("widgetEvent", handler);
//		},
//		
//		dateTimeSelectedHandler: function () {
//			console.error("called it dateTimeSelectedhandler ");
//			var date = this.dateTimePickerWidget.getValue();
//			
//			if (date != null){
//				var timeMs = date.getTime();
//				
//				var now = new Date().getTime();
//				
//				if (now < timeMs ){
//					
//					this.setNextButtonEnabled();
//					
//				} else {
//					this.setNextButtonDisabled();
//				}
//				
//				
//				this.model.setSelectedDateMillSecs( timeMs);
//				
//				this.dateDetailssMandatoryFieldsComplete = true;
//	        	this.getElement().trigger('mandatoryFieldsValueChange');
//	        		
//				
//			}
//			console.error("value is " + this.dateTimePickerWidget.getValue());
//    	
//        },
        
        dateTimeSelectionNextTrigger: function(){
        	
        
			var date = this.dateTimePickerWidget.getValue();
			
			if (date != null){
				
				var timeMs = date.getTime();
				
		
				
				this.model.setSelectedDateMillSecs( timeMs);
		
				// TODO too many
				
//				this.dateDetailssMandatoryFieldsComplete = true;
//				this.getElement().trigger("scheduleModelChanged");
//	        	
//				this.getElement().trigger('mandatoryFieldsValueChange');
//	        	// it is last wizard page - want to trigger save:
	            this.getElement().trigger("dateAndTimeNextClicked");
	        		
				
			}        	
		
          
            
        },
		
       
		
		/////////////////////////////////////  Add-on in accordian
		
		 addIsNextSectionEnabledHandler: function(handler){
	        //   this.isNextSectionEnabledHandler = handler;
	      },
	      
	      addNextButtonClickHandler: function (handler) {
	            this.view.addNextButtonClickHandler(handler);
	        },

	        setNextButtonEnabled: function(){
	            this.view.enableNextSectionButton();
	        },

	        setNextButtonDisabled: function(){
	            this.view.disableNextSectionButton();
	        },
	              
	        getModel : function(){
	            return this.model;
	        }
	      
	      
	      
		
		
	});
});