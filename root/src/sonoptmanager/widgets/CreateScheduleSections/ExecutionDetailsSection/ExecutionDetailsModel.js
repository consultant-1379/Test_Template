define([
    "jscore/ext/mvp",
  
], function (mvp) {
    
    return mvp.Model.extend({

		setSelectedURL : function(urlValue) {
            this.setAttribute('urlValue', urlValue);
		},
            
        getSelectedURL : function() {
              return this.getAttribute('urlValue');
        },

        setExecutionMode: function(executionMode) {
            this.setAttribute('executionMode', executionMode);
        },

        getExecutionMode: function() {
            return this.getAttribute('executionMode');
        }
    });
    
});