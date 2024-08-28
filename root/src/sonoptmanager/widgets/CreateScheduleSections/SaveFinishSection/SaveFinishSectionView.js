define([
    'jscore/core',
    'text!./SaveFinishSection.html',
    'styles!./SaveFinishSection.less',
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

            this.saveFinishButton = new Button({
                caption: 'Save and Finish',
                modifiers: [{
                    name: 'color_darkBlue'
                }],
                enabled: false
            });

            this.saveFinishButton.attachTo(this.getSaveFinishButtonHolder());
            
            this.inactiveStateBtn = new Button({
                caption: 'Inactive',
                modifiers: [{
                    name: 'colored'
                }]
            });
            this.testStateBtn = new Button({
                caption: 'Test',
                modifiers: [{
                    name: 'colored'
                }]
            });
            this.activeStateBtn = new Button({
                caption: 'Active',
                modifiers: [{
                    name: 'colored'
                }]
            });
            this.inactiveStateBtn.attachTo(this.getInactiveStateBtnHolder());
            this.testStateBtn.attachTo(this.getTestStateBtnHolder());
            this.activeStateBtn.attachTo(this.getActiveStateBtnHolder());
            this.stateAsterixTooltip = this.createAndAttachAsterixTooltip(".eaSonOptManager-wSaveFinishSection-stateAsterix");
        },

        enableSaveFinishButton: function () {
            this.saveFinishButton.enable();
        },
        
        disableSaveFinishButton: function () {
            this.saveFinishButton.disable();
        },
        
        addSaveFinishButtonClickHandler: function (handler) {
            this.saveFinishButton.getElement().addEventHandler('click', handler);
        },
    
        getInactiveStateBtnHolder: function () {
            return this.getElement().find(".eaSonOptManager-wSaveFinishSection-inactiveStateBtnHolder");
        },
        
        getTestStateBtnHolder: function () {
            return this.getElement().find(".eaSonOptManager-wSaveFinishSection-testStateBtnHolder");
        },
        
        getActiveStateBtnHolder: function () {
            return this.getElement().find(".eaSonOptManager-wSaveFinishSection-activeStateBtnHolder");
        },
        
        getSaveFinishButtonHolder: function () {
            return this.getElement().find(".eaSonOptManager-wSaveFinishSection-saveFinishHolder");
        },
        
        addInactiveStateButtonHandler: function (handler) {
            this.inactiveStateBtn.getElement().addEventHandler('click', handler);
        },
        
        addTestStateButtonHandler: function (handler) {
            this.testStateBtn.getElement().addEventHandler('click', handler);
        }, 
        
        addActiveStateButtonHandler: function (handler) {
            this.activeStateBtn.getElement().addEventHandler('click', handler);
        },
                
        setStateInactiveButton: function () {
            this.inactiveStateBtn.getElement().setStyle('background-image', '-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(0,0,0,0.1)),color-stop(100%,rgba(0,0,0,0))');
            this.testStateBtn.setModifier('color', 'grey');
            this.activeStateBtn.setModifier('color', 'grey');
        },
        
        setStateActiveButton: function () {
            this.inactiveStateBtn.getElement().setStyle('background-image', '-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(0,0,0,0)),color-stop(100%,rgba(0,0,0,0.1))');
            this.testStateBtn.setModifier('color', 'grey');
            this.activeStateBtn.setModifier('color', 'green');
        },
        
        setStateTestButton: function () {
            this.inactiveStateBtn.getElement().setStyle('background-image', '-webkit-gradient(linear,left top,left bottom,color-stop(0%,rgba(0,0,0,0)),color-stop(100%,rgba(0,0,0,0.1))');
            this.testStateBtn.setModifier('color', 'orange');
            this.activeStateBtn.setModifier('color', 'grey');
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
