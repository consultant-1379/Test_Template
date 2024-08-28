define(
		[ 'jscore/core', 
         './SystemConfigView',  
         'widgets/Button', 
         "jscore/ext/net", 
        '../../../global'],
		function(core, View, Button, net, global) {

			return core.Region.extend({
                        
                        View: View,
                
                        

						onStart : function (options) {
                            
                            this.options = global.modelOptions;
                            this.addIsAliveButton(View);
                            this.addStartSASButton(View);
						
                        },
						addIsAliveButton : function(view) {
                            
							this.isAliveButton = new Button({
								caption : 'isAlive',
								modifiers : [ {
									name : 'wMargin'
								}, {
									name : 'colored'
								}, {
									name : 'color',
									value : 'darkBlue'
								} ],
								enabled : true
							});
							this.isAliveButton.addEventHandler('click', this.addIsAliveButtonClickHandler.bind(this));
							this.isAliveButton.attachTo(this.view.getIsAliveButtonHolder());
							
						},

                        addIsAliveButtonClickHandler : function () {


                            net.ajax({
                                url: this.options.isAliveURL,
                                type: "GET",
                                success: function(data) {

                                    alert("Alive server says: " + data);

                                }.bind(this),

                                error: function(err){
                                    alert("Sorry can not find a service at '" + global.modelOptions.isAliveURL);
                                }.bind (this)
                            });


                        },

                        addStartSASButton : function (view){
                            this.isStartSASButton = new Button({
                                caption : 'Execute',
                                modifiers : [ {
                                    name : 'wMargin'
                                }, {
                                    name : 'colored'
                                }, {
                                    name : 'color',
                                    value : 'darkBlue'
                                } ],
                                enabled : true
                            });

                            this.isStartSASButton.addEventHandler('click', this.addStartSASButtonClickHandler.bind(this));
                            this.isStartSASButton.attachTo(this.view.getStartSASButtonHolder());

                        },

                        addStartSASButtonClickHandler : function () {

                            net.ajax({
                                url: this.options.startSASFunctionURL,
                                type: "GET",
                                success: function(data) {

                                    alert("SAS function : " + data);

                                }.bind(this),

                                error: function(err){
                                    alert("Sorry can not find a service at '" + this.options.startSASFunctionURL);
                                }.bind (this)
                            });
                        }

					});
		});
