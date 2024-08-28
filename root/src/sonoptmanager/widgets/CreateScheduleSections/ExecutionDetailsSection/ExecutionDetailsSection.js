define([ 
    'jscore/core', 
    './ExecutionDetailsSectionView', 
    './ExecutionDetailsModel'
], function(core, View, ExecutionDetailsModel) {  

    return core.Widget.extend({
        
        View: View,
   
        onViewReady: function(options) {

            this.view.initialise();

            this.model = new ExecutionDetailsModel();
            
            this.addURLTextBoxKeyUpInputHandler(this.urlTextBoxKeyUpInputHandler.bind(this));
            this.addScheduleModeSelectBoxHandler(this.scheduleModeSelectBoxHandler.bind(this));
            this.addNextButtonClickHandler(this.executionDetailsNextTrigger.bind(this));
            
            // initial value if no manual selection made 
            this.model.setExecutionMode(this.view.getScheduleModeSelectBoxValue());
        },

        addScheduleModeSelectBoxHandler: function(handler){
            this.view.addScheduleModeSelectBoxHandler(handler);
        },
        
        addURLTextBoxKeyUpInputHandler : function(handler){
            this.view.addURLTextBoxKeyUpInputHandler(handler);
        },

        addIsNextSectionEnabledHandler: function(handler){
            this.isNextSectionEnabledHandler = handler;
        },

        executionDetailsNextTrigger: function(){
            this.getElement().trigger("executionDetailsNextClicked");
        },

        scheduleModeSelectBoxHandler: function () {
        	this.model.setExecutionMode(this.view.getScheduleModeSelectBoxValue());
        },
        
        urlTextBoxKeyUpInputHandler : function () {
        	
        	var selectedURL = this.view.getURLTextBox().getValue();
        	
        	if (selectedURL !=null && selectedURL.length > 0){
        		
        	 	this.setNextButtonEnabled();
        	 	
        	} else {
        		
        		this.setNextButtonDisabled();
        	}
      
    		this.executionDetailsMandatoryFieldsComplete = true;
        	this.getElement().trigger('mandatoryFieldsValueChange');
        	
        	this.model.setSelectedURL(selectedURL); 	
        },
        
        checkMandatoryFieldsComplete : function () {
            return this.executionDetailsMandatoryFieldsComplete;
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
              
        getModel: function(){
            return this.model;
        }

    });
});