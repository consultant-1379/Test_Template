define([
	'jscore/core',
	'text!./FrameHead.html',
	'styles!./FrameHead.less',
    'widgets/Button'
], function(core, template, style, Button) {

	return core.View.extend({
		
		getTemplate: function(){
			return template;
		},
		
		getStyle: function(){
			return style;
		},
		
		getNavigationBar: function(){
			return this.getElement().find(".frame_header-navigationBar");
		},
		
		getAdminBasicInfoWidgetRight: function(){
			return this.getElement().find(".frame_header-adminInfoSectionPolicies");			
		},
		
		getCellManagmentButtonButton: function(){
			return this.getElement().find(".cellManagmentButton");
		},
		
		getSchedulesButton : function(){
			return this.getElement().find(".schedulesButton");
		},

		getTemplatesButton: function(){
			return this.getElement().find(".templatesButton");
		},
		
		getReportsButton: function(){
			return this.getElement().find(".reportsButton");
		},
		
		getLogsButton: function(){
			return this.getElement().find(".logsButton");
		},
		
		getBreadCrumbsLocation: function(){
			return this.getElement().find(".ebBreadcrumbs");
		},
		
		getAppHeadding: function(){
			return this.getElement().find(".ebLayout-AppHeading");
		},
		
		getSystemConfigButton: function(){
			return this.getElement().find(".SystemConfigButton");
		},

        getSystemConfigIcon: function() {
            return this.getElement().find(".frame_header-configIcon");
        },

        getQuickActionBarDiv: function() {
            return this.getElement().find(".ebQuickActionBar");
        },

        getQuickActionBarCommands: function() {
            return this.getElement().find(".ebQuickActionBar-Commands");
        },
        
        hideQuickActionBarCommands: function(){
            this.getElement().find(".ebQuickActionBar-Commands").setStyle("display", "none");
        },
        
        showQuickActionBarCommands: function(){
            this.getElement().find(".ebQuickActionBar-Commands").setStyle("display", "inline");
        },

        getQuickActionBarCreatePolicyCommands: function() {
			return this.getElement().find(".ebQuickActionBar-CreatePolicy-Commands");
        },
        
        hideQuickActionBarCreatePolicyCommands: function(){
            this.getElement().find(".ebQuickActionBar-CreatePolicy-Commands").setStyle("display", "none");
        },
        
        showQuickActionBarCreatePolicyCommands: function(){
            this.getElement().find(".ebQuickActionBar-CreatePolicy-Commands").setStyle("display", "inline");
        },
        
        getSaveFinishButtonHolder : function () {
            return this.getElement().find('.eaSonOptManager-rFrameHead-saveFinishButtonHolder');
        },
        
        getCancelButtonHolder : function () {
            return this.getElement().find('.eaSonOptManager-rFrameHead-cancelButtonHolder');
        },
        
        getButtonsHolder : function () {
            return this.getElement().find('.eaSonOptManager-rFrameHead-buttonsHolder');
        },
        
        createAndAddButtons : function (page) {
            var element = this.getButtonsHolder()._getHTMLElement();
            while (element.hasChildNodes()) {
                element.removeChild(element.lastChild);
            }
            
            if(this.buttons !== undefined) {
                for(i=0;i<this.buttons.length;i++){
                    this.buttons[i].destroy();
                }
            }
            this.buttons = [];
            
            switch(page) {
               
                case 'Schedules':
                    this.hideQuickActionBarCommands();
                    
                    if (this.buttons.length === 0) { 
                        this.createButton = new Button({
                            caption: "Create",
                            modifiers: [{
                                name: 'color_darkBlue'
                            }],
                            enabled: true
                        });
                        
                        var createButtonHolder = document.createElement('a');
                            createButtonHolder.setAttribute('href','#sonoptmanager/createSchedule');
                            createButtonHolder.appendChild(this.createButton.getElement()._getHTMLElement());
                        
                       
                        this.deleteButton = new Button({
                            caption: "Delete",
                            enabled: false
                        });
                        
                        var deleteButtonHolder = document.createElement('a');
                            //deleteButtonHolder.setAttribute('href','#SonOptManager/deletePolicy');
                            deleteButtonHolder.appendChild(this.deleteButton.getElement()._getHTMLElement());
                        
                        var firstSeparator = core.Element.parse('<div class="ebQuickActionBar-Commands-separator"></div>');
                        var secondSeparator = core.Element.parse('<div class="ebQuickActionBar-Commands-separator"></div>');
                        
                        this.getButtonsHolder()._getHTMLElement().appendChild(createButtonHolder);
                       
                        this.getButtonsHolder()._getHTMLElement().appendChild(deleteButtonHolder);
                        
                        this.buttons.push(this.createButton,this.deleteButton);
                    }
                    break;    
                    
                    
                default :
                    this.showQuickActionBarCommands();
            }  
        },
        
//        addSaveFinishClickHandler : function (handler) {
//            if(this.saveFinishButton !== undefined) {
//                this.saveFinishButton.addEventHandler('click', handler);
//            }
//        },
//        
//        enableDisableSaveFinishButton : function (enable) {
//            if (enable === true) {
//                this.saveFinishButton.enable();
//            }
//            else {
//                this.saveFinishButton.disable();
//            }
//        },
		
		addEditButtonClickHandler: function (handler) {
            if(this.editButton !== undefined) {
				this.editButton.addEventHandler('click', handler);
            }
		},
        
        enableEditButton : function (enable) {
			if(enable)
				this.editButton.enable();
			else
				this.editButton.disable();
        },

        addCancelButtonClickHandler : function (handler) {
            if(this.cancelButton !== undefined) {
                this.cancelButton.addEventHandler('click', handler);
            }
        }
         
	});

});