define([
    "jscore/core",
    "text!./CreateSchedule.html",
    "styles!./CreateSchedule.less",
    "widgets/Combobox",
    "widgets/Button",
    'widgets/SelectBox',  
    'widgets/InfoPopup',
    'widgets/Tooltip',
    '../../widgets/SonOmAccordion/SonOmAccordion',
    "../../widgets/CreateScheduleSections/ExecutionDetailsSection/ExecutionDetailsSection",
    "../../widgets/CreateScheduleSections/ScheduleDateSection/ScheduleDateSection"
], function(core, template, style, ComboBox, Button, SelectBox, InfoPopup, Tooltip,
    SonOmAccordion, ExecutionDetailsSection, ScheduleDateSection) {

    return core.View.extend({

        getTemplate: function() {
            return template;
        },
        
        getStyle: function() {
            return style;
        },

        createAccordions: function(){
            this.createExecutionDetailsAccordion();
            this.createScheduleDateAccordion();
        },

        // TODO eeicmsy : this is all just for demo (i mean would really need a recurring schedule component, might be algorithm specific, etc)
        // (perhaps the mode would affect the schedule options in later steps - or perhaps this would be something to pass in the url)
        
        createExecutionDetailsAccordion: function(){
            this.executionDetailsSection = new ExecutionDetailsSection({options: this.options});
            this.executionDetailsAccordion = new SonOmAccordion({
                number: "1",
                title: "Execution Details",
                infoText: "The schedule will run a full mode or an adaptive mode execution for the service at the specified URL (demo)",
                expanded: true,
                enabled: true,
                postSaveFinish: false,
                content: this.executionDetailsSection
            }); 
            this.executionDetailsAccordion.setAccordionHeaderColour('#66cbe5');
            this.executionDetailsAccordion.attachTo(this.getExecutionDetailsAccordionHolder());
        },

        createScheduleDateAccordion: function(){
            this.scheduleDateSection = new ScheduleDateSection({options: this.options});
            this.scheduleDateAccordion = new SonOmAccordion({
                number: "2",
                title: "Schedule Calendar",
                infoText: "The date and time that the execution will start.",
                expanded: false,
                enabled: false,
                postSaveFinish: false,
                content: this.scheduleDateSection
            });
            
            this.scheduleDateAccordion.attachTo(this.getScheduleDateAccordionHolder());
        },

        
        addResetTriggersConditionsActionsHandler: function(handler){
            this.getElement().addEventHandler('resetTriggersConditionsActions', handler);
        },
        
        addNextButtonClickHandler: function (currentSection, handler) {
            currentSection.addNextButtonClickHandler(handler);
        },

    
        addPreviousButtonClickHandler: function (currentSection, handler) {
            currentSection.addPreviousButtonClickHandler(handler);
        }, 
        
        nextAccordionStep: function (currentAccordion, nextAccordion) {
            nextAccordion.expandAccordion();
            nextAccordion.enable();
            currentAccordion.setAccordionHeaderColour('#b8d674');
            //this.currentAccordion.removeEvents();
            nextAccordion.scrollAccordion();
            
        },
        
        closeAccordions: function () {
        	
        	// TODO brutel - this is a demo
            this.scheduleDateAccordion.setAccordionHeaderColour('#b8d674');
            this.scheduleDateAccordion.foldAccordion();
            this.executionDetailsAccordion.foldAccordion();

        },

        resetTriggersConditionsActions: function(){
 
            this.resetAccordion(this.createExecutionDetailsAccordion, 1);
            this.resetAccordion(this.createScheduleDateAccordion, 2);
 
        },

        resetAccordion: function(accordionToReset, sectionNumber){

            accordionToReset.disable();
        },
                     
        setPreviousButtonEnabled:function(){
            this.previousButton.enable();
        },


        /** **************Methods for getting DOM Elements******************* */


        getNextButtonHolder: function() {
            return this.getElement().find(".eaSonOptManager-rCreateSchedule-nextButtonHolder");
        },

        getPreviousButtonHolder:  function() {
            return this.getElement().find(".eaSonOptManager-rCreateSchedule-previousButtonHolder");
        },

        getExecutionDetailsAccordionHolder: function(){
            return this.getElement().find(".eaSonOptManager-rCreateSchedule-executionDetailsAccordionHolder");
        },

        getScheduleDateAccordionHolder: function(){
            return this.getElement().find(".eaSonOptManager-rCreateSchedule-scheduleDateAccordionHolder");
        },


        /** **************Methods for getting different Sections******************* */

        getExecutionDetailsSection: function(){
            return this.executionDetailsSection;
        },

        getScheduleDateSection: function(){
            return this.scheduleDateSection;
        }
		
 
    });

});
