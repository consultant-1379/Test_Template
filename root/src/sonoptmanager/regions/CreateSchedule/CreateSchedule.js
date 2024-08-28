define([
    "jscore/core",
    "./CreateScheduleView",
	'../Schedule/SonScheduleModel',
    "jscore/ext/net"
], function(core, View, SonScheduleModel,  net) {


    return core.Region.extend({

        View: View,
        
        init: function (options) {
            this.sonScheduleModel = new SonScheduleModel();
			this.options = options.options;
        },
		
        // Make sure user is alerted when he is trying to close / reload
		addResponsiveEvents: function () {
			window.addEventListener("beforeunload", function (event) {
					event.stopPropagation();
					event.preventDefault();
            }.bind(this), true);
        },

		onStart: function () {
            this.addResponsiveEvents();
			
			this.view.sonScheduleModel = this.sonScheduleModel;

			this.view.createAccordions();
               
                
                // TODO these do nothing
                 this.view.getExecutionDetailsSection().addIsNextSectionEnabledHandler(this.isExecutionDetailsNextSectionEnabled.bind(this));
                this.view.getScheduleDateSection().addIsNextSectionEnabledHandler(this.isScheduleDateNextSectionEnabled.bind(this));
    
                 this.getElement().addEventHandler("executionDetailsNextClicked", this.executionDetailsNextClickHandler.bind(this));
                 this.getElement().addEventHandler("dateAndTimeNextClicked", this.dateAndNextButtonClickHandler.bind(this));
               
                
        },

    
        isExecutionDetailsNextSectionEnabled: function(){
            return this.view.scheduleDateAccordion.isEnabled();
        },
        
        isScheduleDateNextSectionEnabled: function(){
            return this.view.saveFinishSection.isEnabled();
        },
        
     
        
        executionDetailsNextClickHandler: function () {
           
            this.view.nextAccordionStep(this.view.executionDetailsAccordion, this.view.scheduleDateAccordion);
            this.view.executionDetailsSection.setNextButtonDisabled();
        },
        
        
        // final one in wizard
        dateAndNextButtonClickHandler : function () {
           
        
            this.view.closeAccordions();
            this.updateAndSaveScheduleModel();
            this.getContext().eventBus.publish("sentServerCallToCreateSchedule", true);
            
            
            // its a demo (probably not best place for call)
            
            var paramStr = "startTimeInMs="+this.sonScheduleModel.getSelectedDateMillSecs()+"&url="+this.sonScheduleModel.getSelectedURL();
         	    
		    net.ajax({
                url: this.sonScheduleModel.url,
                type: "GET",
                data: paramStr,
                success: function(data) {
                    
                	alert("Response from server : " + data);
            
                }.bind(this),
                
                error: function(err){
                    alert("Sorry had an error using '" + this.sonScheduleModel.url + "?"+paramStr+"'\nError Msg: "+ err);
                }.bind (this)
            });
		
               
        },

      
        
        triggersNextButtonClickHandler: function () {
            this.view.getConditionsSection().getModel().fetchTypes('condition');

            this.view.nextAccordionStep(this.view.triggersAccordion, this.view.conditionsAccordion);
            this.view.getTriggersSection().setNextButtonEnable(false);
        },

       
        
        conditionsNextButtonClickHandler: function () {
            this.view.getActionsSection().getModel().fetchActions();

            this.view.nextAccordionStep(this.view.conditionsAccordion, this.view.actionsAccordion);
            this.view.getConditionsSection().setNextButtonEnable(false);
        },

        

        actionsNextButtonClickHandler: function () {
            this.view.nextAccordionStep(this.view.actionsAccordion, this.view.saveFinishAccordion);
            this.view.actionsSection.setNextButtonDisabled();
        },
        
        updateAndSaveScheduleModel: function(){
           
        	
            this.sonScheduleModel.setSelectedURL(this.view.getExecutionDetailsSection().getModel().getSelectedURL());
            this.sonScheduleModel.setExecutionMode(this.view.getExecutionDetailsSection().getModel().getExecutionMode());
            this.sonScheduleModel.setSelectedDateMillSecs(this.view.getScheduleDateSection().getModel().getSelectedDateMillSecs());
        
            // TODO eeicmsy - investige -  model save here makes a call to server ?
           // XXXthis.sonScheduleModel.save();
        },
        
    });

});