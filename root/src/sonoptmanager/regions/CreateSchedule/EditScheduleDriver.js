define([
    "jscore/core"
], function (core) {
    
    return core.Widget.extend({

		init: function(){
			this.addHandlers();
		},

		start: function(CreatePolicyRegion, sectionList, policyJSON){
			this.sectionList = sectionList;
			this.policyJSON = policyJSON;
			this.CreatePolicyRegion = CreatePolicyRegion;

			this.sectionList[0].loadSelectedPolicyDetails({
				name: this.policyJSON.name,
				description: this.policyJSON.description,
				labels: this.policyJSON.labels
			});

			this.CreatePolicyRegion.policyDetailsNextButtonClickHandler();
		},

		addHandlers: function(){
			this.addEventHandler("TopologiesLoaded", this.topologiesLoadedHandler.bind(this));
			this.addEventHandler("SonFunctionsLoaded", this.sonFunctionLoadedHandler.bind(this));
			this.addEventHandler("TriggersLoaded", this.triggersLoadedHandler.bind(this));
			this.addEventHandler("ConditionsLoaded", this.conditionsLoadedHandler.bind(this));
			this.addEventHandler("ActionsLoaded", this.actionsLoadedHandler.bind(this));
		},

		topologiesLoadedHandler: function(){
			// Once topologies are loaded, selected the value and then click next
			this.sectionList[1].loadTopologySelected(this.policyJSON.topologyGroup);
			this.CreatePolicyRegion.topologyNextButtonClickHandler();
		},

		sonFunctionLoadedHandler: function(){
			this.sectionList[2].loadFunctionSelected(this.policyJSON.sonFunctionName);
			this.CreatePolicyRegion.sonFunctionNextButtonClickHandler();
			this.setUpActionsSection();
		},

		triggersLoadedHandler: function(){
			// TODO build trigger widgets
			this.CreatePolicyRegion.triggersNextButtonClickHandler();
		},

		conditionsLoadedHandler: function(){
			// TODO build condition widgets
			this.CreatePolicyRegion.conditionsNextButtonClickHandler();
		},

		actionsLoadedHandler: function(){
			// TODO build action widgets
			this.sectionList[5].loadActionsSelected(this.policyJSON.actions.managedObjectName);
			this.sectionList[5].buildParameterChooserWidgets(this.policyJSON.actions.parameters);

			this.CreatePolicyRegion.actionsNextButtonClickHandler();
			this.sectionList[6].loadPolicyStatus(this.policyJSON.policyStatus);
		},

		// temporary method used while triggers and conditions are pending
		setUpActionsSection: function(){
			this.sectionList[5].getModel().fetchActions();
		}
	});
});