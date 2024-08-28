define([
	'jscore/core',
	'./FrameHeadView',
	'./FrameHeadModel',
	'widgets/Button',
	'widgets/Breadcrumb'
], function (core, View, Model, Button, Breadcrumb) {
	
	return core.Region.extend({
	
		View: View,
		
        createBreadcrumb: function(bc){
			var breadCrumb = new Breadcrumb({breadcrumbs:bc});
            return breadCrumb;
        },
		
		init: function(options){
			this.options = options.options;
			this.model = new Model(this.modelOptions);
		},
		
		onStart: function(){
            
			this.updateAppTitle("SON Optimization Manager");
			this.getContext().eventBus.subscribe("url", function(hash) {
                switch (hash) {
                    case 'sonoptmanager/reports': this.onReportsButtonClick(); break;
                    case 'sonoptmanager/templates': this.onTemplatesButtonClick(); this.loadDefaultQuickActionBar(); break;
                    case 'sonoptmanager/cellListManagment': this.onCellListManagementButtonClick(); this.loadDefaultQuickActionBar(); break;
                    case 'sonoptmanager/schedules': this.onSchedulesButtonClick(); break;
                    case 'sonoptmanager/createSchedule' : this.onCreateScheduleClick(); break;
                    case 'sonoptmanager/logs': this.onLogsButtonClick(); this.loadDefaultQuickActionBar(); break;
                    case 'sonoptmanager/systemConfig': this.onConfigurationButtonClick(); this.loadDefaultQuickActionBar(); break;
                    // default to the dashboard
					default: this.onDashBoardLoad(); break;
                }
			}.bind(this));
            		
		},
		
		editButtonClickHandler: function(){
			this.policyRowSelectedCollection.each(function(model){
				var url = "sonoptmanager/editPolicy/policy?id=" + model.getAttribute("id");
				this.getContext().eventBus.publish("editPolicyURL", url);
			}.bind(this));
		},
		
		createAndInitialiseBc: function(bc){
			
			
			var breadcrumbList = [];

			// these are the links to go to when choose from breadcrumb dropdown
			var firstLevel = [
				{name: 'Reports', url: '#sonoptmanager/reports', selected: false},
				{name: 'Templates', url: '#sonoptmanager/templates', selected: false},
				{name: 'Lists', url: '#sonoptmanager/cellListManagment', selected: false},
				{name: 'Schedules', url: '#sonoptmanager/schedules', selected: false},
				{name: 'Logs', url: '#sonoptmanager/logs', selected: false}
				
			];
			
			//'selected' will be true for selected level
			firstLevel.forEach(function(entry) {
				if(entry.name === name)
					entry.selected = true;
			});	
            
			breadcrumbList.push({name: 'ENM', url: '#launcher'});

			breadcrumbList.push({	
				name: 'SON Optimization Manager', 
				url: '#sonoptmanager',
				children: firstLevel
			});

			if(bc!==undefined){
				bc.forEach(function(entry) {
					breadcrumbList.push(entry); 
				});
			}
		
			if(this.breadcrumbWidget !== undefined && this.breadcrumbWidget !== null)
                this.breadcrumbWidget.detach();  
			this.breadcrumbWidget=this.createBreadcrumb(breadcrumbList);  
			this.breadcrumbWidget.attachTo(this.view.getBreadCrumbsLocation());
        },
        
        //Toggle the "pointer-events" attribute such that the item cannot be clicked again once its clicked
		styleReset: function(element) {
            
            if(element!==null)
				element.setAttribute("style", "opacity: 0.3; pointer-events: none");
            
            if(element!=this.view.getSystemConfigIcon())
                this.view.getSystemConfigIcon().setAttribute("style", "opacity: 0.8; pointer-events: auto");
            
           
            if(element!=this.view.getCellManagmentButtonButton())
                this.view.getCellManagmentButtonButton().setAttribute("style", "opacity: 1; pointer-events: auto");
            
            if(element!=this.view.getTemplatesButton())
                this.view.getTemplatesButton().setAttribute("style", "opacity: 1; pointer-events: auto");
            
            if(element!=this.view.getSchedulesButton())
                this.view.getSchedulesButton().setAttribute("style", "opacity: 1; pointer-events: auto");
            
            if(element!=this.view.getReportsButton())
                this.view.getReportsButton().setAttribute("style", "opacity: 1; pointer-events: auto");
            
            if(element!=this.view.getLogsButton())
                this.view.getLogsButton().setAttribute("style", "opacity: 1; pointer-events: auto");
            
            if(element!=this.view.getSystemConfigButton())
                this.view.getSystemConfigButton().setAttribute("style", "opacity: 1; pointer-events: auto");
            
        },
		
		updateAppTitle: function(title){
			var appHeading = this.view.getAppHeadding();
			var elemsArr = appHeading.children();
			elemsArr.forEach(function (elem) {
				elem.remove();
            });
				
			label = core.Element.parse('<h1 id="app_headding">'+title+'</h1>');
			appHeading.append(label);
		},

		onDashBoardLoad: function(){
			this.updateAppTitle("SON Optimization Manager");
			this.createAndInitialiseBc();
            this.styleReset(null);
            this.view.createAndAddButtons('SON Optimization Manager');
		},

		onReportsButtonClick: function(){
			this.createAndInitialiseBc([
						{	
							name: 'Reports' 
						}
					]);
			this.updateAppTitle("Reports");
            this.view.createAndAddButtons('Reports');
			this.view.addEditButtonClickHandler(this.editButtonClickHandler.bind(this));
		},
		
		onSchedulesButtonClick : function(){
			this.createAndInitialiseBc([
						{	name: 'Schedules', 
							url: '#sonoptmanager/schedules',
							children: [
								{name: 'Create Schedule', url: '#sonoptmanager/createSchedule', selected: false}
							]
						}
					]);
			this.updateAppTitle("Schedules");
            this.view.createAndAddButtons('Schedules');
			this.view.addEditButtonClickHandler(this.editButtonClickHandler.bind(this));
		},
		
		onTemplatesButtonClick: function(){
			this.createAndInitialiseBc([
				{name: 'Templates'}
					]);
			this.updateAppTitle("Templates");
            this.view.createAndAddButtons();
		},

		onCellListManagementButtonClick: function(){
			this.createAndInitialiseBc([
				{name: 'Cell List Management'}
					]);
			this.updateAppTitle("Cell List Management");
            this.view.createAndAddButtons();
		},

		onLogsButtonClick: function(){
			this.createAndInitialiseBc([
				{name: 'Logs'}
					]);
			this.updateAppTitle("Logs");
            this.view.createAndAddButtons();
		},
		
		onConfigurationButtonClick: function(){
			this.createAndInitialiseBc([
				{name: 'System Configuration'}
					]);
			this.updateAppTitle("System Configuration");
            this.view.getSystemConfigIcon().setAttribute("style", "opacity: 0.3; pointer-events: none");
            this.view.createAndAddButtons();
		},
		
		onCreateScheduleClick : function(){
				this.createAndInitialiseBc([
			    						{	name: 'Schedules', 
			    							url: '#sonoptmanager/schedules',
			    							children: [
			    							{name: 'Create Schedule', url: '#sonoptmanager/createSchedule', selected: true}
			    						]},
			    						{	name: 'Create Schedule'
			    						}
			    				]);
			
				this.updateAppTitle("Create Schedule");
				this.view.createAndAddButtons('Create Schedule');
                // resetting for sonoptmaneger.js
            	this.getContext().eventBus.publish("sentOfCallToCreateSchedule", false);
            
		},	
		
		
		
        
        saveFinishClickHandler : function () {
            this.getContext().eventBus.publish('topSaveFinishClicked');
        },
        
        loadQuickActionBar : function (page) {
            this.view.createAndAddButtons(page);
        },

		loadDefaultQuickActionBar: function(){
            this.view.showQuickActionBarCommands();
		},

		cancelButtonClickHandler : function () {
			locationController.setLocation("some/location");  // TODO eeicmsy
        }
	});
});