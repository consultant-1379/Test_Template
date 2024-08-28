define([ 
    'jscore/core', 
    './SaveFinishSectionView',
    './SaveFinishSectionModel'
], function(core, View, SaveFinishSectionModel) {  

    return core.Widget.extend({
        
        View: View,
        
        onViewReady: function(options) {
            this.view.initialise();
            this.saveFinishSectionModel = new SaveFinishSectionModel();
            this.view.addInactiveStateButtonHandler(this.stateInactiveButtonClickHandler.bind(this));
            this.view.addTestStateButtonHandler(this.stateTestButtonClickHandler.bind(this));
            this.view.addActiveStateButtonHandler(this.stateActiveButtonClickHandler.bind(this));

            this.addNextButtonClickHandler(this.saveFinishSectionNextTrigger.bind(this));
        },

        loadPolicyStatus: function(selectedStatus){
            if(selectedStatus === "INACTIVE"){
                this.stateInactiveButtonClickHandler();
            } else if(selectedStatus === "ACTIVE"){
                this.stateActiveButtonClickHandler();
            } else if(selectedStatus === "TEST"){
                this.stateTestButtonClickHandler();
            }
        },

        saveFinishSectionNextTrigger: function(){
            this.getElement().trigger("saveFinishClicked");
        },
      
        stateInactiveButtonClickHandler: function () {
            this.view.setStateInactiveButton();
            this.saveFinishSectionModel.setSelectedValue({policyStatus: "INACTIVE"});
            
            this.mandatoryFieldsComplete = true;
            this.getElement().trigger('mandatoryFieldsValueChange');
        },
        
        stateTestButtonClickHandler: function () {
            this.view.setStateTestButton();
            this.saveFinishSectionModel.setSelectedValue({policyStatus: "TEST"});
            
            this.mandatoryFieldsComplete = true;
            this.getElement().trigger('mandatoryFieldsValueChange');
        },
        
        stateActiveButtonClickHandler: function () {
            this.view.setStateActiveButton();

            this.saveFinishSectionModel.setSelectedValue({policyStatus: "ACTIVE"});
            
            this.mandatoryFieldsComplete = true;
            this.getElement().trigger('mandatoryFieldsValueChange');
        },
        
        setSaveFinishButtonDisabled: function () {
            this.view.disableSaveFinishButton();
        },
        
        addNextButtonClickHandler: function (handler) {
            this.view.addSaveFinishButtonClickHandler(handler);
        },
                
        setNextButtonDisabled: function () {
            this.view.disableSaveFinishButton();
        },

        getSaveFinishSectionModel: function(){
            return this.saveFinishSectionModel;
        },

        getSelectedValue: function(){
            return this.saveFinishSectionModel.getSelectedValue().policyStatus;
        },
        
        checkMandatoryFieldsComplete : function () {
            return this.mandatoryFieldsComplete;
        }
        
    });
});