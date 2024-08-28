define([
    'jscore/core',
    'text!./ExecutionDetailsSection.html',
    'styles!./ExecutionDetailsSection.less',
    'widgets/Button',
    'widgets/SelectBox',
    'widgets/Tooltip'
], 
    function(core, template, style, Button, SelectBox, Tooltip) {

    return core.View.extend({

        getTemplate: function() {
            return template;
        },
        
        getStyle: function() {
            return style;
        },

        initialise: function(){
            this.modeSelectBoxWidget = this.createScheduleModeSelectBox();
            this.modeSelectBoxWidget.attachTo(this.getScheduleModeSelectBoxHolder());
            
            this.nextButton = new Button({
                caption: 'Step 2',
                modifiers: [{
                    name: 'color_darkBlue'
                }],
                enabled: false
            });
            
            this.nextButton.setIcon({
                position: 'right',
                name: 'rightArrowLarge'
            });

            this.nextButton.attachTo(this.getNextButtonHolder());
            this.executionDetailsAsterixTooltip = this.createAndAttachAsterixTooltip(".eaSonOptManager-wExecutionDetailsSection-executionDetailsAsterix");

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

        createScheduleModeSelectBox: function () {
            var scheduleModeSelectBox = new SelectBox({
                value: {name: "Full", value: "Full"},      
                items: [
    					{name: "Full", value: "Full"},
    					{name: "Adaptive", value: "Adaptive"}
    			]
            });

            return scheduleModeSelectBox;
        },

        addScheduleModeSelectBoxHandler: function(handler) {
            this.modeSelectBoxWidget.getElement().addEventHandler('change', handler);
        },
        
        getURLTextBox : function() {
			return this.getElement().find(".ebInput-eaSonOptManager-wExecutionDetailsSection-xLongW");
		},
        
        addURLTextBoxKeyUpInputHandler : function(handler) {
        	this.getURLTextBox().addEventHandler('keyup', handler);
        },
        
        getNextButtonHolder: function() {
            return this.getElement().find(".eaSonOptManager-wExecutionDetailsSection-nextBtnHolder");
        },

        getScheduleModeSelectBoxHolder: function(){
            return this.getElement().find(".eaSonOptManager-wExecutionDetailsSection-scheduleModeSelectBoxHolder");
        },
 
        getScheduleModeSelectBoxValue: function () {
            return this.modeSelectBoxWidget.getValue();
        },
                
        createAndAttachAsterixTooltip: function (className) {
            var asterixTooltip = new Tooltip({
                parent: this.getRequiredAsterix(className),
                enabled: true,
                contentText: 'Required field'
            });
            asterixTooltip.attachTo(this.getRequiredAsterix(className));
            return asterixTooltip;
        },

        getRequiredAsterix: function (className) {
            return this.getElement().find(className); 
        }
    });

});
